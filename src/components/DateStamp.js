export function createDateSpan() {
  const dateSpan = document.createElement("span");
  const storedDate = quip.apps.getRootRecord().get("date") || getCurrentMonthYear();
  dateSpan.textContent = ` wrote this document in ${storedDate}, `;
  return dateSpan;
}

export function getCurrentMonthYear() {
  const now = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}
