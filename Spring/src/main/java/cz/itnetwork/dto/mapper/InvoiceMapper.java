package cz.itnetwork.dto.mapper;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.InvoiceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PersonMapper.class})
public interface InvoiceMapper {

    InvoiceEntity toEntity(InvoiceDTO source);
    InvoiceDTO toDTO(InvoiceEntity source);
    List<InvoiceDTO> toDTOList(List<InvoiceEntity> source);

    /**
     * Aktualizuje InvoiceEntity na základě informací z objektu InvoiceDTO.
     * Nastavení kupujícího (buyer) a prodávajícího (seller) jsou ignorována.
     * @param source InvoiceDTO
     * @param target aktualizuje InvoiceEntity,
     * @return Aktualizovaný objekt typu InvoiceEntity
     */
    @Mapping(target = "buyer", ignore = true)
    @Mapping(target = "seller", ignore = true)
    InvoiceEntity updateInvoice(InvoiceDTO source, @MappingTarget InvoiceEntity target);
}
