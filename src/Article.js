import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import Comments from './Comments';
import { formatDate } from './Home';

export default class Article extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            comments: [],
            cover_image: '',
            db: firebase.firestore(),
            next_post: '',
            post: '',
            previous_post: '',
            title: '',
            time: ''
        };
    }

    formatDate = formatDate;

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== prevState.id) {
            this.setState({
                id: this.props.match.params.id
            });
            this.loadArticle(this.state.id);
        }
        document.title = this.state.title;
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        this.setState({
            id: id
        });
    }

    componentDidMount() {
        this.loadArticle(this.state.id);

        // Load top articles.
        const topArticles = [];
        var topArticlesRef = this.state.db.collection('posts');
        topArticlesRef.orderBy('views', 'desc').limit(6).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let article = doc.data();
                article.id = doc.id;
                article.time = this.formatDate(article.time);
                topArticles.push(article);
            });
            this.setState({
                topArticles: topArticles
            });
        });
    }

    loadArticle(id) {
        var articleRef = this.state.db.doc('posts/'+id);
        articleRef.get().then((doc) => {
            if(doc.exists) {
                let article = doc.data();
                this.setState({
                    author: article.author,
                    category: article.category,
                    cover_image: article.cover_image,
                    next_post: article.next_post,
                    post: article.post,
                    previous_post: article.previous_post,
                    title: article.title,
                    time: this.formatDate(article.time),
                    views: article.views + 1
                });
                articleRef.update({
                    views: this.state.views
                });
                this.loadPreviousPost(this.state.previous_post);
                this.loadNextPost(this.state.next_post);
                this.loadComments(id);
            } else {
                console.log('No document.');
            }
        });
        this.setState({
            name: this.props.name
        });
    }

    loadPreviousPost(id) {
        var previous_post = {};
        if (id) {
            var topArticlesRef = this.state.db.collection('posts').doc(id);
            topArticlesRef.get().then(doc => {
                if (doc.exists) {
                    previous_post = doc.data();
                    previous_post.id = id;
                    previous_post.time = this.formatDate(previous_post.time);
                    this.setState({
                        previous_post: previous_post
                    });
                }
            });
        }
    }

    loadNextPost(id) {
        var next_post = {};
        if (id) {
            var topArticlesRef = this.state.db.collection('posts').doc(id);
            topArticlesRef.get().then(doc => {
                if (doc.exists) {
                    next_post = doc.data();
                    next_post.id = id;
                    next_post.time = this.formatDate(next_post.time);
                    this.setState({
                        next_post: next_post
                    });
                }
            });
        }
    }

    loadComments(id) {
        const comments = [];
        var commentsRef = firebase.firestore().collection('posts/'+id+'/comments');
        commentsRef.get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                comments.push(doc.data());
            });
            this.setState({
                comments: comments
            });
        });
    }

    render() {
        let commentTitle;
        if (this.state.comments.length == 0) {
            commentTitle = <h3 className="comment-title">No comments</h3>;
        } else {
            commentTitle = <h3 className="comment-title">{this.state.comments.length} comments</h3>;
        }

        let previousPost;
        let nextPost;

        if (this.state.previous_post) {
            previousPost = <PreviousPost post={this.state.previous_post} />;
        }

        if (this.state.next_post) {
            nextPost = <NextPost post={this.state.next_post} />;
        }
        
        return (
            <section className="main-content">
            <div className="padding">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="single-post">
                                <div className="type-standard">
                                    <article className="post type-post">
                                        <div className="top-content text-center">
                                            <span className="category"><a href="categories.html">{this.state.category}</a></span>
                                            <h2 className="entry-title"><a href="standard.html">{this.state.title}</a></h2>
                                            <span className="time"><time>{this.state.time}</time></span>
                                        </div>

                                        <div className="entry-thumbnail"><img id="cover-image" src={this.state.cover_image} alt="Thumbnail Image"/></div>

                                        <div className="entry-content">
                                            <div dangerouslySetInnerHTML={{__html: this.state.post}}></div>
                                        </div>
                                    </article>
                                </div>

                                <div className="author-bio media">
                                    <div className="author-avatar media-left pull-left"><img className="img-circle" src="https://portfolio.aayushgoyal.in/images/pp.jpg" alt="Avatar"/></div>
                                    <div className="author-details media-body">
                                        <h3 className="name"><a href="#">{this.state.author}</a></h3>
                                        <p>व्हाई सो सीरियस? 🙄</p>
                                        <div className="social">
                                            <a href="https://www.instagram.com/aayushgoyal_" target="_blank"><i className="fa fa-instagram"></i></a>
                                            <a href="https://www.twitter.com/aayushgoyal_" target="_blank"><i className="fa fa-twitter"></i></a>
                                            <a href="https://facebook.com/aayushgoyal.mps" target="_blank"><i className="fa fa-facebook"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <nav className="post-navigation" role="navigation">
                                    {previousPost}
                                    {nextPost}
                                </nav>

                                <div className="widget widget_related_posts text-center">
                                    <h3 className="widget-title">YOU MAY ALSO LIKE</h3>
                                    <TopPostsBottom topPosts={this.state.topArticles} />
                                </div>

                                {/* Comment Section */}
                                <div className="comments text-center">
                                    {commentTitle}
                                    <Comments comments={this.state.comments} />
                                </div>

                                <div className="respond text-center">
                                    <h3 className="respond-title">Leave a reply</h3>
                                    
                                    <form action="#" method="post" className="comment-form">

                                        <span className="comment-form-control-wrap your-name">
                                            <input type="text" name="name" id="name" className="comment-form-control" placeholder="Name" required/>
                                        </span>
                                        <span className="comment-form-control-wrap email">
                                            <input type="email" name="email" id="email" className="comment-form-control" placeholder="Email" required/>
                                        </span>
                                        <span className="comment-form-control-wrap url">
                                            <input type="url" name="url" id="url" className="comment-form-control" placeholder="Website*"/>
                                        </span>
                                        <span className="comment-form-control-wrap message">
                                            <textarea name="message" id="message" className="comment-form-control" placeholder="Your Message" required></textarea>
                                        </span>
                                        <span className="comment-form-control-wrap submit">
                                            <input type="submit" name="submit" id="submit" className="comment-form-control" value="Submit"/>
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <aside className="sidebar text-center">
                                <div className="widget widget_about_author">
                                    <h3 className="widget-title">About me</h3>
                                    <div className="widget-details">
                                        <div className="author-avatar"><img src="https://portfolio.aayushgoyal.in/images/pp.jpg" alt="Avatar" className="img-circle"/></div>
                                        <p>व्हाई सो सीरियस? 🙄</p>
                                        <div className="author-social">
                                            <a href="#"><i className="fa fa-instagram"></i></a>
                                            <a href="#"><i className="fa fa-twitter"></i></a>
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="widget widget_recent_posts">
                                    <h3 className="widget-title">Top Posts</h3>
                                    <TopPostsSideBar topPosts={this.state.topArticles} />
                                </div>

                                <div className="widget widget_ad">
                                    <div className="widget-details">
                                        <a href="#" className="ad-banner"><img src="" alt="Ad Banner"/></a>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}

class PreviousPost extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.post) {
            return (
                <div className="nav-links prev pull-left">
                    <span className="meta-nav"><Link to={'/article/' + this.props.post.id}><i className="fa fa-angle-left"></i></Link></span>

                    <article className="post type-post media">
                        <div className="entry-thumbnail media-left pull-left">
                            <a href="image.html"><img src={this.props.post.cover_image} alt="Thumb Image"/></a>
                        </div>
                        <div className="entry-content media-body"> 
                            <h3 className="entry-title"><Link to={"/article/" + this.props.post.id}>{this.props.post.title}</Link></h3>
                            <span className="time"><time>{this.props.post.time}</time></span>
                        </div>
                    </article>
                </div>
            )
        } else {
            return (
                <div className="nav-links prev pull-left"></div>
            );
        }
    }
}

