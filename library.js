const library = []
const btnAddBook = document.getElementById('btn-add-book')
const form = document.getElementById('add-book-form')



function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    library.push(new Book(newTitle, newAuthor, newPages, newRead))
}



library.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false))
library.push(new Book('The DaVinci Code', 'Dan Brown', 384, true))
library.push(new Book('Mitt Liv', 'Lars Monsen', 246, false))

btnAddBook.addEventListener('click', () => {
    library.push(new Book(form.elements[0].value,               //title
                          form.elements[1].value,               //author
                          parseInt(form.elements[2].value),     //pages
                          form.elements[3].checked))            //read 
    console.table(library)
    }
)