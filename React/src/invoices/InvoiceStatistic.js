import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const InvoiceStatistic = () => {
    const [statistics, setStatistic] = useState();

    // Načtení statistik faktur
    useEffect(() => {
        apiGet("/api/invoices/statistics")
            .then((data) => setStatistic(data))
            .catch((error) => console.log("Error", error));
    }, []);

    return (
        <>
            {statistics && (
                <div>
                    <hr />
                    <h5>Obecné statistiky faktur</h5>
                    <p>Součet za aktuální rok (Kč) - {statistics.currentYearSum}</p>
                    <p>Celkový součet (Kč) - {statistics.allTimeSum}</p>
                    <p>Celkový počet faktur - {statistics.invoicesCount}</p>
                </div>
            )}
        </>
    );
};

export default InvoiceStatistic;