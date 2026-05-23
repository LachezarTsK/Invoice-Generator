/**
 * @param {number} value
 * @return string
 */
export function formatNumber(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

/**
 *
 * @param {Date} date
 * @returns Date
 */
export function formatDate(date) {
  return date.toLocaleDateString("en-US", options);
}
