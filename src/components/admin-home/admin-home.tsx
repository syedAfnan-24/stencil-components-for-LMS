import { Component, h, Element, State } from "@stencil/core";
import { Book } from "./book-interface";

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

    @State() borrowListState: boolean = false
    @State() returnListState: boolean = false



    //array initialization and declaration

    books: Book[] = []
    // returns: Return[] = []

    componentWillLoad() {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            this.books = JSON.parse(storedBooks);
        }
    }

    greetAdmin: string = sessionStorage.getItem("admin")

    //adding book
    handleForm() {
        const bookName: string = this.bookname.value
        const authorName: string = this.authorname.value
        const year: string = this.year.value
        const amt: number = +this.numberdays.value
        if (bookName && authorName && year && amt > 0) {
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
        return (
            <div class="Booktable">
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
            </div>
        )

    }



    // //renders the books that are returned
    // renderReturns() {
    //     let headingLOB = <h2>List of books Returned</h2>
    //     let listOfBorrow
    //     if (this.returnListState) {
    //         listOfBorrow = (
    //             <div>
    //                 {headingLOB}
    //                 <table>
    //                     <thead>
    //                         <th>ID</th>
    //                         <th>Book Name</th>
    //                         <th>Returned By</th>
    //                         <th>Borrowed Date</th>
    //                         <th>Returned Date</th>
    //                         <th>Fine</th>
    //                     </thead>
    //                     <tbody>
    //                         {this.returns.map(item => (
    //                             <tr key={item.id}>
    //                                 <td>{item.id}</td>
    //                                 <td>{item.bookname}</td>
    //                                 <td>{item.username}</td>
    //                                 <td>{item.bdate}</td>
    //                                 <td>{item.rdate}</td>
    //                                 <td>{item.fine}</td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>
    //             </div>)
    //     }
    //     return <div class="Booktable">{listOfBorrow}</div>
    // }

    render() {

        let BookForm = (
            <div>
                <h1>hello {this.greetAdmin}</h1>
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
            
            {BookForm}

            <div>
                {this.renderBooks()}
            </div>
            {/* {this.renderReturns()} */}
        </div>
    }
}