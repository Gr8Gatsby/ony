import './styles.css';
import {
  createAuthorsSpan,
  createAuthorsInput,
  setupAuthorsEventListeners,
  toggleAuthorsEditMode,
} from "./components/AuthorList.js";
import { createDateSpan } from "./components/DateStamp.js";
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

    [authorsSpan, authorsInput, createDateSpan(), readOnlySpan, inputBox, instructionPanel].forEach(elem => root.appendChild(elem));

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
        label: "Change Why",
        handler: toggleEditMode,
      },
      {
        id: "toggleAuthorEdit",
        label: "Edit Authors",
        handler: toggleAuthorsEditMode,
      },
    ],
    toolbarCommandIds: ["toggleAuthorEdit", "toggleEdit"],
    highlightedCommandIds: ["toggleEdit"],
  });
}

function processDocumentMembers(authors, root) {
  console.log("Members loaded");
  const allMembers = quip.apps.getDocumentMembers();
  const authorImages = allMembers
    .filter(member => authors.includes(member.getName()))
    .map(member => ({ url: member.aD[0].url, name: member.getName() }));

  quip.apps.getRootRecord().set("authorImages", authorImages);
}
