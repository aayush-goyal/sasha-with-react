import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import About from './About';
import Categories from './Categories';
import Category from './Category';
import Contact from './Contact';
import Article from './Article';
import Articles from './Articles';
import Home from './Home';
import NoPageFound from './NoPageFound';

export default class Page extends Component {
    render() {
        return (
            <Router>
                <div className="overlay-wrapper">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/categories" component={Categories}/>
                        <Route path="/category/:id" component={Category}/>
                        <Route path="/about" component={About}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/articles" component={Articles}/>
                        <Route path="/article/:id" render={props => <Article {...props} />}/>
                        <Route component={NoPageFound}/>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navBarLinksClassName: ['menu-item active', 'menu-item', 'menu-item', 'menu-item'],
            activeNavBarLinkPosition: 0,
            navBarToggleAriaExpanded: false,
            navBarToggleClassName: 'navbar-toggle collapsed',
            navBarClassName: 'collapse navbar-collapse',
            navLinkClassName: 'menu-item',
            navLinkActiveClassName: 'menu-item active'
        };
    }
    
    toggleNavBar() {
        if (this.state.navBarToggleClassName == 'navbar-toggle collapsed') {
            this.setState({
                navBarToggleAriaExpanded: true,
                navBarToggleClassName: 'navbar-toggle',
                navBarClassName: 'collapse navbar-collapse in'
            });
        } else {
            this.setState({
                navBarToggleAriaExpanded: false,
                navBarToggleClassName: 'navbar-toggle collapsed',
                navBarClassName: 'collapse navbar-collapse'
            });
        }
    }
    
    render() {
        return (
            <header className="masthead">
                <div className="header-bottom">
                    <div className="container">
                        <nav className="navbar navbar-default">
                            <div className="navbar-header">
                                <button onClick={this.toggleNavBar} type="button" className={this.state.navBarToggleClassName} data-toggle="collapse" data-target="#main-menu" aria-expanded={this.state.navBarToggleAriaExpanded}>
                                    <i className="fa fa-bars"></i>
                                </button>
                            </div>
                            
                            <div id="main-menu" className={this.state.navBarClassName}>
                                <ul className="nav navbar-nav">
                                    <li className="menu-item"><NavLink to="/">Home</NavLink></li>
                                    <li className="menu-item"><NavLink to="/categories">Categories</NavLink></li>
                                    <li className="menu-item"><NavLink to="/about">About</NavLink></li>
                                    <li className="menu-item"><NavLink to="/contact">Contact</NavLink></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }    
}

class Footer extends React.Component {
    render() {
        return (
            <footer className="site-footer colophon">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                        </div>

                        <div className="col-sm-6">
                            <div className="copyright text-center">
                                © Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="footer-social pull-right">
                                <a href="https://www.instagram.com/aayushgoyal_"><i className="fa fa-instagram"></i></a>
                                <a href="https://www.twitter.com/aayushgoyal_"><i className="fa fa-twitter"></i></a>
                                <a href="https://www.facebook.com/aayushgoyal.mps"><i className="fa fa-facebook"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }    
}

export { Header, Footer };