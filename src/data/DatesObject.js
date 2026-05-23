export default class DatesObject {
  /**
   * @param {Date} dateIssued
   * @param {Date} dueDate
   */
  constructor(dateIssued, dueDate) {
    this.dateIssued = dateIssued;
    this.dueDate = dueDate;
  }
}
