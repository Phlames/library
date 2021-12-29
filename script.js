let myLibrary = [];

// Class book

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const bookTitle = document.getElementById('book-title')
const bookAuthor = document.getElementById('book-author')
const bookPages = document.getElementById('book-pages')
const bookRead= document.getElementById('book-read')
const bookContainer = document.getElementById('book-container')

const newButton = document.getElementById('new-book-button')

document.addEventListener('DOMContentLoaded', () => {
    newButton.addEventListener('click', addBook)
})

const addBook = (e) => {
    e.preventDefault(); // stops form submitting 
    let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value ,bookRead.checked);
        
    if (bookTitle.value == '' || bookAuthor.value == '') {
        alert("Please fill all valid forms");
    return;
    }
    
    myLibrary.push(book);
    document.querySelector('form').reset(); //resets the form
    // save to local storage
    updateLocalStorage();

    // create a book card for the new entry
    createBookCard(book)
    }


const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const bookCardTitle = document.createElement('h4')
    const bookCardAuthor = document.createElement('p')
    const bookCardPages = document.createElement('p')
    const bookCardRead = document.createElement('button')
    const bookCardDelete = document.createElement('button')

    bookCardRead.addEventListener('click', () => {
        book.read = !book.read;
        updateLocalStorage();
        if (book.read ? bookCardRead.textContent = 'read' : bookCardRead.textContent = 'not read');
    }
    );

    bookCardDelete.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1)
        updateLocalStorage();
        bookContainer.removeChild(bookCard);
    }
    )

    
    bookCard.classList.add('book-card')

    bookCardTitle.textContent = book.title;
    bookCardAuthor.textContent = book.author;
    bookCardPages.textContent = `${book.pages} pages`;

    if (book.read ? bookCardRead.textContent = 'read'  : bookCardRead.textContent = 'not read');

    bookCardDelete.textContent = 'Delete';
    bookCardDelete.classList.add('delete-button');

    bookCard.appendChild(bookCardTitle)
    bookCard.appendChild(bookCardAuthor)
    bookCard.appendChild(bookCardPages)
    bookCard.appendChild(bookCardRead)
    bookCard.appendChild(bookCardDelete)
    bookContainer.appendChild(bookCard)

}

//sample book for testing purposes
// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
// myLibrary.push(theHobbit);
// createBookCard(theHobbit);

//updates the local storage when needed
function updateLocalStorage() {
    localStorage.setItem("MyLibraryItems", JSON.stringify(myLibrary));
}

// checks local storage for existing library items and creates cards for them
 const checkLocalStorage = () => {
    if (localStorage.getItem('MyLibraryItems' === null)) {
        myLibrary = [] 
    }
        else 
        storageItems = JSON.parse(localStorage.getItem('MyLibraryItems'));
        myLibrary = storageItems;
    
        for (i = 0; i < myLibrary.length; i++) {
            createBookCard(myLibrary[i])
        }
    }
; 

// checks local storage when loading
window.onload = checkLocalStorage();