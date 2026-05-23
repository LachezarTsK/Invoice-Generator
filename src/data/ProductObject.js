export default class ProductObject {

  /**
   * 
   * @param {number} id 
   * @param {string} name 
   * @param {number} unitOfMeasure 
   * @param {number} quantity 
   * @param {string} currency 
   * @param {number} price 
   */
  constructor(id, name, unitOfMeasure, quantity, currency, price) {
    this.id = id;
    this.name = name;
    this.unitOfMeasure = unitOfMeasure;
    this.quantity = quantity;
    this.currency = currency;
    this.price = price;
  }
}
