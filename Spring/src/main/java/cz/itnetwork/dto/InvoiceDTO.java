package cz.itnetwork.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data //gettery a settery ke všem atributům
@AllArgsConstructor //automaticky generovaný construktor
@NoArgsConstructor //Automaticky generovaný bezparametrický kontruktor
public class InvoiceDTO {

    @JsonProperty("_id")
    private Long id;

    private Integer invoiceNumber;

    private PersonDTO seller;

    private PersonDTO buyer;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate issued;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    private String product;

    private BigDecimal price;

    private Integer VAT;

    private String note;

}
