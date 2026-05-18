const pages = document.querySelectorAll(".page");

// first page elements
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-text");
const saveNoteBtn = document.getElementById("save-note");
const messageText = document.getElementById("messageText");

// second page elements
const noteList = document.getElementById("note-list");
const nothingToShowMsg = document.getElementById("nothingToShowMsg");

// third page elements
const noteTitleOpenedEl = document.getElementById("note-title-expanded");
const noteContentOpenedEl = document.getElementById("note-text-expanded");

// data
let noteArr = [];

let currentPage = 0;

loadData();

/**
 * It loads the data from localStorage, checks if there is something first
 * otherwise a console message will be shown
 */

function loadData() {
  const savedData = localStorage.getItem('notes');
  if (savedData) {
    noteArr = JSON.parse(savedData);
    noteArr.forEach((note)=> {
      showNote(note);
    });
  } else {
    console.log("Nothing is saved yet!");
  }
}

/**
 * The function removes the class active from all pages as a start 
 * and it displays the pages based on the index
 */
showPage(currentPage);

function showPage(index) {
    // hide all pages
    pages.forEach(page => {
        page.classList.remove("active");
    });

    // show selected page
    pages[index].classList.add("active");
}

/**
 * @returns true if the conditions are met and clears the messageText text content
 * It display a caution message for the user while trying to save a note without a title
 * and/or a content
 */

function cautions() {

  if (noteTitle.value === "") {
    messageText.textContent = "You should have a title first!";
    return false;
  }

  if (noteContent.value === "") {
    messageText.textContent = "You should write something first!";
    return false;
  }

  messageText.textContent = "";
  return true;
}

/**
 * The function capture the data and read from the inputs
 * Saves it in the note object and push it into the noteArr[] array and,
 * clears the inputs to be ready for the next note.
 */

function saveNoteData() {

  if(!cautions()) return;

  const note = {
    id: Date.now(),
    title: noteTitle.value,
    content: noteContent.value
  };

  noteArr.push(note);
  localStorage.setItem('notes', JSON.stringify(noteArr));

  noteContent.value = "";
  noteTitle.value = "";

  showNote(note);

  // debugging
  console.log(noteArr);
  
}

/**
 * The function create list element for notes
 * It uses an object to get the data
 * It displays them in the second page elements
 */

function showNote(obj) {

  // create elements
  const liEl = document.createElement("li");
  const divEl = document.createElement("div");
  const headerEl = document.createElement("h3");
  const paragraphEl = document.createElement("p");
  const deleteBtn = document.createElement("button");

  // adding attributes
  headerEl.classList.add("headerEl-title");
  paragraphEl.classList.add("noteContent-paragraph");
  deleteBtn.classList.add("deleteBtn");

  // each element content
  headerEl.textContent = obj.title;
  paragraphEl.textContent = obj.content;
  deleteBtn.textContent = "DELETE";

  // deleting note
  deleteBtn.addEventListener('click', (event)=> {
    event.stopPropagation();
    // updating the array
    noteArr = noteArr.filter((note)=> note.id !== obj.id);
    localStorage.setItem('notes', JSON.stringify(noteArr));
    // remove element form DOM
    liEl.remove();
  });

  // open note to other page
  liEl.addEventListener('click', ()=> {
    currentPage = 2;
    showPage(currentPage);

    noteTitleOpenedEl.textContent = obj.title;
    noteContentOpenedEl.textContent = obj.content;
  });

  // building the DOM
  divEl.appendChild(headerEl);
  divEl.appendChild(paragraphEl);
  divEl.appendChild(deleteBtn);
  liEl.appendChild(divEl);

  // adding all to the noteList
  noteList.appendChild(liEl);

}

// next button
document.querySelectorAll(".nextBtn").forEach(button => {
  button.addEventListener("click", () => {

    // showing a coution message if there are no notes saved
    nothingToShowMsg.textContent = "";
    if (noteArr.length <= 0) {
      nothingToShowMsg.textContent = "Nothing to show yet! Save a note first!";
    }

    if (currentPage < pages.length - 1) {
      currentPage++;
      showPage(currentPage);
    }
  });
});

// back buttons
document.querySelectorAll(".backBtn").forEach(button => {
  button.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  });
});

saveNoteBtn.addEventListener('click', saveNoteData);