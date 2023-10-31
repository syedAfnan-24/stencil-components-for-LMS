import { Component, Prop, State, h } from "@stencil/core";

@Component({
    tag: "my-nav",
    styleUrl: "my-nav-bar.css",
    shadow: true,
})

export class MyNavBar {

    @Prop() firstOption: string
    @Prop() firstHref:string
    @Prop() secondOption: string
    @Prop() secondHref:string
    @State() toggleBool: boolean = false
    render() {

        //three bars toggle button
        let mobileToggle = (<div class="menu-toggle" onClick={() => { this.toggleBool = true }}>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>)
        //dropdown
        let dropdownMenu;
        if (this.toggleBool) {
            dropdownMenu = (

                <div class="dropdown-menu">
                    <div class="menu-toggle" onClick={() => { this.toggleBool = false }}>
                        <p id="cross">X</p><br />
                        <a id="nav-link-dropdown" href={this.firstHref}>{this.firstOption}</a>
                        <a id="nav-link-dropdown" href={this.secondHref}>{this.secondOption}</a>
                    </div>
                </div>)
        }

        //Main Navigation Bar
        let navBar = (<nav class="navbar">
            <div class="logo">Library</div>
            {mobileToggle}
            <div class="menu">
                <a id="nav-link" href={this.firstHref}>{this.firstOption}</a>
                <a id="nav-link" href={this.secondHref}>{this.secondOption}</a>
            </div>
            {dropdownMenu}
        </nav>)
        return navBar
    }
}