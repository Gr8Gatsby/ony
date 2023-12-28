import { toggleAuthorsEditMode } from "./AuthorList.js";
import { toggleEditMode } from "./WhyComponent.js";
import { createElement } from "../utils/utils.js"; // Replace with the actual path

export function createInstructionPanel() {
  // Create the instructionPanel element
  const instructionPanel = createElement("div", {
    id: "instructionPanel",
    style: "display: none", // Initially hidden
  });

  // Create and configure the "Edit authors" link
  const editAuthorsLink = createElement("a", {
    textContent: "Edit authors",
    onclick: toggleAuthorsEditMode,
  });

  // Create and configure the authorListInfo element
  const authorListInfo = createElement("span", {
    textContent: " - specify the list of author names separated by commas",
  });

  // Create a new line element (<br>)
  const newLine = createElement("br");

  // Create and configure the "Edit why" link
  const editWhyLink = createElement("a", {
    textContent: "Edit why",
    onclick: toggleEditMode,
  });

  // Create and configure the whyInfo element
  const whyInfo = createElement("span", {
    textContent: " - type in why you wrote this document",
  });

  // Append elements to the instructionPanel
  [editAuthorsLink, authorListInfo, newLine, editWhyLink, whyInfo].forEach(
    (element) => {
      instructionPanel.appendChild(element);
    }
  );

  return instructionPanel;
}
