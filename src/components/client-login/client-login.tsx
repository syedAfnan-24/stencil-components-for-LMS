import { Component, h } from '@stencil/core';
import { User } from "../client-signup/user-interface";

@Component({
  tag: 'client-login',
  styleUrl: 'client-login.css',
  shadow: true,
})
export class ClientLogin {
  users: User[] = []
  username: HTMLInputElement
  password: HTMLInputElement

  componentWillLoad() {
    const storedUser = localStorage.getItem('users');
    if (storedUser) {
      this.users = JSON.parse(storedUser);
    }
  }


  //for handling form input
  handleForm(event: Event) {
    (event).preventDefault();
    let check = this.users.some(user=>user.name==this.username.value && user.password==this.password.value)
    if(check){
      window.location.href = "/home" //if credentials are correct
        sessionStorage.setItem("currentUser", this.username.value)
    }else{
      console.log("Login Failed")
    }
    this.resetFields()
  }

  //to reset after form submition
  resetFields() {
    this.username.value = ""
    this.password.value = ""
  }
  render() {
    return (
      <div class="container">
        <h1>Login</h1>
        <form onSubmit={this.handleForm.bind(this)}>
          <label htmlFor="username">User Name</label>
          <input type="text" id='username' ref={el => this.username = el} placeholder='Enter the User Name' required autoComplete='off' />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={el => this.password = el} placeholder='Enter your password' required autoComplete='off' />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

}
