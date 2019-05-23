import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

export default class Articles extends Component {

    constructor(props) {
        super(props);
        this.article = {
            author: '',
            category: '',
            cover_image: '',
            id: '',
            next_post: '',
            post: '',
            previous_post: '',
            time: '',
            title: '',
            views: 0
        }
        this.state = {
            recentArticles: []
        };
    }

    componentDidMount() {
        document.title = 'All Posts';
        
        var db = firebase.firestore();
        var articlesRef = db.collection('posts');
        const recentArticles = [];

        articlesRef.orderBy('time', 'desc').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let article = doc.data();
                article.id = doc.id;
                recentArticles.push(article);
            });
            this.setState({
                recentArticles: recentArticles
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
                                {this.state.recentArticles.map(recentArticle =>
                                    <div className="col-sm-4" key={recentArticle.id}>
                                        <article className="post type-post">
                                            <div className="entry-thumbnail"><img src={recentArticle.cover_image} alt="Thumbnail Image"/></div>
                                            <div className="entry-content">
                                                <span className="category"><a href="categories.html">{recentArticle.category}</a></span>
                                                <h2 className="entry-title"><a href="standard.html">{recentArticle.title}</a></h2>
                                                <p dangerouslySetInnerHTML={{__html: recentArticle.post.substring(0, 150)}}></p>
                                                <Link to={"/article/" + recentArticle.id} className="btn">Read more</Link>
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