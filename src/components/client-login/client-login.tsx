import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'client-login',
  styleUrl: 'client-login.css',
  shadow: true,
})
export class ClientLogin {
  @Element() el:HTMLElement
  username:HTMLInputElement
  password:HTMLInputElement


  //for handling form input
  handleForm(event:Event){
    (event).preventDefault();
    // const password = this.username.value;
    const storedUser = JSON.parse(localStorage.getItem(this.username.value))

    if(storedUser && storedUser.name==this.username.value && storedUser.password==this.password.value){
      window.location.href = "/home" //if credentials are correct
      sessionStorage.setItem("currentUser",storedUser.name)
    }else{
      console.log("login Failed") //if credentials are wrong
    }
    this.resetFields()
  }

  //to reset after form submition
  resetFields(){
    this.username.value = ""
    this.password.value = ""
  }
  render() {
    return (
      <div class="container">
        <h1>Login</h1>
        <form onSubmit={this.handleForm.bind(this)}>
          <label htmlFor="username">User Name</label>
          <input type="text" id='username' ref={el=>this.username=el} placeholder='Enter the User Name' required autoComplete='off' />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={el=>this.password=el} placeholder='Enter your password'  required autoComplete='off' />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

}
