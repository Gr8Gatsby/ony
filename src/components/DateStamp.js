import { createElement, getHumanFriendlyDuration } from "../utils/utils.js"; // Replace with the actual path

export function createDateStampElement() {
  // Create the dateStampElement container
  const dateStampElement = createElement("span", { className: "date-stamp" });

  // Get the stored date from the root record or use the current date
  const storedDate = quip.apps.getRootRecord().get("date");
  console.log(`storedDate: ${storedDate}`)
  const formattedDate = formatDate(storedDate); // Format the stored date

  // Create the span element to display the date
  const dateSpan = createElement("span", {
    className: "date-info",
  });

  let humanFriendlyDatespan = '';
  if (isValidDate(storedDate)) {
    humanFriendlyDatespan = getHumanFriendlyDuration(storedDate);
    if(humanFriendlyDatespan !== ''){
      dateSpan.textContent = ` wrote this document in ${formattedDate} ${humanFriendlyDatespan}, `;
    } else {
      dateSpan.textContent = ` wrote this document in ${formattedDate}, `;
    }
  } else {
    dateSpan.textContent = ` wrote this document in ${formattedDate}, `;
  }

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
  let date = new Date(dateString);

  // Check if the date is invalid. If so, try parsing it.
  if (isNaN(date)) {
    // Attempt to parse dateString as a valid date
    date = new Date(Date.parse(dateString));
    if (isNaN(date)) {
      // If still invalid, use the current date
      date = new Date();
    }
  }

  const year = date.getFullYear();
  const monthIndex = date.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formattedDate = `${monthNames[monthIndex]} ${year}`;
  return formattedDate;
}




export function getCurrentMonthYear() {
  const now = new Date();
  quip.apps.getRootRecord().set("date", now);
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

function isValidDate(dateString) {
  // This function checks if the dateString is valid
  return !isNaN(new Date(dateString).getTime());
}