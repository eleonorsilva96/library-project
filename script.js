//the library
const myLibrary = [];

//DOM
const table = document.querySelector("table");
const dialog = document.querySelector("#dialog");
const showDialog = document.querySelector("#showDialog");
const confirmBtn = document.querySelector("button#confirmBtn");
const readList = document.querySelector("#read-list > ul");
//my library
// const book = document.querySelector(".library > .book");
const library = document.querySelector(".library");
const book = `
            <div class="book">
                    <div class="title-author">
                        <i class="fa-solid fa-book"></i>
                        <h3 id="title"></h3>
                        <div class="author-pages">
                            <h4 id="author"></h4> - <div id="pages"></div>
                        </div>
                    </div>
                    <div class="read-button">
                        <button id="read-book">Read</button>
                    </div>
                    <div class="remove-button">
                        <button id="remove-book">Remove</button>
                    </div>
                </div>
`;
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");

//event listeners
showDialog.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault(); //it will not submit the form

  let authorValue = document.querySelector("input#author").value;
  let titleValue = document.querySelector("input#title").value;
  let pagesValue = document.querySelector("input#pages").value;

  if (authorValue && titleValue && pagesValue) {
    verifyDuplicatedBooks(authorValue, titleValue);

    if (isMatching === true) {
      //if has found a matching input value dont create a new object book
      isMatching = false;
    } else {
      //create a new object instance and push it to the library array
      const newBook = new Book(authorValue, titleValue, pagesValue);
      myLibrary.push(newBook);

      showNewBook(newBook);
    }
  }

  dialog.close();
});

// object constructor
class Book {
  constructor(author, title, numberPages) {
    this.id = Math.random().toString(36).substring(2, 9);
    this.author = author;
    this.title = title;
    this.numberPages = numberPages;
  }

  changeStatus(checkbox) {
    if (checkbox.checked) {
      // this.status = status;
      const readItem = document.createElement("li");
      readList.appendChild(readItem);

      readItem.textContent = `Read ${this.author}`;
    } else {
      // this.status = false;
      const readItem = document.querySelector("#read-list > ul > li");

      readItem.remove();
    }
  }
}

function addBookToLibrary(author, title, numberPages) {
  const objectBook = new Book(author, title, numberPages);
  // const bookId = objectBook.id;

  myLibrary.push(objectBook);

  //create a table row and pass the index of the added object book
  showBookFromLibrary();
}

function showBookFromLibrary() {
  //  book.setAttribute("data-id", id);
  let bookContent = "";

  myLibrary.forEach((book) => {
    bookContent += `
            <div class="book" data-id="${book.id}">
                    <div class="title-author">
                        <img src="book-solid.svg" alt="book icon" width="28px" height="28px">
                        <h3 id="title">${book.title}</h3>
                        <div class="author-pages">
                            <h4 id="author">${book.author}</h4> ‧ <div class="pages" id="pages">${book.numberPages} pages</div>
                        </div>
                    </div>
                      <div class="book-buttons">
                      <div class="read-button">
                          <button id="read-book">Read</button>
                      </div>
                      <div class="remove-button">
                          <button id="remove-book">Remove</button>
                      </div>
                    </div>
                </div>
                `;
  });

  library.innerHTML = bookContent;

  // const tableCellButton = document.createElement("td");
  // const removeButton = document.createElement("button");
  // tableCellButton.appendChild(removeButton);

  // const tableCellCheck = document.createElement("td");
  // const statusCheck = document.createElement("input");
  // statusCheck.setAttribute("type", "checkbox");
  // tableCellCheck.appendChild(statusCheck);

  //the values method converts the book objects values in an array ["author", "title", "numberPages"]
  // Object.values(book).forEach((detail) => {
  //     const tableCell = document.createElement("td");
  //     tableCell.textContent = detail;

  //     tableRow.appendChild(tableCell);
  // });

  // tableRow.appendChild(tableCellButton);
  // tableRow.appendChild(tableCellCheck);

  // table.appendChild(tableRow);

  //add event handlers
  // removeButton.addEventListener("click", () => removeBook(id));
  // statusCheck.addEventListener("change", () => book.changeStatus(statusCheck));
}

function removeBook(id) {
  //find the position of the book in the array with the book object's id
  console.log(myLibrary);
  console.log(id);
  const index = myLibrary.findIndex((book) => book.id === id);
  console.log(index);
  //verify if its not null
  if (index !== -1) {
    console.log("remove");
    myLibrary.splice(index, 1);
    const tableRow = document.querySelector(`tr[data-id='${id}'`);

    if (tableRow) {
      tableRow.remove();
    } else {
      console.error("book row not found");
    }
  } else {
    console.error("book not found");
  }
}

function verifyDuplicatedBooks(newAuthor, newTitle) {
  myLibrary.forEach((book) => {
    if (newAuthor === book.author && newTitle === book.title) {
      isMatching = true;

      console.log("matching!");
    }
  });
}

