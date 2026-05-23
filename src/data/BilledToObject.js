export default class BilledToObject {
  /**
   * @param {string} companyName
   * @param {string} streetNumber
   * @param {string} streetName
   * @param {string} postalCode
   * @param {string} city
   * @param {string} state
   * @param {string} country
   */
  constructor(
    companyName,
    streetNumber,
    streetName,
    postalCode,
    city,
    state,
    country,
  ) {
    this.companyName = companyName;
    this.streetNumber = streetNumber;
    this.streetName = streetName;
    this.postalCode = postalCode;
    this.city = city;
    this.state = state;
    this.country = country;
  }
}
