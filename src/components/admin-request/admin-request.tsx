import { Component, h } from '@stencil/core';
import { Request } from "../interfaces/request-interface";
import { Book } from "../interfaces/book-interface";
import { Borrow } from "../interfaces/borrow-iterface";

@Component({
  tag: 'admin-request',
  styleUrl: 'admin-request.css',
  shadow: true,
})
export class AdminRequest {


  requests: Request[] = []
  books: Book[] = []
  borrows: Borrow[] = []

  componentWillLoad() {
    const booksRequested = localStorage.getItem('request');
    const storedBooks = localStorage.getItem('books');
    const booksBorrowed = localStorage.getItem('borrow');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
    if (booksBorrowed) {
      this.borrows = JSON.parse(booksBorrowed)
    }
    if (booksRequested) {
      this.requests = JSON.parse(booksRequested)
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(this.books))
  }

  saveToBorrows() {
    localStorage.setItem("borrow", JSON.stringify(this.borrows))
  }

  borrowBook(id, bookName, name) {
    let noDays = 7
    let dateNow = new Date();
    let condition //to check how many books are still left

    if (id && bookName && noDays) {
      this.books = this.books.map(book => {
        if (book.id == id) {
          book.nobooks -= 1
          condition = book.nobooks //reduced number of books after borrow
        }
        return book
      })
      if (condition > -1) { //checking if all books are borrowed...only if books are available books can be borrowed
        const newBorrow: Borrow = {
          id: id,
          username: name,
          bookname: bookName,
          days: +noDays,
          borrowdate: dateNow.toISOString().split('T')[0]
        }
        this.borrows.push(newBorrow)

        this.requests = this.requests.filter(item => item.bookid !== id || item.userName !== name)
        localStorage.setItem("request",JSON.stringify(this.requests))
        this.saveToBorrows()
        this.saveToLocalStorage()
        alert("Requested to Borrow: " + bookName + " for: " + noDays + " days")
      } else {
        alert("book not available")
      }
    }

  }

  reject(id,name){
    this.requests = this.requests.filter(item => item.bookid !== id || item.userName !== name)
    localStorage.setItem("request",JSON.stringify(this.requests))
  }

  renderRequests() {
    let heading = <h2>Requests to Borrow</h2>
    return (
      <div class="Booktable">
        <div>
          {heading}
          <table>
            <thead>
              <th>ID</th>
              <th>Book Name</th>
              <th>Student Name</th>
              <th>Approve</th>
              <th>Reject</th>
            </thead>
            <tbody>
              {this.requests.map(item => (
                <tr key={item.bookid}>
                  <td>{item.bookid}</td>
                  <td>{item.bookname}</td>
                  <td>{item.userName}</td>
                  <td><button id='approve' onClick={this.borrowBook.bind(this, item.bookid, item.bookname, item.userName)}>Approve</button></td>
                  <td><button id='reject' onClick={this.reject.bind(this, item.bookid, item.userName)}>Reject</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    return (
      this.renderRequests()
    );
  }

}
