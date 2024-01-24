import React from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

const InvoiceFilter = (props) => {
    
    //Ošetřuje změnu hodnoty v filtru.
    const handleChange = (e) => {
        props.handleChange(e);
    };

    //Ošetřuje odeslání formuláře.
    const handleSubmit = (e) => {
        props.handleSubmit(e);
    };

    // Dekonstrukce objektu filter ze vstupních vlastností
    const filter = props.filter;

    return (
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col">
                <InputSelect
                    name="buyerId"
                    items={props.buyersList}
                    handleChange={handleChange}
                    label="Kupující"
                    prompt="nevybrán"
                    value={filter.buyerId} 
                />
            </div>
            <div className="col">
                <InputSelect
                    name="sellerId"
                    items={props.sellersList}
                    handleChange={handleChange}
                    label="Prodejce"
                    prompt="nevybrán"
                    value={filter.sellerId} 
                />
            </div>
            <div className="col">
                <InputField
                    type="text"
                    name="product"
                    value={filter.product}
                    handleChange={handleChange}
                    label="Produkt"
                    prompt=""
                />
            </div>      
        </div>
        <br />
        <div className="row">
            <div className="col">
                <InputField
                    type="number"
                    name="minPrice"
                    value={filter.minPrice || ""}
                    handleChange={handleChange}
                    label="Minimální cena"
                    prompt=""
                />
            </div>
            <div className="col">
                <InputField
                    type="number"
                    name="maxPrice"
                    value={filter.maxPrice || ""}
                    handleChange={handleChange}
                    label="Maximální cena"
                    prompt=""
                />
            </div>
            <div className="col">
                <InputField
                    type="number"
                    name="limit"
                    value={filter.limit}
                    handleChange={handleChange}
                    label="Limit"
                    prompt=""
                />
            </div>
        </div>

        <div className="row">
            <div className="col">
                <input
                    type="submit"
                    className="btn btn-secondary float-right mt-2"
                    value="Filtrovat"
                />
            </div>
        </div>
    </form>
    );
};

export default InvoiceFilter;