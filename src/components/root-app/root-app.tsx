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
        {/* landing page */}
        <Route path="/">
          <my-nav first-option="Login" first-href="/login" second-option="SignUp" second-href="/signup"></my-nav>
          <hero-section></hero-section>
          <features-section></features-section>
          <footer-section />
        </Route>
        {/* login page */}
        <Route path='/login'>
          <my-nav first-option="Home" first-href="/" second-option="SignUp" second-href="/signup"></my-nav>
          <client-login></client-login>
        </Route>
        {/* signup page */}
        <Route path='/signup'>
          <my-nav first-option="Home" first-href="/" second-option="Login" second-href="/login"></my-nav>
          <client-signup></client-signup>
        </Route>
        {/* client home page */}
        <Route path="/home">
          <my-nav first-option="Borrowed" first-href="/client-borrowed" second-option="Rerturned" second-href="/client-returned" log-out='Log Out'></my-nav>
          <client-home></client-home>
        </Route>
        {/* admin login  */}
        <Route path='/admin-login'>
          <my-nav first-option="Home" first-href="/" second-option="Admin SignUp" second-href="/admin-signup"></my-nav>
          <admin-login></admin-login>
        </Route>
        {/* admin signup */}
        <Route path='/admin-signup'>
          <my-nav first-option="Home" first-href="/" second-option="Admin Login" second-href="/admin-login"></my-nav>
          <admin-signup></admin-signup>
        </Route>
        {/* admin home page */}
        <Route path="/controlls">
          <my-nav log-out='Log Out'></my-nav>
          <admin-home></admin-home>
        </Route>
        {/* page for rendering the books borrowed by client */}
        <Route path='/client-borrowed'>
          <my-nav first-option="Dashboard" first-href="/home" second-option="Rerturned" second-href="/client-returned" log-out='Log Out'></my-nav>
          <client-borrow></client-borrow>
        </Route>
        {/* page for rendering the books Returned by client */}
        <Route path='/client-returned'>
          <my-nav first-option="Dashboard" first-href="/home" second-option="Borrowed" second-href="/client-borrowed" log-out='Log Out'></my-nav>
          <client-return></client-return>
        </Route>

      </Router.Switch>
    );
  }

}
