import React, { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

const PersonStatistics = () => {
    const [personStatistics, setPersonStatistics] = useState([]);

    // Načtení statistik osob
    useEffect(() => {
        apiGet("/api/persons/statistics")
            .then((data) => setPersonStatistics(data))
            .catch((error) => console.log("Error", error));
    }, []);

    return (
        <div>
        {personStatistics && (
            <div className="col-md-3">
                <h5>Statistiky osob</h5>
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Jméno</th>
                            <th>Tržba</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personStatistics.map((stat, index) => (
                            <tr key={index + 1}>
                                <td className="small">{stat.personName}</td>
                                <td className="small text-sm">{stat.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>
        )
}

export default PersonStatistics;