document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("inputBook");
  let checkBox = document.getElementById("inputBookIsComplete");
  let incompleteBookshelfList = document.getElementById("incompleteBookshelfList");

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
    let books = [];
    let book = JSON.parse(localStorage.getItem("data_book"));

    if (book) {
      books.push(book);
    }
    return books;
  }

  function setLocalStorage(book) {
    const myJson = JSON.stringify(book);
    localStorage.setItem("data_book", myJson);
  }

  function loadDataStorage() {
    let books = getLocalStorage();
    let inComplete = "";
    console.log(books);
    books.forEach((book) => {
      console.log(book[0].isComplete);
    });
  }
});
