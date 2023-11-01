import { Component, h } from '@stencil/core';
import { Route, createRouter } from "stencil-router-v2";

const Router = createRouter()
@Component({
  tag: 'root-app'
})
export class RootApp {

  render() {
    return (
      <Router.Switch>
        <Route path="/">
          <my-nav first-option="Login" first-href="/login" second-option="SignUp" second-href="signup.html"></my-nav>
          <hero-section></hero-section>
          <features-section></features-section>
          <footer-section></footer-section>
        </Route>
        <Route path='/login'>
          <my-nav first-option="Home" first-href="/" second-option="SignUp" second-href="signup.html"></my-nav>
          <client-login></client-login>
        </Route>
      </Router.Switch>
    );
  }

}
