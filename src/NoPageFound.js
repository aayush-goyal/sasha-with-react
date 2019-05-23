import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NoPageFound extends Component {
    componentDidMount() {
        document.title = '404 - Not Found';
    }
    
    render() {
        return (
            <div>Sorry no page found. Go back to <Link to="/">Home</Link></div>
        );
    }
}