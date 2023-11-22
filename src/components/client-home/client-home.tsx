import { Component, h } from "@stencil/core";
import { Book } from "../interfaces/book-interface";
import { Borrow } from "../interfaces/borrow-iterface";
import { Return } from "../interfaces/return-interface";
import { Request } from "../interfaces/request-interface";
import { User } from "../interfaces/user-interface";

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
    requests: Request[] = []
    users: User[] = []

    //variables to display user details
    name 
    branch
    inSem
    usn 

    componentWillLoad() {
        //storing/initializing previosly stored values of books and borrows every time component is loaded
        const storedBooks = localStorage.getItem('books');
        const booksBorrowed = localStorage.getItem('borrow')
        const booksReturned = localStorage.getItem('returned');
        const booksRequested = localStorage.getItem('request');
        const storedUsers = localStorage.getItem('users')

        if (storedBooks) {
            this.books = JSON.parse(storedBooks);
        }
        if (booksBorrowed) {
            this.borrows = JSON.parse(booksBorrowed)
        }
        if (booksReturned) {
            this.returns = JSON.parse(booksReturned)
        }
        if (booksRequested) {
            this.requests =JSON.parse(booksRequested)
        }
        if(storedUsers){
            this.users=JSON.parse(storedUsers)
        }
    }

    //variables to store user details that are to be displayed
    currentUser = sessionStorage.getItem("currentUser")

    currentUserInfo = this.users.find(user => user.name === this.currentUser);
    

    //I will revisit this function

    

    requestBook(id, bookName, name){
        const request:Request = {
            bookid:id,
            bookname:bookName,
            userName:name
        }
        this.requests.push(request)
        localStorage.setItem("request",JSON.stringify(this.requests))
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
                        <th>Request Book</th>
                    </thead>
                    <tbody>
                        {this.books.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.nobooks}</td>
                                <td>{item.year}</td>
                                <td><button id="borrow-btn" onClick={this.requestBook.bind(this, item.id, item.title,this.name)}>Request</button></td>
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
        
        let x = this.users.find(user => user.name === this.currentUser)
        this.name=x.name
        this.branch=x.branch
        this.inSem = x.sem
        this.usn = x.usn
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