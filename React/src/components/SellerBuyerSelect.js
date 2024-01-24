import React, { useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import InputSelect from "../components/InputSelect";

const SellerBuyerSelect = ({ onSelect, selectedId, isSeller }) => {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Načtení seznamu osob
  useEffect(() => {
    apiGet("/api/persons").then((data) => setPersons(data));
  }, []);

  // Aktualizace vybrané osoby při změně vybraného ID
  useEffect(() => {
    const person = persons.find((p) => p._id === selectedId);
    setSelectedPerson(person);
  }, [selectedId, persons]);
  
  // Funkce pro změnu vybrané osoby a odeslání
  const handleSelectChange = (selectedValue) => {
    setSelectedPerson(selectedValue);
    onSelect(selectedValue, isSeller);
  };

  return (
    <div>
      <InputSelect
        name={`selected${isSeller ? "Seller" : "Buyer"}`}
        label={`Select ${isSeller ? "Seller" : "Buyer"}`}
        items={persons}
        value={selectedPerson?._id}
        handleChange={handleSelectChange}
      />
    </div>
  );
}

export default SellerBuyerSelect;