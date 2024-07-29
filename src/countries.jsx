import React, { useEffect, useState } from "react";
import Country from "./country";
import "./countries.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [visitedFlags, setVisitedFlags] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleVisitedCountry = (country) => {
    setVisitedCountries((prev) => [...prev, country]);
  };

  const handleVisitedFlags = (flag) => {
    setVisitedFlags((prev) => [...prev, flag]);
  };

  return (
    <div>
      <h3>Countries: {countries.length}</h3>
      <div>
        <h4>Visited countries: {visitedCountries.length}</h4>
        <ul>
          {visitedCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      </div>
      <div className="flag-container">
        {visitedFlags.map((flag, index) => (
          <img key={index} src={flag} alt={`Flag ${index}`} />
        ))}
      </div>
      <div className="country-container">
        {countries.map((country) => (
          <Country
            key={country.cca3}
            country={country}
            handleVisitedCountry={() => handleVisitedCountry(country)}
            handleVisitedFlags={() => handleVisitedFlags(country.flags.png)}
            visited={visitedCountries.includes(country)}
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
