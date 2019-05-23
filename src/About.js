import React, { Component } from 'react';

export default class About extends Component {

    componentDidMount() {
        document.title = 'About - sasha-with-react';
    }

    render() {
        return (
            <section className="main-content">
            <div className="padding">
                <div className="container">
                    <div className="about-me">
                        <div className="avatar text-center"><img src="https://portfolio.aayushgoyal.in/images/pp.jpg" alt="Avatar" className="img-circle"/></div>

                        <div className="details">
                            <div className="details-top text-center">
                                <h2 className="section-title">About me</h2>
                            </div>
                            <p>
                            When not working or coding, you can see me reading a novel or something on the internet. I discovered a liking for reading back in 2016, and since then have completed 45 novels with 17 of them by Agatha Christie. Some of my favorites include (not in any specific order):
                            </p>
                            <p>
                                <i class="fa fa-book"></i> <strong>The Kite Runner</strong> by Khalid Hosseini<br/>
                                <i class="fa fa-book"></i> <strong>And Then There Were None</strong> by Agatha Christie<br/>
                                <i class="fa fa-book"></i> <strong>To Kill A Mockingbird</strong> by Harper Lee<br/>
                                <i class="fa fa-book"></i> <strong>A Shot At History: My Obsessive Journey to Olympic Gold</strong> by Abhinav Bindra<br/>
                                <i class="fa fa-book"></i> <strong>Five Little Pigs</strong> by Agatha Christie<br/>
                                <i class="fa fa-book"></i> <strong>The Shiva Trilogy</strong> by Amish Tripathi<br/>
                                <i class="fa fa-book"></i> <strong>Master of the Game</strong> by Sidney Sheldon<br/>
                            </p>
                            <p>
                            I am also an active reader, writer and member of communities like Quora, Medium, and etc. I also used to write a blog but haven't been writing lately. I am planning to start writing again and this time I am planning to write a technical blog also. I am working on these projects and quite excited about my new blog.
                            </p>
                            <p>
                            I can play flute. I am at a beginner level right now and working my way to being a professional. The journey to learn a music instrument is so much amusing, captivating, and thrilling. I also know a little about basic music theory and learning music on my way to master flute. I plan to learn violin, piano and drums later.
                            </p>
                            <p>
                            Apart from that I like sports. I can play Tennis, Volleyball, Table Tennis, Badminton, Squash, Pool, and Cricket to name a few. I have played Volleyball at the district level. I am an avid sports lover and follower with tennis being my favorite sport. One of the things I am working right now is to produce a backhand like Roger Federer.
                            </p>
                            <p>
                            I like to travel a lot. Albeit I have not covered even a considerable amount of my own country, I would like to travel and almost every place in the world. One country I am surely going to visit is Switzerland and the same goes with the city Paris.
                            </p>
                        </div>
                        
                        <div className="social text-center">
                            <a href="https://www.instagram.com/aayushgoyal_" target="_blank"><i className="fa fa-instagram"></i></a>
                            <a href="https://www.twitter.com/aayushgoyal_" target="_blank"><i className="fa fa-twitter"></i></a>
                            <a href="https://www.facebook.com/aayushgoyal.mps" target="_blank"><i className="fa fa-facebook"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }    
}