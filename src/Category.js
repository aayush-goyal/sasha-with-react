import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

export default class Category extends Component {
    
    constructor(props) {
        super(props);
        this.article = {
            author: '',
            category: '',
            cover_image: '',
            id: '',
            post: '',
            time: '',
            title: '',
            views: 0
        };
        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        var db = firebase.firestore();
        var articlesRef = db.collection('posts');
        const articles = [];
        
        articlesRef.where('category', '==', id).orderBy('time', 'desc').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let article = doc.data();
                article.id = doc.id;
                articles.push(article);
            });
            this.setState({
                articles: articles
            });
        });

        document.title = id;
    }
    
    render() {
        return (
            <section className="main-content">
                <div className="padding">
                    <div className="container">
                        <div className="row">
                            <div className="categories text-center">
                                {this.state.articles.map(article =>
                                    <div className="col-sm-4">
                                        <article className="post type-post">
                                            <div className="entry-thumbnail"><img src={article.cover_image} alt="Thumbnail Image"/></div>
                                            <div className="entry-content">
                                                <span className="category"><a href="categories.html">{article.category}</a></span>
                                                <h2 className="entry-title"><a href="standard.html">{article.title}</a></h2>
                                                <p dangerouslySetInnerHTML={{__html: article.post.substring(0, 150)}}></p>
                                                <Link to={"/article/" + article.id} className="btn">Read more</Link>
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