import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceStatistic from "./InvoiceStatistic";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    // State pro seznam kupců,Prodejců a faktur
    const [buyersListState, setBuyersList] = useState([]);
    const [sellersListState, setSellersList] = useState([]);
    const [invoices, setInvoices] = useState([]);
    //filtry faktur
    const [filterState, setFilter] = useState({
        buyerId: undefined,
        sellerId: undefined,
        product: "",
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined,
    });

    // Funkce pro odstranění faktury
    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
        setInvoices(invoices.filter((item) => item._id !==id));
    }

    // Načtení dat při načtení komponenty
    useEffect(() => {
        // Načtení seznamu faktur
        apiGet("/api/invoices")
            .then((data) => setInvoices(data))
            .catch((error) => console.log("Error", error));

        // seznamu kupujících a prodejců
        apiGet('/api/persons').then((data) => setBuyersList(data));
        apiGet('/api/persons').then((data) => setSellersList(data));
    }, []);

    // Funkce pro změnu hodnoty filtrů
    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === "") {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: undefined };
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    // Funkce pro odeslání formuláře s filtry
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;

        // Načtení dat podle zadaných filtrů
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };

    return(
        <div>
            <h1>Seznam faktur</h1>
            <hr />
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buyersList={buyersListState}
                sellersList={sellersListState}
                filter={filterState}
                items={invoices}
            />
            <hr />
            <InvoiceTable deleteInvoice={deleteInvoice} items={invoices}/>
            <InvoiceStatistic />
        </div>
    );
};

export default InvoiceIndex;