import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

export default class Categories extends Component {
    
    constructor(props) {
        super(props);
        this.category = {
            cover_image: '',
            id: '',
            title: ''
        };
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        document.title = 'All Categories';
        
        var db = firebase.firestore();
        var categoriesRef = db.collection('categories');
        const categories = [];

        categoriesRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let category = doc.data();
                category.id = doc.id;
                categories.push(category);
            });
            this.setState({
                categories: categories
            });
        });
    }
    
    render() {
        return (
            <section className="main-content">
            <div className="padding">
                <div className="container">
                    <div className="row">
                        <div className="categories text-center">
                            {this.state.categories.map(category =>
                                <div className="col-sm-4">
                                    <article className="post type-post">
                                        <div className="entry-thumbnail"><img src={category.cover_image} alt="Thumbnail Image"/></div>
                                        <div className="entry-content">
                                            <Link to={"/category/" + category.id} className="btn">{category.title}</Link>
                                        </div>
                                    </article>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}