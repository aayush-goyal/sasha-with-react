import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

export default class Home extends Component {

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
        }
        this.state = {
            recentArticles: [this.article, this.article, this.article, this.article, this.article, this.article, this.article, this.article],
            topArticles: [this.article, this.article, this.article, this.article, this.article, this.article]
        };
    }

    formatDate = formatDate;

    componentDidMount() {
        document.title = 'Blog - sasha-with-react';

        var db = firebase.firestore();
        var articlesRef = db.collection('posts');
        const recentArticles = [];
        const topArticles = [];

        // Load recent articles.
        articlesRef.orderBy('time', 'desc').limit(10).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let article = doc.data();
                article.id = doc.id;
                article.time = this.formatDate(article.time); recentArticles.push(article);
            });
            this.setState({
                recentArticles: recentArticles
            });
        });

        // Load top articles.
        articlesRef.orderBy('views', 'desc').limit(6).get().then((querySnapshot) => {
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
    
    render() {
        return (
            <div>
                <Banner posts={this.state.recentArticles} />
                <section className="main-content">
                    <div className="padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="default-posts">
                                        {this.state.recentArticles.slice(2).map((article, index) => {
                                            if (index == 0 || index == 5) {
                                                return (
                                                    <article className="post type-post col-sm-6 full-width">
                                                        <div className="entry-thumbnail"><img src={article.cover_image} alt="Thumbnail Image" /></div>
                                                        <div className="entry-content">
                                                            <span className="category"><a href="categories.html">{article.category}</a></span>
                                                            <h2 className="entry-title"><a href="standard.html">{article.title}</a></h2>
                                                            <span className="time"><time>{article.time}</time></span>
                                                            <p dangerouslySetInnerHTML={{ __html: article.post.substring(0, 151) }}></p>
                                                            <Link to={"/article/" + article.id} className="btn">Read more</Link>
                                                        </div>
                                                    </article>
                                                );
                                            } else {
                                                return (
                                                    <article className="post type-post col-sm-6">
                                                        <div className="entry-thumbnail"><img src={article.cover_image} alt="Thumbnail Image" /></div>
                                                        <div className="entry-content">
                                                            <span className="category"><a href="categories.html">{article.category}</a></span>
                                                            <h2 className="entry-title"><a href="standard.html">{article.title}</a></h2>
                                                            <span className="time"><time>{article.time}</time></span>
                                                            <p dangerouslySetInnerHTML={{ __html: article.post.substring(0, 151) }}></p>
                                                            <Link to={"/article/" + article.id} className="btn">Read more</Link>
                                                        </div>
                                                    </article>
                                                );
                                            }

                                        })}
                                    </div>

                                    <nav className="pagination pagination-01">
                                        <a href="#" className="previous-page hidden pull-left"><i className="fa fa-angle-double-left"></i> Previous Posts </a>
                                        <Link to="/articles" className="next-page pull-right">Older Posts <i className="fa fa-angle-double-right"></i></Link>
                                    </nav>
                                </div>

                                <div className="col-sm-4">
                                    <aside className="sidebar text-center">
                                        <div className="widget widget_about_author">
                                            <h3 className="widget-title">About me</h3>
                                            <div className="widget-details">
                                                <div className="author-avatar"><img src="https://portfolio.aayushgoyal.in/images/pp.jpg" alt="Avatar" className="img-circle" /></div>
                                                <p>व्हाई सो सीरियस? 🙄</p>
                                                <div className="author-social">
                                                    <a href="https://instagram.com/aayushgoyal_/" target="blank"><i className="fa fa-instagram"></i></a>
                                                    <a href="https://twitter.com/aayushgoyal_" target="blank"><i className="fa fa-twitter"></i></a>
                                                    <a href="https://facebook.com/aayushgoyal.mps" target="blank"><i className="fa fa-facebook"></i></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="widget widget_recent_posts">
                                            <h3 className="widget-title">Top Posts</h3>
                                            <TopPosts topPosts={this.state.topArticles} />
                                        </div>

                                        <div className="widget widget_ad">
                                            <div className="widget-details">
                                                <a href="#" className="ad-banner"><img src="" alt="Ad Banner" /></a>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banner1: {
                bannerClassName: 'item background-bg active',
                indicatorClassName: 'active'
            },
            banner2: {
                bannerClassName: 'item background-bg',
                indicatorClassName: ''
            }
        };
        this.toggleBanner = this.toggleBanner.bind(this);
    }

    componentDidMount() {
        setInterval(this.toggleBanner, 3000)
    }

    toggleBanner() {
        if (this.state.banner1.indicatorClassName == 'active') {
            this.setState({
                banner1: {
                    bannerClassName: 'item background-bg',
                    indicatorClassName: ''
                },
                banner2: {
                    bannerClassName: 'item background-bg active',
                    indicatorClassName: 'active'
                }
            });
        } else {
            this.setState({
                banner1: {
                    bannerClassName: 'item background-bg active',
                    indicatorClassName: 'active'
                },
                banner2: {
                    bannerClassName: 'item background-bg',
                    indicatorClassName: ''
                }
            });
        }
    }

    render() {
        if (this.props.posts) {
            var bannerCover1 = this.props.posts[0].cover_image;
            var bannerCover2 = this.props.posts[1].cover_image;
            return (
                <section className="banner-slider banner-slider-01 carousel slide">
                    <ol className="carousel-indicators">
                        <li data-target=".banner-slider-01" data-slide-to="0" className={this.state.banner1.indicatorClassName} onClick={this.toggleBanner}></li>
                        <li data-target=".banner-slider-01" data-slide-to="1" className={this.state.banner2.indicatorClassName} onClick={this.toggleBanner}></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className={this.state.banner1.bannerClassName} data-image-src={bannerCover1} style={{ backgroundImage: 'url(' + bannerCover1 + ')' }}>
                            <article className="post type-post">
                                <div className="entry-content">
                                    <div className="overlay">
                                        <div className="inner-content">
                                            <span className="category"><a href="categories.html">{this.props.posts[0].category}</a></span>
                                            <h2 className="entry-title"><a href="standard.html">{this.props.posts[0].title}</a></h2>
                                            <Link to={"/article/" + this.props.posts[0].id} className="btn read-more">Read more</Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <div className={this.state.banner2.bannerClassName} data-image-src={bannerCover2} style={{ backgroundImage: 'url(' + bannerCover2 + ')' }}>
                            <article className="post type-post">
                                <div className="entry-content">
                                    <div className="overlay">
                                        <div className="inner-content">
                                            <span className="category"><a href="categories.html">{this.props.posts[1].category}</a></span>
                                            <h2 className="entry-title"><a href="standard.html">{this.props.posts[1].title}</a></h2>
                                            <Link to={"/article/" + this.props.posts[1].id} className="btn read-more">Read more</Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            );
        }
    }
}

class TopPosts extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const topArticles = this.props.topPosts.map(topPost =>
            <article className="post type-post media">
                <div className="entry-thumbnail media-left pull-left"><img src={topPost.cover_image} alt="Thumb Image" /></div>
                <div className="entry-content media-body">
                    <h3 className="entry-title"><Link to={"/article/" + topPost.id}>{topPost.title}</Link></h3>
                    <span className="time"><time>{topPost.time}</time></span>
                </div>
            </article>
        );
        return (
            <div className="widget-details">
                {topArticles}
            </div>
        );
    }
}

export const formatDate = (time) => {
    var year = time.toDate().getFullYear();
    var month = time.toDate().getMonth();
    var date = time.toDate().getDate();

    var time = '';

    switch (month) {
        case 0:
            time = 'January';
            break;
        case 1:
            time = 'February';
            break;
        case 2:
            time = 'March';
            break;
        case 3:
            time = 'April';
            break;
        case 4:
            time = 'May';
            break;
        case 5:
            time = 'June';
            break;
        case 6:
            time = 'July';
            break;
        case 7:
            time = 'August';
            break;
        case 8:
            time = 'September';
            break;
        case 9:
            time = 'October';
            break;
        case 10:
            time = 'November';
            break;
        case 11:
            time = 'December';
            break;
    }

    time = time + ' ' + date.toString() + ', ';

    time = time + year;
    return time;
}