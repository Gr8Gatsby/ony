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