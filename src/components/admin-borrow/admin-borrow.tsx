import { Component, h } from '@stencil/core';
import { Borrow } from "./borrow-iterface";

@Component({
  tag: 'admin-borrow',
  styleUrl: 'admin-borrow.css',
  shadow: true,
})
export class AdminBorrow {
  borrows: Borrow[] = []

  componentWillLoad() {
    const storedBorrows = localStorage.getItem('borrow');
    if (storedBorrows) {
        this.borrows = JSON.parse(storedBorrows);
    }
}

  renderBorrows() {
    let heading = <h2>Borrowed Books List</h2>
    return (
        <div class="Booktable">
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
        </div>
    )

}

  render() {
    return this.renderBorrows();
  }

}
