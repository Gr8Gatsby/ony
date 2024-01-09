/**
 * Creates an HTML element with specified properties.
 * @param {string} type - The type of HTML element (e.g., "div", "span").
 * @param {Object} props - Object containing properties to assign to the element.
 * @param {Array<HTMLElement>} children - An array of child elements to append.
 * @returns {HTMLElement} The created HTML element.
 */
export function createElement(type, props, children = []) {
  const element = document.createElement(type);
  Object.assign(element, props);
  children.forEach((child) => {
    element.appendChild(child);
  });
  return element;
}

export function getHumanFriendlyDuration(date) {
  console.log(date);
  // Convert the original timestamp to milliseconds since the Unix epoch
  const originalTimestampMs = parseInt(new Date(date).getTime());

  // Get the current timestamp in milliseconds since the Unix epoch
  const currentTimestampMs = Date.now();

  // Calculate the difference in milliseconds between the timestamps
  const millisecondsDiff = currentTimestampMs - originalTimestampMs;

  // Format the human-friendly time distance
  var humanFriendlyDuration = "";
  const weeksDiff = Math.floor(millisecondsDiff / 604800000);
  if (weeksDiff < 3) {
    humanFriendlyDuration = `${weeksDiff} weeks ago`;
  } else if (weeksDiff < 52) {
    humanFriendlyDuration = `${Math.floor(weeksDiff / 4)} months ago`;
  } else {
    humanFriendlyDuration = `${Math.floor(weeksDiff / 52)} years ago`;
  }

  return humanFriendlyDuration;
}
