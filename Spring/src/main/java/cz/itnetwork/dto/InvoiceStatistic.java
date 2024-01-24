package cz.itnetwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceStatistic {

    private BigDecimal currentYearSum;
    private BigDecimal allTimeSum;
    private Long invoicesCount;


}
