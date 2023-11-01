import { Component,h } from "@stencil/core";

@Component({
    tag:"admin-home",
    styleUrl:"admin-home.css",
    shadow:true
})
export class AdminHome{
    greetAdmin:string = sessionStorage.getItem("admin")
    render(){
        return <p>hello {this.greetAdmin}</p>
    }
}