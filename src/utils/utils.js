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

  // Utility function to format time with correct pluralization
  const formatTime = (value, unit) => {
    return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
  };

  // Convert the original timestamp to milliseconds since the Unix epoch
  const originalTimestampMs = parseInt(new Date(date).getTime());

  // Get the current timestamp in milliseconds since the Unix epoch
  const currentTimestampMs = Date.now();

  // Calculate the difference in milliseconds between the timestamps
  const millisecondsDiff = currentTimestampMs - originalTimestampMs;

  // Calculate weeks difference
  const weeksDiff = Math.floor(millisecondsDiff / 604800000);

  // Determine and format the human-friendly time distance
  if (weeksDiff < 4) {
    return formatTime(weeksDiff, 'week');
  } else if (weeksDiff < 52) {
    return formatTime(Math.floor(weeksDiff / 4), 'month');
  } else {
    return formatTime(Math.floor(weeksDiff / 52), 'year');
  }
}