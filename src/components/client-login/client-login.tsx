import { Component, h } from '@stencil/core';

@Component({
  tag: 'client-login',
  styleUrl: 'client-login.css',
  shadow: true,
})
export class ClientLogin {

  render() {
    return (
      <div class="container">
        <h1>Login</h1>
        <form id="loginForm">
          <label htmlFor="username">User Name</label>
          <input type="text" id='username' placeholder='Enter the User Name' required autoComplete='off' />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder='Enter your password'  required autoComplete='off' />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

}
