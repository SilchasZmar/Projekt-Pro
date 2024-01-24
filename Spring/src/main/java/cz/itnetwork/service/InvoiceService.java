package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceFilter;
import cz.itnetwork.dto.InvoiceStatistic;
import cz.itnetwork.entity.repository.InvoiceRepository;

import java.util.List;

public interface InvoiceService {

    /**
     * Metoda pro přidání faktury do databáze.
     * @param invoiceDTO
     * @return DTO přidané fakturu
     */
    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    /**
     * získá fakturu podle id
     * @param id faktury
     * @return DTO dané faktury
     */
    InvoiceDTO getInvoice(Long id);

    /**
     * Metoda pro získání faktur podle id kupujícího
     * @param identificationNumber id kupujícího
     * @return DTO faktur nalezených podle id kupujícího
     */
    List<InvoiceDTO> getByBuyerIdentificationNumber(String identificationNumber);

    /**
     * Metoda pro získání faktur podle id prodejce
     * @param identificationNumber id prodejce
     * @return DTO faktur nalezených podle id prodejce
     */
    List<InvoiceDTO> getBySellerIdentificationNumber(String identificationNumber);

    /**
     * Metoda pro získání seznamu všech faktur
     * @param invoiceFilter
     * @return DTO všech filtrovaných faktur
     */
    List<InvoiceDTO> getAllInvoice(InvoiceFilter invoiceFilter);

    /**
     * Smaže vybranou fakturu
     * @param id faktury k odstranění
     */
    void removeInvoice(Long id);

    /**
     * Upraví zvolenou fakturu
     * @param invoiceDTO
     * @param id faktury k upravení
     * @return DTO upravené metody
     */
    InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, Long id);

    /**
     * Metoda pro získán statistik (Počet faktur, součet všech nůkupu a součet za aktuální rok)
     * @return Objekt typu InvoiceStatistic obsahující statistiky faktur.
     */
    InvoiceStatistic getInvoiceStatistics();
}
