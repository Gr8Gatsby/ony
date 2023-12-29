import { createElement } from "../utils/utils.js"; // Replace with the actual path

export function createDateStampElement() {
  // Create the dateStampElement container
  const dateStampElement = createElement("span", { className: "date-stamp" });

  // Get the stored date from the root record or use the current date
  const storedDate = quip.apps.getRootRecord().get("date");
  const formattedDate = formatDate(storedDate); // Format the stored date

  // Create the span element to display the date
  const dateSpan = createElement("span", {
    textContent: ` wrote this document in ${formattedDate}, `,
    className: "date-info",
  });

  // Create the input element for editing the date
  const dateInput = createElement("input", {
    type: "month",
    id: "dateInput",
    className: "inline-input",
    style: "display: none", // Initially hidden
    value: storedDate || getCurrentMonthYear(), // Pre-populate with current date if not set
  });

  // Append the elements to the dateStampElement
  [dateSpan, dateInput].forEach((element) => {
    dateStampElement.appendChild(element);
  });

  // Add click event listener to toggle edit mode
  // dateSpan.addEventListener("dblclick", () => {
  //   toggleDateEditMode();
  // });

  // Add blur event listener for input
  dateInput.addEventListener("blur", () => {
    handleDateInputBlur(dateInput, dateStampElement);
  });

  return dateStampElement;
}

function formatDate(dateString) {
  if (!dateString) {
    return getCurrentMonthYear(); // Return the current date if not set
  }

  const [year, month] = dateString.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const formattedDate = `${monthNames[parseInt(month) - 1]} ${year}`;
  return formattedDate;
}

export function getCurrentMonthYear() {
  const now = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const formattedDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  return formattedDate;
}

export function toggleDateEditMode() {
  const dateStampElement = document.querySelector(".date-stamp");
  const dateSpan = dateStampElement.querySelector(".date-info");
  const dateInput = dateStampElement.querySelector("#dateInput");

  dateSpan.style.display = "none";
  dateInput.style.display = "inline";
  dateInput.focus();
}

function handleDateInputBlur(dateInput, dateStampElement) {
  const selectedDate = dateInput.value;

  quip.apps.getRootRecord().set("date", selectedDate);

  const dateSpan = dateStampElement.querySelector(".date-info");
  dateSpan.style.display = "inline";

  // Update the displayed date with the formatted version
  dateSpan.textContent = ` wrote this document in ${formatDate(selectedDate)}, `;
  dateInput.style.display = "none";
}

