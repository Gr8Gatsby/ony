import { toggleAuthorsEditMode } from "./AuthorList.js";
import { toggleEditMode } from "./WhyComponent.js";
import { createElement } from "../utils/utils.js";

export function createInstructionPanel() {
  const instructionPanel = createElement("div", {
    id: "instructionPanel",
    style: "display: none",
  });

  const createLink = (textContent, onclick) =>
    createElement("a", { textContent, onclick });

  const createSpan = (textContent) =>
    createElement("span", { textContent });

  const editAuthorsLink = createLink("Edit authors", toggleAuthorsEditMode);
  const authorListInfo = createSpan(" - specify the list of author names separated by commas");
  const newLine = createElement("br");
  const editWhyLink = createLink("Edit why", toggleEditMode);
  const whyInfo = createSpan(" - type in why you wrote this document");

  [editAuthorsLink, authorListInfo, newLine, editWhyLink, whyInfo].forEach(
    (element) => {
      instructionPanel.appendChild(element);
    }
  );

  return instructionPanel;
}
