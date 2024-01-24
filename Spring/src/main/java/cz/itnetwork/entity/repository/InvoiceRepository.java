package cz.itnetwork.entity.repository;
import cz.itnetwork.dto.InvoiceFilter;
import cz.itnetwork.entity.InvoiceEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface InvoiceRepository extends PagingAndSortingRepository<InvoiceEntity, Long>,JpaRepository<InvoiceEntity, Long> {

    /**
     * Vyhledá faktury podle id kupujícího.
     * @param identificationNumber kupujícího
     * @return Seznam faktur odpovídajících zadanému id kupujícího
     */
    List<InvoiceEntity> findByBuyerIdentificationNumber(String identificationNumber);

    /**
     * Vyhledá faktury podle id prodávajícího.
     * @param identificationNumber Identifikační číslo prodávajícího
     * @return Seznam faktur odpovídajících zadanému identifikačnímu číslu prodávajícího
     */
    List<InvoiceEntity> findBySellerIdentificationNumber(String identificationNumber);

    /**
     * Vrací statistiky faktur(součet cen za aktuální rok, součet všech cen faktur a celkový počet faktur)
     * @return List statistic
     */
    @Query(value = "SELECT SUM(CASE WHEN YEAR(issued) = YEAR(CURDATE()) THEN price ELSE 0 END) AS currentYearSum, " +
            "SUM(price) AS allTimeSum, " +
            "COUNT(*) AS invoicesCount " +
            "FROM invoice ")
    List<Object[]> getInvoiceStatistic();

    /**
     * Vrací vyfiltrované faktury na základě parametrů z objektu InvoiceFilter
     * @param filter   Filtr pro vyhledávání faktur
     * @param pageable Stránkování výsledků
     * @return Seznam vyfiltrovaných faktur
     */
    @Query(value = "SELECT i FROM invoice i WHERE " +
            "    (:#{#filter.buyerId} = -1 OR i.buyer.id = :#{#filter.buyerId}) " +
            "AND (:#{#filter.sellerId} = -1 OR i.seller.id = :#{#filter.sellerId}) " +
            "AND (:#{#filter.product} = '' OR i.product = :#{#filter.product}) " +
            "AND (:#{#filter.minPrice} IS NULL OR i.price >= :#{#filter.minPrice}) " +
            "AND (:#{#filter.maxPrice} IS NULL OR i.price <= :#{#filter.maxPrice}) "
    )
    List<InvoiceEntity> getFilteredInvoice(InvoiceFilter filter, Pageable pageable);
}