addBookToLibrary("Sara Gruen", "Water for Elephants", "300");
addBookToLibrary("R.F. Kuang", "The Burning God (The Poppy War, #3)", "362");
addBookToLibrary("Haruki Murakami", "Sputnik Sweetheart", "200");
addBookToLibrary("Sara Gruen", "Water for Elephants", "300");
addBookToLibrary("R.F. Kuang", "The Burning God (The Poppy War, #3)", "362");
addBookToLibrary("Haruki Murakami", "Sputnik Sweetheart", "200");

// function Book(author, title, numberPages) {
//   this.id = Math.random().toString(36).substring(2, 9);
//   this.author = author;
//   this.title = title;
//   this.numberPages = numberPages;
// }

// Book.prototype.changeStatus = function (statusCheckbox) {
//   const readList = document.querySelector("#read-list > ul");

//   if (statusCheckbox.checked) {
//     this.status = true;

//     const readItem = document.createElement("li");
//     readList.appendChild(readItem);

//     readItem.textContent = `Read ${this.author}`;
//   } else {
//     this.status = false;

//     const readItem = document.querySelector("#read-list > ul > li");
//     readItem.remove();
//   }
// };

// function addBookToLibrary(author, title, numberPages) {
//   const newBook = new Book(author, title, numberPages);
//   myLibrary.push(newBook);
// }

// function updateBooks() {
//     let newIndex = 0;
//     //increase the size to be able loop until the end of the array
//     const tableRows = document.querySelectorAll("tr[data-index]");
//     // console.log(document.querySelectorAll("tr[data-index]").length);
// //     for(let i = 0; i < tableRows; i++) {
// //         // createTableRow(book, index);
// //         const tableRowUpdate = document.querySelector(`tr[data-index='${i}']`);

// //         console.log(i);
// //         // console.log(tableRowUpdate);

// //         if(tableRowUpdate) {
// //         tableRowUpdate.setAttribute("data-index", index);
// //         index++;
// //     }
// //   }

//   tableRows.forEach((row, index) => {
//     const tableRowUpdate = document.querySelector(`tr[data-index='${index}']`);

//     console.log(index);
//     // console.log(tableRowUpdate);
//     if(tableRowUpdate) {
//     tableRowUpdate.setAttribute("data-index", newIndex);
//     newIndex++;
// }
// // console.log(tableRows.length);

// });

// if(document.querySelector(`tr[data-index='${tableRows.length}']`)) {
//     console.log("hi!")
//     document.querySelector(`tr[data-index='${tableRows.length}']`).setAttribute("data-index", tableRows.length - 1);
// }
// }

// function setActionsOnNewBooks(newEntryIndex, newObjectInstance) {
//     const removeButton = document.querySelector(
//         `tr[data-index='${newEntryIndex}'] > td > button`
//       );
//       const statusCheckbox = document.querySelector(
//         `tr[data-index='${newEntryIndex}'] > td > input[type=checkbox]`
//       );

//       if (removeButton && statusCheckbox) {
//         removeButton.addEventListener("click", () => {
//           removeBook(newEntryIndex);
//           console.log("clicked remove button!");
//         });

//         statusCheckbox.addEventListener("change", () => {
//             newObjectInstance.changeStatus(statusCheckbox);
//         });
//   }
// }

// function setActionsOnListedBooks() {
//     myLibrary.forEach((book, index) => {
//       console.log(index);

//         const removeButton = document.querySelector(
//             `tr[data-index='${index}'] > td > button`
//           );
//           const statusCheckbox = document.querySelector(
//             `tr[data-index='${index}'] > td > input[type=checkbox]`
//           );

//           if (removeButton && statusCheckbox) {
//             removeButton.addEventListener("click", () => {
//               removeBook(index);
//               console.log("clicked remove button!");
//             });

//             statusCheckbox.addEventListener("change", () => {
//                 if(index === 1) {
//                     book1.changeStatus(statusCheckbox);
//                 } else if (index === 2) {
//                     book2.changeStatus(statusCheckbox);
//                 } else {
//                     book3.changeStatus(statusCheckbox);
//                 }
//             });
//       }

//     });

//   // console.log(myLibrary);
// }

//add some books objects
// const book1 = new Book("Sara Gruen", "Water for Elephants", "300");
// const book2 = new Book(
//   "R.F. Kuang",
//   "The Burning God (The Poppy War, #3)",
//   "362"
// );
// const book3 = new Book("Haruki Murakami", "Sputnik Sweetheart", "200");
// const bookConstructor = new Book();

// myLibrary.push(book1, book2, book3);

// book1.changeStatus();

// Modal

// listAllBooksAndActions();
// removeButtonDOM.addEventListener("click", removeBook());

// console.log(myLibrary);
