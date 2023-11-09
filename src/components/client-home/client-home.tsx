import { Component, h } from "@stencil/core";
import { Book } from "./book-interface";
import { Borrow } from "../client-borrow/borrow-iterface";
import { Return } from "../client-borrow/return-interface";

@Component({
    tag: "client-home",
    styleUrl: "client-home.css",
    shadow: true
})
export class ClientHome {
    //arrays for storing in local storage
    books: Book[] = []
    borrows: Borrow[] = []
    returns: Return[] = []

    //variables to store user details that are to be displayed
    currentUser = sessionStorage.getItem("currentUser")
    displayInfo = JSON.parse(localStorage.getItem(this.currentUser))
    name = this.displayInfo.name
    branch = this.displayInfo.branch
    inSem = this.displayInfo.sem
    usn = this.displayInfo.usn


    componentWillLoad() {
        //storing/initializing previosly stored values of books and borrows every time component is loaded
        const storedBooks = localStorage.getItem('books');
        const booksBorrowed = localStorage.getItem('borrow')
        const booksReturned = localStorage.getItem('returned')
        if (storedBooks) {
            this.books = JSON.parse(storedBooks);
        }
        if (booksBorrowed) {
            this.borrows = JSON.parse(booksBorrowed)
        }
        if (booksReturned) {
            this.returns = JSON.parse(booksReturned)
        }
    }

    borrowBook(id, bookName) {
        let noDays = 7
        let dateNow = new Date();
        let condition

        if (id && bookName && noDays) {
            this.books = this.books.map(book=>{
                if(book.id == id){
                    book.nobooks -= 1
                    condition = book.nobooks
                }
                return book
            })
            if(condition>-1){
                const newBorrow: Borrow = {
                    id: id,
                    username: this.name,
                    bookname: bookName,
                    days: +noDays,
                    borrowdate: dateNow.toISOString().split('T')[0]
                }
                this.borrows.push(newBorrow)
                this.saveToBorrows()
                this.saveToLocalStorage()
                alert("borrowed book: "+bookName+" for: "+noDays+" days")
            }else{
                alert("book not available")
            }
        }

    }
    saveToBorrows() {
        localStorage.setItem("borrow", JSON.stringify(this.borrows))
    }
    saveToReturns() {
        localStorage.setItem("returned", JSON.stringify(this.returns))
    }
    saveToLocalStorage() {
        localStorage.setItem("books", JSON.stringify(this.books))
    }
    

    renderBooks() {
        let headingLOB = <h2>List of books</h2>
        return (
            <div class="Booktable">
                    {headingLOB}
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th>Available</th>
                            <th>Year</th>
                            <th>Borrow Book</th>
                        </thead>
                        <tbody>
                            {this.books.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.nobooks}</td>
                                    <td>{item.year}</td>
                                    <td><button id="borrow-btn" onClick={this.borrowBook.bind(this, item.id, item.title)}>Borrow</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        )
    }


    // //renders the books that are returned
    // renderReturns(){
    //     let headingLOB = <h2>List of books Returned</h2>
    //     const filteredReturns: Return[] = this.returns.filter(item => item.username === this.name);
        
    //     return (
    //         <div class="Booktable">
    //             {headingLOB}
    //             <table>
    //                 <thead>
    //                     <th>ID</th>
    //                     <th>Book Name</th>
    //                     <th>Returned By</th>
    //                     <th>Borrowed Date</th>
    //                     <th>Returned Date</th>
    //                     <th>Fine</th>
    //                 </thead>
    //                 <tbody>
    //                     {filteredReturns.map(item => (
    //                         <tr key={item.id}>
    //                             <td>{item.id}</td>
    //                             <td>{item.bookname}</td>
    //                             <td>{item.username}</td>
    //                             <td>{item.bdate}</td>
    //                             <td>{item.rdate}</td>
    //                             <td>{item.fine}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>)
    // }


    render() {
        return (
            <div class="container">
                <h1>Welcome {this.name}</h1>
                <p> <b>Branch</b> {this.branch} <br /> <b>Semester</b> {this.inSem} <br /> <b>USN:</b> {this.usn}</p>
                
                {this.renderBooks()}
                {/* {this.renderReturns()} */}
            </div>
        )
    }
}