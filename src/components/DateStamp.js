/**
 * Creates and returns a span element displaying the document creation date.
 * If the date is not set, it defaults to the current month and year.
 * @returns {HTMLElement} The created date span element.
 */
export function createDateSpan() {
  const dateSpan = document.createElement("span");
  const storedDate = quip.apps.getRootRecord().get("date") || getCurrentMonthYear();
  dateSpan.textContent = ` wrote this document in ${storedDate}, `;
  return dateSpan;
}

/**
 * Gets the current month and year in a formatted string.
 * @returns {string} The current month and year in the format "Month Year".
 */
export function getCurrentMonthYear() {
  const now = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}