class NextPost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.post) {
            return (
                <div className="nav-links next pull-right">
                    <span className="meta-nav"><Link to={'/article/' + this.props.post.id}><i className="fa fa-angle-right"></i></Link></span>
                    <article className="post type-post media text-right">
                        <div className="entry-thumbnail media-left pull-right">
                            <a href="gallery.html"><img src={this.props.post.cover_image} alt="Thumb Image"/></a>
                        </div>
                        <div className="entry-content media-body">
                            <h3 className="entry-title"><Link to={"/article/" + this.props.post.id}>{this.props.post.title}</Link></h3>
                            <span className="time"><time>{this.props.post.time}</time></span>
                        </div>
                    </article>        
                </div>
            )
        } else {
            return (
                <div className="nav-links next pull-right"></div>
            )
        }
    }
}

class TopPostsBottom extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let articles = '';
        if (this.props.topPosts) {
            articles = this.props.topPosts.slice(0, 3).map(topPost => 
                <div className="col-sm-4" key={topPost.id}>
                    <article className="post type-post">
                        <div className="entry-thumbnail"><img src={topPost.cover_image} alt="Thumbnail Image"/></div>
                        <div className="entry-content">
                            <h3 className="entry-title"><Link to={"/article/" + topPost.id}>{topPost.title}</Link></h3>
                            <span className="time"><time>{topPost.time}</time></span>
                        </div>
                    </article>
                </div>
            );     
        }
        return (
            <div className="widget-details">
                {articles}
            </div>
        );
    }
}

class TopPostsSideBar extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        let articles = '';
        if (this.props.topPosts) {
            articles = this.props.topPosts.map(topPost =>
                <article className="post type-post media" key={topPost.id}>
                    <div className="entry-thumbnail media-left pull-left"><img src={topPost.cover_image} alt="Thumb Image"/></div>
                    <div className="entry-content media-body">
                        <h3 className="entry-title"><Link to={"/article/" + topPost.id}>{topPost.title}</Link></h3>
                        <span className="time"><time>{topPost.time}</time></span>
                    </div>
                </article>
            );
        }
        return (
            <div className="widget-details">
                {articles}
            </div>
        );
    }
}
