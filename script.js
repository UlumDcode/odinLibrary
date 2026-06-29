const main = document.querySelector("main");
const bookForm = document.getElementById("bookForm");
const editIndexInput = document.getElementById("editIndex");

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
        console.log(`tombol ${action} ditekan pada index ${index}`);
        break;
      case "Read":
        book[index].read = !book[index].read;
        displayBooks();
        break;
    }
  }
});

// Hapus tanda titik (.) karena getElementById mencari berdasarkan ID langsung
const addBookBtn = document.getElementById("books");

addBookBtn.addEventListener("click", () => {
  const modalTitle = document.getElementById("modalTitle"); // Pastikan ID ini ada di modal
  const editIndexInput = document.getElementById("editIndex"); // Pastikan ID ini ada di modal
  const bookForm = document.getElementById("bookForm"); // Pastikan ID ini ada di modal
  const modal = document.getElementById("bookModal");

  modalTitle.innerText = "Add New Book";
  editIndexInput.value = -1; // -1 = mode tambah baru
  bookForm.reset();
  modal.showModal();
});
