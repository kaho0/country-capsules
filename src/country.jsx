import React, { useState, useEffect } from "react";
import "./country.css";

export default function Country({
  country,
  handleVisitedCountry,
  handleVisitedFlags,
  visited,
}) {
  const {
    name,
    flags,
    area,
    independent,
    cca2,
    ccn3,
    cca3,
    status,
    unMember,
    currencies,
  } = country;
  const currency = currencies ? Object.values(currencies)[0] : {};
  const [visitedState, setVisitedState] = useState(visited);

  useEffect(() => {
    setVisitedState(visited);
  }, [visited]);

  const handleVisited = () => {
    setVisitedState(!visitedState);
    handleVisitedCountry();
    if (!visitedState) {
      handleVisitedFlags(); // Only add flag if it's a new visit
    }
  };

  return (
    <div className={`box ${visitedState ? "visited" : ""}`}>
      <img src={flags.png} alt={`Flag of ${name.common}`} />
      <h3>Name: {name.common}</h3>
      {name.nativeName && name.nativeName.eng && (
        <h5>Native Official Name (English): {name.nativeName.eng.official}</h5>
      )}

      <div className="country-details">
        <div className="column">
          <h4>Area: {area}</h4>
          <p>Independent: {independent ? "Yes" : "No"}</p>
          <p>
            <small>CCA2: {cca2}</small>
          </p>
          <p>
            <small>CCN3: {ccn3}</small>
          </p>
          <p>
            <small>CCA3: {cca3}</small>
          </p>
          <p>Status: {status}</p>
          <p>UN Member: {unMember ? "Yes" : "No"}</p>
          {currency && (
            <>
              <p>Currency Name: {currency.name}</p>
              <p>Currency Symbol: {currency.symbol}</p>
            </>
          )}
        </div>
      </div>
      <div className="button-container">
        <button className="visited-button" onClick={handleVisited}>
          {visitedState ? "Wandered" : "Wanna fly"}
        </button>
        <button
          className="visited-button"
          onClick={() => handleVisitedFlags(flags.png)}
        >
          Heralds
        </button>
      </div>
      <div className="visited-text">
        {visitedState ? "I wandered this country" : "I want to visit"}
      </div>
    </div>
  );
}
