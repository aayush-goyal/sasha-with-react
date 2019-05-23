import React, { Component } from 'react';

export default class Comments extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const comments = this.props.comments.map(comment => 
            <li className="comment parent media" key={comment.id}>
                <div className="author-avatar media-left pull-left">
                    <img className="img-circle" src="http://demos-jeweltheme.ipunu91y.maxcdn-edge.com/sasha/images/single/c1.jpg" alt="Avatar"/>
                </div>
                <div className="comment-details media-body">
                    <h3 className="name"><a href="#">{comment.author}</a></h3>
                    <p>
                        {comment.comment}
                    </p>
                    <a href="#" className="btn reply">Reply</a>
                    <time datetime="PT04H0M">{comment.time}</time>
                </div>
            </li>
        );
        return (
            <ul className="comment-list">
                {comments}
            </ul>
        );
    }

}