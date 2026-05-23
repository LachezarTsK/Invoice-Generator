import { useState } from "react";

import "../styles/styles.css";
import "../styles/stylesBilledTo.css";

/**
 * @param {function} handleSetBilledTo
 * @return React Component
 */
export default function BilledTo({ handleSetBilledTo }) {
  const [companyName, setCompanyName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  function resetEntryBilledTo() {
    handleSetBilledTo("reset");
    setCompanyName("");
    setStreetNumber("");
    setStreetName("");
    setPostalCode("");
    setCity("");
    setState("");
    setCountry("");
  }

  return (
    <form
      className="containerBilledTo"
      onReset={(e) => {
        resetEntryBilledTo(e.target.va);
        e.preventDefault(e);
        e.stopPropagation(e);
      }}
    >
      <div className="textBilledTo topLabel">Billed To</div>
      {/* ----- Input Company Name -----*/}
      <div className="containerInput">
        <input
          id="CompanyName"
          name="CompanyName"
          className="inputBilledTo"
          type="text"
          placeholder="Required"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            handleSetBilledTo("companyName", e.target.value);
          }}
        />
        <label htmlFor="CompanyName" className="textBilledTo">
          Company Name
        </label>
      </div>

      {/* ----- Input Street Number -----*/}
      <div className="containerInput">
        <input
          id="StreetNumber"
          name="StreetNumber"
          className="inputBilledTo"
          type="text"
          placeholder="Required"
          value={streetNumber}
          onChange={(e) => {
            setStreetNumber(e.target.value);
            handleSetBilledTo("streetNumber", e.target.value);
          }}
        />
        <label htmlFor="StreetNumber" className="textBilledTo">
          Street Number
        </label>
      </div>

      {/* ----- Input Street Name -----*/}
      <div className="containerInput">
        <input
          id="StreetName"
          name="StreetName"
          className="inputBilledTo"
          type="text"
          placeholder="Required"
          value={streetName}
          onChange={(e) => {
            setStreetName(e.target.value);
            handleSetBilledTo("streetName", e.target.value);
          }}
        />
        <label htmlFor="StreetName" className="textBilledTo">
          Street Name
        </label>
      </div>

      {/* ----- Input Postal Code -----*/}
      <div className="containerInput">
        <input
          id="PostalCode"
          name="PostalCode"
          className="inputBilledTo"
          type="text"
          placeholder="Required"
          value={postalCode}
          onChange={(e) => {
            setPostalCode(e.target.value);
            handleSetBilledTo("postalCode", e.target.value);
          }}
        />
        <label htmlFor="PostalCode" className="textBilledTo">
          Postal Code
        </label>
      </div>

      {/* ----- Input City -----*/}
      <div className="containerInput">
        <input
          id="City"
          name="City"
          className="inputBilledTo"
          type="text"
          placeholder="Required"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            handleSetBilledTo("city", e.target.value);
          }}
        />
        <label htmlFor="City" className="textBilledTo">
          City
        </label>
      </div>

      {/* ----- Input State -----*/}
      <div className="containerInput">
        <input
          id="State"
          name="State"
          className="inputBilledTo"
          type="text"
          placeholder="Required, If not applicable, enter N/A "
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            handleSetBilledTo("state", e.target.value);
          }}
        />
        <label htmlFor="State" className="textBilledTo">
          State
        </label>
      </div>

      {/* ----- Input Country -----*/}
      <div className="containerInput">
        <input
          id="Country"
          name="Country"
          className="inputBilledTo"
          type="text"
          placeholder="Required"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            handleSetBilledTo("country", e.target.value);
          }}
        />
        <label htmlFor="Country" className="textBilledTo">
          Country
        </label>
      </div>

      {/* ----- Button Reset Billed To Entry ----- */}
      <div>
        <button className="button" type="reset">
          Reset Billed To Entry
        </button>
      </div>
    </form>
  );
}
