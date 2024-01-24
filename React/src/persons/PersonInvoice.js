import React, {useEffect, useState} from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";


const PersonInvoice = ({identificationNumber}) => {
    const [sellInvoices, setSellInvoices] = useState([]);
    const [purchasesInvoices, setPurchasesInvoices] = useState([]);

    // Načtení vystavených faktur
    useEffect(() => {
        apiGet("/api/identification/" + identificationNumber +"/sales")
        .then((data) => setSellInvoices(data))
    }, [identificationNumber])

    // Načtení přijatých faktur
    useEffect(() => {
        apiGet("/api/identification/" + identificationNumber +"/purchases")
        .then((data) => setPurchasesInvoices(data))
    }, [identificationNumber])

    return(
        <div>
            <h5>Vystavené faktury</h5>
            <table className="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th style={{width:"30%"}}>Produkt</th>
                        <th style={{width:"30%"}}>Cena</th>
                        <th style={{width:"30%"}}>Číslo faktury</th>
                        <th style={{width:"10%"}}>Faktura</th>
                    </tr>
                </thead>
                <tbody>
                    {sellInvoices.map((sellInvoice) => (
                        <tr key={sellInvoice._id}>
                            
                            <td>{sellInvoice.product}</td>
                            <td>{sellInvoice.price}</td>
                            <td>{sellInvoice.invoiceNumber}</td>                               
                            <td><Link to={`/invoices/show/${sellInvoice._id}`} 
                            className="btn btn-sm btn-info">
                                Detail</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <h5>Přijaté faktury</h5>
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th style={{width:"30%"}}>Produkt</th>
                            <th style={{width:"30%"}}>Cena</th>
                            <th style={{width:"30%"}}>Číslo faktury</th>
                            <th style={{width:"10%"}}>Faktura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchasesInvoices.map((purchasesInvoice) => (
                            <tr key={purchasesInvoice._id}>
                                <td>{purchasesInvoice.product}</td>
                                <td>{purchasesInvoice.price}</td>
                                <td>{purchasesInvoice.invoiceNumber}</td>                               
                                <td><Link to={`/invoices/show/${purchasesInvoice._id}`} 
                                className="btn btn-sm btn-info">
                                    Detail</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default PersonInvoice;