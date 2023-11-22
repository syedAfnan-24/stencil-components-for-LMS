import { Component, h } from "@stencil/core";
import { User } from "../interfaces/user-interface";

@Component({
    tag: "client-signup",
    styleUrl: "../client-login/client-login.css",
    shadow: true
})

export class ClientSignup {
    users: User[] = []
    name: HTMLInputElement
    password: HTMLInputElement
    branch: HTMLInputElement
    usn: HTMLInputElement
    sem: HTMLInputElement

    componentWillLoad() {
        const storedUser = localStorage.getItem('users');
        if (storedUser) {
            this.users = JSON.parse(storedUser);
        }
    }
    handleSubmit(event: Event) {
        (event).preventDefault();
        const name: string = this.name.value
        const password: string = this.password.value
        const branch: string = this.branch.value
        const usn: string = this.usn.value
        const sem: string = this.sem.value
        this.saveToLocalStorage(name, password, branch, usn, sem)
        this.resetFields()
    }
    resetFields() {
        this.name.value = ""
        this.password.value = ""
        this.branch.value = ""
        this.usn.value = ""
        this.sem.value = ""
    }
    saveToLocalStorage(name: string, password: string, branch: string, usn: string, sem: string) {
        if (name && password && branch && usn && sem) {
            const user = {
                name: name,
                password: password,
                branch: branch,
                usn: usn,
                sem: sem
            }
            this.users.push(user)
            localStorage.setItem("users", JSON.stringify(this.users))
        }
        alert("sign up success")
    }

    render() {

        return (
            <div class="container">
                <h1>SignUp</h1>
                <form id="formLogin" onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="username">User Name</label>
                    <input type="text" id='username' ref={el => this.name = el} placeholder='Enter the User Name' required autoComplete='off' />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={el => this.password = el} placeholder='Enter your password' required autoComplete='off' />
                    <label htmlFor="branch">Branch</label>
                    <input type="text" id='branch' ref={el => this.branch = el} placeholder='Enter your Branch' required autoComplete='off' />
                    <label htmlFor="usn">USN</label>
                    <input type="text" id='usn' ref={el => this.usn = el} placeholder='Enter your University Seat Number' required autoComplete='off' />
                    <label htmlFor="sem">Semester</label>
                    <input type="text" id='sem' ref={el => this.sem = el} placeholder='Enter your Semester' required autoComplete='off' />
                    <button type="submit">SignUp</button>
                </form>
            </div>
        )
    }
}