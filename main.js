document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("inputBook");
  let checkBox = document.getElementById("inputBookIsComplete");
  let incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  let completeBookshelfList = document.getElementById("completeBookshelfList");

  let data_exist = getLocalStorage();
  if (data_exist.length !== 0) {
    loadDataStorage();
  }

  form.addEventListener("submit", insertBook);
  checkBox.addEventListener("change", isChecked);

  /** ----------------------------------------------------------------- */
  function insertBook(e) {
    e.preventDefault();

    const id = +new Date();
    let books = getLocalStorage();
    let judul = document.getElementById("inputBookTitle").value;
    let penulis = document.getElementById("inputBookAuthor").value;
    let tahun = document.getElementById("inputBookYear").value;
    let isComplete = checkBox.checked;

    const book = {
      id: id,
      title: judul,
      author: penulis,
      year: tahun,
      isComplete: isComplete,
    };

    books.push(book);

    setLocalStorage(books);
    form.reset();
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";
    loadDataStorage();
  }

  function isChecked(e) {
    let span = document.getElementById("bookSubmit").children[0];

    if (e.currentTarget.checked) {
      span.innerText = "Selesai Dibaca";
    } else {
      span.innerText = "Belum selesai dibaca";
    }
  }

  // Reusable function
  function getLocalStorage() {
    let books = JSON.parse(localStorage.getItem("data_book"));
    if (books) {
      return books;
    } else {
      return (books = []);
    }
  }

  function setLocalStorage(book) {
    const myJson = JSON.stringify(book);
    localStorage.setItem("data_book", myJson);
  }

  function loadDataStorage() {
    let books = getLocalStorage();
    let Complete = "";
    let inComplete = "";

    /**
     * Create List Element
     */

    books.forEach((book) => {
      console.log(book);
      // create article
      let article = document.createElement("article");
      article.classList.add("book_item");

      // create h3 and p
      let title = document.createElement("h3");
      let author = document.createElement("p");
      let year = document.createElement("p");

      // Create action
      let action = document.createElement("div");
      action.classList.add("action");

      let buttonHapus = document.createElement("button");
      buttonHapus.classList.add("red");

      let textHapus = document.createTextNode("Hapus");
      buttonHapus.appendChild(textHapus);

      // if true
      if (book.isComplete) {
        let titleText = document.createTextNode(book.title);
        title.appendChild(titleText);

        let authorText = document.createTextNode("Penulis : " + book.author);
        author.appendChild(authorText);

        let yeartext = document.createTextNode("Tahun : " + book.year);
        year.appendChild(yeartext);

        let buttonInComplete = document.createElement("button");
        buttonInComplete.classList.add("green");

        let textInComplete = document.createTextNode("Belum Selesai diBaca");
        buttonInComplete.appendChild(textInComplete);

        action.append(buttonInComplete, buttonHapus);

        article.append(title, author, year, action);

        completeBookshelfList.appendChild(article);
      } else {
        let titleText = document.createTextNode(book.title);
        title.appendChild(titleText);

        let authorText = document.createTextNode("Penulis : " + book.author);
        author.appendChild(authorText);

        let yeartext = document.createTextNode("Tahun : " + book.year);
        year.appendChild(yeartext);

        let buttonComplete = document.createElement("button");
        buttonComplete.classList.add("green");

        let textInComplete = document.createTextNode("Selesai diBaca");
        buttonComplete.appendChild(textInComplete);

        action.append(buttonComplete, buttonHapus);

        article.append(title, author, year, action);

        incompleteBookshelfList.appendChild(article);
      }
    });
  }
});
