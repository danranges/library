const library = []
const btnAddBook = document.getElementById('btn-add-book')
const form = document.getElementById('add-book-form')
const formOverlay = document.getElementById('add-book-overlay')
const btnBookForm = document.getElementById('btn-open-add-new')



function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    library.push(new Book(form.elements[0].value,               //title
                          form.elements[1].value,               //author
                          parseInt(form.elements[2].value),     //pages
                          form.elements[3].checked))            //read 
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
}

function hideForm() {
    form.style.display = 'none'
    formOverlay.style.display = 'none'
}

library.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false))
library.push(new Book('The DaVinci Code', 'Dan Brown', 384, true))
library.push(new Book('Mitt Liv', 'Lars Monsen', 246, false))

btnAddBook.addEventListener('click', () => {
    if (form.elements[0].value && form.elements[0].value && form.elements[0].value) {
        addBookToLibrary()
        clearForm()
        hideForm()
        }
    }
)

btnBookForm.addEventListener('click', showForm)
formOverlay.addEventListener('click', hideForm)