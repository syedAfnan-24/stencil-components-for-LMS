import { Component, h } from '@stencil/core';
import { Request } from "../interfaces/request-interface";

@Component({
  tag: 'client-request',
  styleUrl: 'client-request.css',
  shadow: true,
})
export class ClientRequest {
  requests: Request[] = []
  name = sessionStorage.getItem("currentUser")
  componentWillLoad(){
    const booksRequested = localStorage.getItem('request');
    if (booksRequested) {
      this.requests = JSON.parse(booksRequested)
    }
  }

  renderRequests() {
    let heading = <h2>Requests to Borrow</h2>
    const filteredBorrows: Request[] = this.requests.filter(item => item.userName === this.name);
    return (
      <div class="Booktable">
        <div>
          {heading}
          <table>
            <thead>
              <th>ID</th>
              <th>Book Name</th>
              <th>Student Name</th>
            </thead>
            <tbody>
              {filteredBorrows.map(item => (
                <tr key={item.bookid}>
                  <td>{item.bookid}</td>
                  <td>{item.bookname}</td>
                  <td>{item.userName}</td>
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
