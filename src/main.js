import './styles.css';
import {
  createAuthorsSpan,
  createAuthorsInput,
  setupAuthorsEventListeners,
  toggleAuthorsEditMode,
} from "./components/AuthorList.js";
import { createDateStampElement, toggleDateEditMode } from "./components/DateStamp.js"; // Update the import
import {
  createInputElements,
  initializeValues,
  setupInputEventListeners,
  toggleEditMode,
} from "./components/WhyComponent.js";
import { createInstructionPanel } from "./components/Instructions.js";

quip.apps.initialize({
  initializationCallback: (root, params) => {
    const storedAuthors = quip.apps.getRootRecord().get("authors") || [];
    const authors = storedAuthors.length > 0 ? storedAuthors : [quip.apps.getViewingUser().getName()];

    const instructionPanel = createInstructionPanel();
    const showInstructionPanel = () => instructionPanel.style.display = "block";
    const hideInstructionPanel = () => instructionPanel.style.display = "none";

    quip.apps.addEventListener(quip.apps.EventType.FOCUS, showInstructionPanel);
    quip.apps.addEventListener(quip.apps.EventType.BLUR, hideInstructionPanel);

    const { readOnlySpan, inputBox } = createInputElements();
    const authorsSpan = createAuthorsSpan(authors);
    const authorsInput = createAuthorsInput(authors);

    initializeValues(readOnlySpan, inputBox);

    // Create the DateStamp element
    const dateStampElement = createDateStampElement();

    // Append all elements to the root
    [authorsSpan, authorsInput, dateStampElement, readOnlySpan, inputBox, instructionPanel].forEach(elem => root.appendChild(elem));

    registerMenuCommand();
    setupInputEventListeners(inputBox, readOnlySpan);
    setupAuthorsEventListeners(authorsSpan, authorsInput, authors);

    quip.apps.addEventListener(quip.apps.EventType.DOCUMENT_MEMBERS_LOADED, () => processDocumentMembers(authors, root));
  },
});

function registerMenuCommand() {
  quip.apps.updateToolbar({
    menuCommands: [
      {
        id: "toggleEdit",
        label: "Edit Why",
        handler: toggleEditMode,
      },
      {
        id: "toggleAuthorEdit",
        label: "Edit Authors",
        handler: toggleAuthorsEditMode,
      },
      {
        id: "toggleEditDate",
        label: "Edit Date",
        handler: toggleDateEditMode,
      },
    ],
    toolbarCommandIds: ["toggleAuthorEdit", "toggleEditDate", "toggleEdit"],
    highlightedCommandIds: ["toggleEdit"],
  });
}

function findUrlInMember(member) {
  // Assuming the URL and width are always within the first element of an array in the member object
  for (let key in member) {
      if (member.hasOwnProperty(key) && Array.isArray(member[key]) && member[key].length > 0) {
          if (member[key][0].hasOwnProperty('url') && member[key][0].width === 25) {
              return member[key][0].url;
          }
      }
  }
  return null; // Return null if no URL found
}

function processDocumentMembers(authors, root) {
  console.log("Members loaded");
  const allMembers = quip.apps.getDocumentMembers();
  const authorImages = allMembers
      .filter(member => authors.includes(member.getName()))
      .map(member => {
          const url = findUrlInMember(member);
          return url ? { url, name: member.getName() } : null;
      })
      .filter(member => member !== null); // Filter out null entries

  quip.apps.getRootRecord().set("authorImages", authorImages);
  
  // Dispatch the custom event
  const event = new CustomEvent('authorImagesLoaded');
  document.dispatchEvent(event);
}
