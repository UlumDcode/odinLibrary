const main = document.querySelector("main");
const bookForm = document.getElementById("bookForm");
const editIndexInput = document.getElementById("editIndex");
const addBookBtn = document.getElementById("books");

const book = [];

function books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Membuat object buku baru
const buku1 = new books("The Hobbit", "J.R.R. Tolkien", 295, false);
const buku2 = new books("Harry Potter", "J.K. Rowling", 300, true);
const buku3 = new books("Dzikir Ilalang", "Andi Bombang", 100, true); // Memasukkan ke dalam array
book.push(buku1);
book.push(buku2);
book.push(buku3);

// Fungsi untuk menampilkan buku ke layar
function displayBooks() {
  main.innerHTML = "";

  book.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const buttonLabels = ["Remove", "Edit", "Read"];

    const buttonsHTML = buttonLabels
      .map(
        (label) =>
          `<button data-index="${index}" class="btn-card">${label}</button>`,
      )
      .join("");

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>Author: ${item.author}</p>
      <p>Pages: ${item.pages} pages</p>
      <p>Status: ${item.read ? "Already Read" : "Not Read Yet"}</p>
      <div class="btn-group">${buttonsHTML}</div>
    `;
    main.appendChild(card);
  });
}
displayBooks();

main.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-card")) {
    const index = e.target.dataset.index;
    const action = e.target.innerText;
    switch (action) {
      case "Remove":
        book.splice(index, 1);
        displayBooks();
        break;
      case "Edit":
        const bookToEdit = book[index];

        document.getElementById("title").value = bookToEdit.title;
        document.getElementById("author").value = bookToEdit.author;
        document.getElementById("pages").value = bookToEdit.pages;
        document.getElementById("read").checked = bookToEdit.read;

        document.getElementById("editIndex").value = index;
        document.getElementById("modalTitle").innerText = "Edit Book";

        document.getElementById("bookModal").showModal();
        break;
        break;
      case "Read":
        book[index].read = !book[index].read;
        displayBooks();
        break;
    }
  }
});

addBookBtn.addEventListener("click", () => {
  const modalTitle = document.getElementById("modalTitle");
  const editIndexInput = document.getElementById("editIndex");
  const bookForm = document.getElementById("bookForm");
  const modal = document.getElementById("bookModal");

  modalTitle.innerText = "Add New Book";
  editIndexInput.value = -1; // -1 = mode tambah baru
  bookForm.reset();
  modal.showModal();
});

function saveBook() {
  // 1. Ambil nilai dari input
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  const index = document.getElementById("editIndex").value; // Ambil index dari hidden input

  // 2. Buat objek buku baru
  const newBook = { title, author, pages, read };

  // 3. Logika Tambah atau Edit
  if (index == -1) {
    // Mode Tambah: push ke array
    book.push(newBook);
  } else {
    // Mode Edit: timpa data lama
    book[index] = newBook;
  }

  // 4. Update tampilan dan tutup dialog
  displayBooks();
  document.getElementById("bookModal").close();
}
