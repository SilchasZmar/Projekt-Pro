import React from "react";
import {Link} from "react-router-dom";

const InvoiceTable = ({  items, deleteInvoice }) => {

    return (
        <div>
           
           <hr />

           <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Prodejce</th>
                        <th>Kupující</th>
                        <th>Produkt</th>
                        <th>Cena</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                       <tr>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{item.seller.name}</td>
                            <td>{item.buyer.name}</td>                            
                            <td>{item.product}</td>
                            <td>{item.price}</td>                      
                            <td>
                                <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                                </div>
                            </td> 
                       </tr> 
                    ))}
                </tbody>
           </table>
           <Link to={"/invoices/create"} className="btn btn-success">
            Nová Faktura
           </Link>
        </div>
    )
}

export default InvoiceTable;