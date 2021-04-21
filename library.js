let library = []
const btnAddBook = document.getElementById('btn-add-book')
const form = document.getElementById('add-book-form')
const formOverlay = document.getElementById('add-book-overlay')
const btnBookForm = document.getElementById('btn-open-add-new')
const cardCatalog = document.getElementById('card-catalog')

class Book{
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}
// test books
// library.push(new Book('The DaVinci Code', 'Dan Brown', 384, true))
// library.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false))
// library.push(new Book('Mitt Liv', 'Lars Monsen', 246, false))

function addBookToLibrary() {
    library.push(new Book(form.elements[0].value,               //title
                          form.elements[1].value,               //author
                          parseInt(form.elements[2].value),     //pages
                          form.elements[3].checked))            //read 
    clearLibrary()
    sortLibrary()
    createStoredCards()
    saveLocal()
}

function sortLibrary() {
    library.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      })
      library.sort((a, b) => {
        if (a.author.toLowerCase() > b.author.toLowerCase()) return 1;
        if (a.author.toLowerCase() < b.author.toLowerCase()) return -1;
        return 0;
      })
    console.table(library)
}

function clearForm() {
    form.elements[0].value = ''    
    form.elements[1].value = ''        
    form.elements[2].value = ''
    form.elements[3].checked = false
}

function showForm() {
    form.style.display = 'block'
    formOverlay.style.display = 'block'
    form.elements[0].focus()
}

function hideForm() {
    clearForm()
    form.style.display = 'none'
    formOverlay.style.display = 'none'
}

function createStoredCards() {
    for (let book of library) {
        createCard(book)
    }
}

function createCard (book) {
    let newCard = document.createElement('div')
    newCard.classList.add('library-card')
    newCard.innerHTML = `<button class='remove-book'>x</button>`
    newCard.innerHTML += `<b>${book.title}</b>
                          by ${book.author}<br><br>
                          ${book.pages} pg<br><br>
                          ${book.read ? 'read': 'not read'}<br><br>`
    cardCatalog.appendChild(newCard)
    newCard.firstChild.addEventListener('click', () => {
        deleteBook(library.indexOf(book), newCard)
    })
    newCard.addEventListener('dblclick', () => {
        markAsRead(library.indexOf(book))
    })
}

function clearLibrary () {
    cardCatalog.innerHTML = ''
}

function markAsRead (bookIndex) {
    library[bookIndex].read = !library[bookIndex].read
    clearLibrary()
    createStoredCards()
    saveLocal()
}

function deleteBook (bookIndex, card) {
    library.splice(bookIndex, 1)
    card.remove()
    saveLocal()
}

function saveLocal() {
    localStorage.setItem('library', JSON.stringify(library))
}

function restoreLocal() {
    if (localStorage.getItem('library')) {
        library = JSON.parse(localStorage.getItem('library'))
    }
    createStoredCards()
}

btnAddBook.addEventListener('click', () => {
    if (form.elements[0].value && form.elements[1].value && (parseInt(form.elements[2].value) > 0)) {
        addBookToLibrary()
        sortLibrary()
        clearForm()
        hideForm()
        }
    }
)

btnBookForm.addEventListener('click', showForm)
formOverlay.addEventListener('click', hideForm)

restoreLocal()