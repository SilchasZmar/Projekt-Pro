package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceFilter;
import cz.itnetwork.dto.InvoiceStatistic;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InvoicesController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/invoices")
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return  invoiceService.addInvoice(invoiceDTO);
    }

    @GetMapping("/identification/{identificationNumber}/purchases")
    public List<InvoiceDTO> getInvoicesByBuyerIdentificationNumber(@PathVariable String identificationNumber) {
        return invoiceService.getByBuyerIdentificationNumber(identificationNumber);
    }

    @GetMapping("/identification/{identificationNumber}/sales")
    public List<InvoiceDTO> getInvoicesBySellerIdentificationNumber(@PathVariable String identificationNumber) {
        return invoiceService.getBySellerIdentificationNumber(identificationNumber);
    }

    @GetMapping("/invoices")
    public List<InvoiceDTO> getAllInvoice(InvoiceFilter invoiceFilter) {
    return invoiceService.getAllInvoice(invoiceFilter);
    }

    @GetMapping("/invoices/{invoiceId}")
    public InvoiceDTO getInvoice(@PathVariable Long invoiceId) {
        return invoiceService.getInvoice(invoiceId);
    }

    @DeleteMapping("/invoices/{invoiceId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void removeInvoice(@PathVariable Long invoiceId) {
        invoiceService.removeInvoice(invoiceId);
    }

    @PutMapping("/invoices/{invoiceId}")
    public InvoiceDTO editInvoice(@RequestBody InvoiceDTO invoiceDTO,@PathVariable Long invoiceId) {
        return invoiceService.editInvoice(invoiceDTO, invoiceId);
    }

    @GetMapping("/invoices/statistics")
    public InvoiceStatistic getInvoiceStatistics() {
        return invoiceService.getInvoiceStatistics();
    }

}
