import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import SellerBuyerSelect from "../components/SellerBuyerSelect";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Stavové proměnné pro formulář faktury
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: { 
            "_id": ""
        },
        buyer: {
            "_id": ""
        },
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
    });

    // Stavové proměnné pro zpracování odeslání formuláře
    const [sentState, setSentState] = useState();
    const [successState, setSuccess] = useState();
    const [errorState, setError] = useState();
    // Stavové proměnné pro výběr prodejce a kupujícího
    const [selectedSeller, setSeller] = useState();
    const [selectedBuyer, setBuyer] = useState();
    // Stavové proměnné pro seznam prodejců a kupujících
    const [sellers, setSellers] = useState([]);
    const [buyers, setBuyers] = useState([]);

    // Načtení dat faktury při editaci
    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                setInvoice(data);
                setSeller(data.seller?._id);
                setBuyer(data.buyer?._id);
            });
        }
    }, [id]);

    // Odeslání formuláře
    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
        .then((data) => {
            setSentState(true);
            setSuccess(true);
            navigate("/invoices");
        })
        .catch((error) => {
            setError(error.message);
            setSentState(true);
            setSuccess(false);
        });
    };

    // Změna hodnoty výběru prodejce
    const handleSellerSelect = (event) => {
        setInvoice({ ...invoice, seller:{ _id: event.target.value } });
         };
      
    // Změna hodnoty výběru kupujícího     
    const handleBuyerSelect = (event) => {
        setInvoice({ ...invoice, buyer: { _id: event.target.value } });
        };
  
    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} Fakturu</h1>
            <hr/>
            {errorState ? <div className="alert alert-danger">{errorState}</div> : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}

            <form onSubmit={handleSubmit}>
                
                <SellerBuyerSelect
                    onSelect={handleSellerSelect}
                    selectedId={selectedSeller}
                    isSeller={true}
                    items={sellers}
                />

                <SellerBuyerSelect
                    onSelect={handleBuyerSelect}
                    selectedId={selectedBuyer}
                    isSeller={false}
                    items={buyers} 
                />

                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issued: e.target.value });
                    }}
                />
        
                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                    setInvoice({ ...invoice, dueDate: e.target.value });
                    }}
                />
        
                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Produkt"
                    value={invoice.product}
                    handleChange={(e) => {
                    setInvoice({ ...invoice, product: e.target.value });
                    }}
                />
        
                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    value={invoice.price}
                    handleChange={(e) => {
                    setInvoice({ ...invoice, price: parseFloat(e.target.value) });
                    }}
                />
        
                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                    setInvoice({ ...invoice, vat: parseFloat(e.target.value) });
                    }}
                />
        
                <InputField
                    required={false}
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) => {
                    setInvoice({ ...invoice, note: e.target.value });
                    }}
                />

            <input type="submit" className="btn btn-primary" value="Uložit" />      
      </form>
    </div>
  );
};

export default InvoiceForm