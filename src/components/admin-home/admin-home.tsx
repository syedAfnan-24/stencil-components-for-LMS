import { Component, h, Element, State } from "@stencil/core";
import { Book } from "./book-interface";
import { Borrow } from "./borrow-iterface";
import { Return } from "./return-interface";

@Component({
    tag: "admin-home",
    styleUrl: "admin-home.css",
    shadow: true
})
export class AdminHome {
    //input elements
    @Element() el: HTMLElement
    bookname: HTMLInputElement
    authorname: HTMLInputElement
    year: HTMLInputElement
    numberdays: HTMLInputElement

    @State() bookListState: boolean = false
    @State() borrowListState: boolean = false
    @State() returnListState: boolean = false



    //array initialization and declaration

    books: Book[] = []
    borrows: Borrow[] = []
    returns: Return[] = []

    componentWillLoad() {
        const storedBooks = localStorage.getItem('books');
        const storedBorrows = localStorage.getItem('borrow');
        const booksReturned = localStorage.getItem('returned')
        if (storedBooks) {
            this.books = JSON.parse(storedBooks);
        }
        if (storedBorrows) {
            this.borrows = JSON.parse(storedBorrows);
        }
        if (booksReturned) {
            this.returns = JSON.parse(booksReturned)
        }
    }

    greetAdmin: string = sessionStorage.getItem("admin")

    //adding book
    handleForm() {
        const bookName: string = this.bookname.value
        const authorName: string = this.authorname.value
        const year: string = this.year.value
        const amt: number = +this.numberdays.value
        if (bookName && authorName && year && amt>0) {
            const newBook: Book = {
                id: this.books.length + 1,
                title: bookName,
                author: authorName,
                nobooks: amt,
                year: +year
            }
            this.books.push(newBook)
            this.saveToLocalStorage()
        }
    }
    saveToLocalStorage() {
        localStorage.setItem("books", JSON.stringify(this.books))
    }
    deleteBook(id: number) {
        // let deleteID: number = +prompt("enter the id of book to delete")
        this.books = this.books.filter(book => book.id !== id)
        this.saveToLocalStorage()
        this.renderBooks()
        alert("book deleted")
    }
    editBook(id: number) {
        const editTitle = prompt("enter Book Title")
        const editAuthor = prompt("enter Author name")
        const editYear: number = +prompt("enter year of publication")
        const nobooks: number = +prompt("Enter the number of books")

        if (editAuthor && editTitle && editYear) {
            this.books = this.books.map(book => {
                if (book.id == id) {
                    book.title = editTitle
                    book.author = editAuthor
                    book.year = editYear
                    book.nobooks = nobooks
                }
                return book;
            })
            this.saveToLocalStorage()
            this.renderBooks()
        }
    }

    renderBooks() {
        let heading = <h2>Books List</h2>
        let bookListDisp
        if (this.bookListState) {
            bookListDisp = (
                <div>
                    {heading}
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Book Name</th>
                            <th>Available Books</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </thead>
                        <tbody>
                            {this.books.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.nobooks}</td>
                                    <td>{item.author}</td>
                                    <td>{item.year}</td>
                                    <td><button id="edit-btn" onClick={this.editBook.bind(this, item.id)}>edit</button></td>
                                    <td><button id="delete-btn" onClick={this.deleteBook.bind(this, item.id)}>delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div class="Booktable">
                {bookListDisp}
            </div>
        )

    }

    renderBorrows() {
        let heading = <h2>Borrowed Books List</h2>
        let borrowListDisp
        if (this.borrowListState) {
            borrowListDisp = (
                <div>
                    {heading}
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Book Name</th>
                            <th>No. Days</th>
                            <th>Borrow Date</th>
                        </thead>
                        <tbody>
                            {this.borrows.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.bookname}</td>
                                    <td>{item.days}</td>
                                    <td>{item.borrowdate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div class="Booktable">
                {borrowListDisp}
            </div>
        )

    }

    //renders the books that are returned
    renderReturns() {
        let headingLOB = <h2>List of books Returned</h2>
        let listOfBorrow
        if (this.returnListState) {
            listOfBorrow = (
                <div>
                    {headingLOB}
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Book Name</th>
                            <th>Returned By</th>
                            <th>Borrowed Date</th>
                            <th>Returned Date</th>
                            <th>Fine</th>
                        </thead>
                        <tbody>
                            {this.returns.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.bookname}</td>
                                    <td>{item.username}</td>
                                    <td>{item.bdate}</td>
                                    <td>{item.rdate}</td>
                                    <td>{item.fine}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)
        }
        return <div class="Booktable">{listOfBorrow}</div>
    }

    render() {
        console.log(this.books)

        let BookForm = (
            <div>
                <form onSubmit={this.handleForm.bind(this)}>
                    <label htmlFor="bookname">Name of Book</label>
                    <input type="text" id="bookname" ref={el => { this.bookname = el }} placeholder="Enter the Book Name" required />

                    <label htmlFor="authorname">Author Name</label>
                    <input type="text" id="authorname" ref={el => { this.authorname = el }} placeholder="Enter the Author Name" required />

                    <label htmlFor="amount">No Of Books</label>
                    <input type="number" id="amount" ref={el => { this.numberdays = el }} placeholder="Enter the number of books available" required />

                    <label htmlFor="year">Year of Publish</label>
                    <input type="number" id="year" ref={el => { this.year = el }} placeholder="Enter year of publication" required />

                    <button type="submit">Add Book</button>
                </form>

            </div>
        )
        return <div class="container">
            <h1>hello {this.greetAdmin}</h1>
            {BookForm}
            <div class="btn-div">
                <button onClick={() => { this.bookListState = true; this.borrowListState = false; this.returnListState = false }}>List of Books</button>
                <button onClick={() => { this.bookListState = false; this.borrowListState = true; this.returnListState = false }}>Borrowed Books</button>
                <button onClick={() => { this.bookListState = false; this.borrowListState = false; this.returnListState = true }}>Returned Books</button>
            </div>

            {this.renderBooks()}
            {this.renderBorrows()}
            {this.renderReturns()}
        </div>
    }
}