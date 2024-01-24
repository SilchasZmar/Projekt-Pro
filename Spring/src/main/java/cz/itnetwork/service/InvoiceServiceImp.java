package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceFilter;
import cz.itnetwork.dto.InvoiceStatistic;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImp implements InvoiceService{


    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private PersonRepository personRepository;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);

        entity = invoiceRepository.save(entity);

        //Přiřazení buyer z databáze podle ID
        PersonEntity buyerEntity = personRepository.findById(invoiceDTO.getBuyer().getId()).orElse(null);
        if (buyerEntity != null) {
            entity.setBuyer(buyerEntity);
        }

        //Přiřazení seller z databáze podle id
        PersonEntity sellerEntity = personRepository.findById(invoiceDTO.getSeller().getId()).orElse(null);
        if (sellerEntity != null) {
            entity.setSeller(sellerEntity);
        }

        return invoiceMapper.toDTO(entity);
    }

    @Override
    public InvoiceDTO getInvoice(Long invoiceId) {
        return invoiceMapper.toDTO(fetchInvoiceById(invoiceId));
    }

    @Override
    public List<InvoiceDTO> getByBuyerIdentificationNumber(String identificationNumber) {
        return invoiceRepository.findByBuyerIdentificationNumber(identificationNumber)
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getBySellerIdentificationNumber(String identificationNumber) {
        return invoiceRepository.findBySellerIdentificationNumber(identificationNumber)
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getAllInvoice(InvoiceFilter invoiceFilter) {
        return invoiceRepository.getFilteredInvoice(invoiceFilter, PageRequest.of(0, invoiceFilter.getLimit()))
                .stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void removeInvoice(Long id) {
        InvoiceEntity invoiceEntity = invoiceRepository.findById(id).orElseThrow(EntityNotFoundException::new);

        invoiceRepository.delete(invoiceEntity);
    }

    @Override
    public InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, Long id) {
        invoiceDTO.setId(id);
        InvoiceEntity invoiceEntity = invoiceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        invoiceMapper.updateInvoice(invoiceDTO, invoiceEntity);

        PersonEntity buyer = personRepository.findById(invoiceDTO.getBuyer().getId()).orElseThrow(EntityNotFoundException::new);
        invoiceEntity.setBuyer(buyer);

        PersonEntity seller = personRepository.findById(invoiceDTO.getSeller().getId()).orElseThrow(EntityNotFoundException::new);
        invoiceEntity.setSeller(seller);

        InvoiceEntity saveInvoice = invoiceRepository.save(invoiceEntity);
        return invoiceMapper.toDTO(saveInvoice);
    }

    @Override
    public InvoiceStatistic getInvoiceStatistics() {
        List<Object[]> invoiceStatistic = invoiceRepository.getInvoiceStatistic();
        InvoiceStatistic result = new InvoiceStatistic();
        if (!invoiceStatistic.isEmpty()) {
            result.setCurrentYearSum((BigDecimal) invoiceStatistic.get(0)[0]);
            result.setAllTimeSum((BigDecimal) invoiceStatistic.get(0)[1]);
            result.setInvoicesCount((Long) invoiceStatistic.get(0)[2]);
        }
        return result;
    }

    /**
     * Načte fakturu z databáze na základě poskytnutého id
     * @param id číslo faktury k načtení.
     * @return Objekt typu InvoiceEntity představující načtenou fakturu.
     */
    private InvoiceEntity fetchInvoiceById(long id) {

        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + " wasn't found in the database."));
    }
}
