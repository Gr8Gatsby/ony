import { toggleAuthorsEditMode } from "../AuthorList.js";
import { toggleEditMode } from "../WhyComponent.js";

export function createInstructionPanel() {
  var instructionPanel = document.createElement("div");
  instructionPanel.id = "instructionPanel";
  instructionPanel.style.display = "none"; // Initially hidden

  // Create an anchor element
  const editAuthorsLink = document.createElement("a");
  editAuthorsLink.textContent = "Edit authors";

  // Create the <span> element
  var authorListInfo = document.createElement("span");
  authorListInfo.textContent =
    " - specify the list of author names separated by commas";

  // Create a new line element (<br>)
  var newLine = document.createElement("br");

  // Create an anchor element
  const editWhyLink = document.createElement("a");
  editWhyLink.textContent = "Edit why";

  // Create the <span> element
  var whyInfo = document.createElement("span");
  whyInfo.textContent =
    " - type in why your wrote this document";

  // Add a click event handler
  editAuthorsLink.addEventListener("click", () => {
    // Call the function to toggle the Edit Authors functionality
    toggleAuthorsEditMode();
  });

  // Add a click event handler
  editWhyLink.addEventListener("click", () => {
    // Call the function to toggle the Edit Authors functionality
    toggleEditMode();
  });

  // Append the link to a container or the document
  instructionPanel.appendChild(editAuthorsLink);
  instructionPanel.appendChild(authorListInfo);
  instructionPanel.appendChild(newLine);
  instructionPanel.appendChild(editWhyLink);
  instructionPanel.appendChild(whyInfo);

  /*instructionPanel.innerHTML = `<h3>Who, When, Why (ONY)</h3>
      Double click on the Authors names to edit the author's list. Input must be comma separated names e.g. <strong>Kevin Hill, Ian Varley</strong> <br/> <br/>
      Double click the <strong>bold</strong> text to edit the Why you created the document <br/>`;
*/
  return instructionPanel;
}
