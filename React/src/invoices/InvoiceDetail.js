import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoiceDetail = () => {
    // Extrahuje ID faktury z URL parametru
    const { id } = useParams();
    // stav pro uchování informací o faktuře
    const [invoice, setInvoice] = useState({});

    // Načte detaily faktury z API
    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }, [id]);

    // Vykresluje informace o faktuře nebo zobrazuje "Loading..."
    return (
        <>
            {Object.keys(invoice).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>Detail faktury</h1>
                    <hr />
                    <h3>{invoice.invoiceNumber}</h3>
                    <p>
                        <strong>Prodejce:</strong>
                        <br />
                        {invoice.seller.name} ({invoice.seller.identificationNumber})
                    </p>
                    <p>
                        <strong>Kupující:</strong>
                        <br />
                        {invoice.buyer.name} ({invoice.buyer.identificationNumber})
                    </p>
                    <p>
                        <strong>Vystaveno:</strong>
                        <br />
                        {dateStringFormatter(invoice.issued, true)}
                    </p>
                    <p>
                        <strong>Splatnost:</strong>
                        <br />
                        {dateStringFormatter(invoice.dueDate, true)}
                    </p>
                    <p>
                        <strong>Produkt:</strong>
                        <br />
                        {invoice.product}
                    </p>
                    <p>
                        <strong>Cena:</strong>
                        <br />
                        {invoice.price}
                    </p>
                    <p>
                        <strong>DPH:</strong>
                        <br />
                        {invoice.vat}
                    </p>
                    <p>
                        <strong>Poznámka:</strong>
                        <br />
                        {invoice.note}
                    </p>
                </div>
            )}
        </>
    );

};

export default InvoiceDetail;