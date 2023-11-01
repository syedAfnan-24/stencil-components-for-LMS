import { Component,h } from "@stencil/core";

@Component({
    tag:"client-home",
    styleUrl:"client-home.css",
    shadow:true
})
export class ClientHome{
    currentUser = sessionStorage.getItem("currentUser")
    displayInfo = JSON.parse(localStorage.getItem(this.currentUser))
    name = this.displayInfo.name
    branch = this.displayInfo.branch
    inSem = this.displayInfo.sem
    usn=this.displayInfo.usn
    render(){
        return (
            <p>Welcome {this.name} of {this.branch}, {this.inSem} Sem, bearing USN: {this.usn}</p>
        )
    }
}