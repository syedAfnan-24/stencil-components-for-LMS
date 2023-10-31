import { Component, h } from '@stencil/core';

@Component({
  tag: 'footer-section',
  styleUrl: 'footer-section.css',
  shadow: true,
})
export class FooterSection {

  render() {
    return (
      <div>
        <p id='copy-rights'>&copy; 2023 Library. All rights reserved.</p>
        <p id='sub-para'>are you the admin? <a href="adminLogin.html">Login here</a></p>
      </div>
    );
  }

}
