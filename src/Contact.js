import React, { Component } from 'react';

export default class Contact extends Component {

    componentDidMount() {
        document.title = 'Contact Us';
    }

    render() {
        return (
            <section className="main-content">
                <div className="padding">
                    <div className="container">
                        <div className="contact">
                            <div className="contact-details">
                                <div className="details-top text-center">
                                    <h2 className="section-title">Contact Us</h2>
                                </div>
                                <p>
                                    Cras eleifend mi eget mattis tempus. Quisque eleifend finibus fringilla. Maurs non nunc non justo pretium rhoncus. In ante mauri facilisis semper. Morbi tortor leo, ultrices quis bibendum vel, gravidat amet nisl. Quisque quis enim rhoncus, mollis libero voat lacus. Nam eget nisi ut lacus faucibus maximus. Morbi porttitor ligula risus, quat velit dictum tique, pharetra felis eu, gravidaante.
                                </p>
                                <p>
                                    Metosit amet pellentesque lgula dignissim ac. Praesent a diam dignissim, blandit lacus molestie mauris. Integer semper lobortis dapibus. Lorem risus porttitor eros, sed tincidunt urna eros sed lacus. Aliquam finibus commodo quam nec suscipit. 
                                </p>
                                
                                <form action="email.php" method="post" className="wpcf7-form">
                                    <span className="wpcf7-form-control-wrap your-name">
                                        <input type="text" name="name" id="name" className="wpcf7-form-control" placeholder="Name" required/>
                                    </span>
                                    <span className="wpcf7-form-control-wrap email">
                                        <input type="email" name="email" id="email" className="wpcf7-form-control" placeholder="Email" required/>
                                    </span>
                                    <span className="wpcf7-form-control-wrap url">
                                        <input type="url" name="url" id="url" className="wpcf7-form-control" placeholder="Website*"/>
                                    </span>
                                    <span className="wpcf7-form-control-wrap message">
                                        <textarea name="message" id="message" className="wpcf7-form-control" placeholder="Your Message" required/>
                                    </span>
                                    <span className="wpcf7-form-control-wrap submit">
                                        <input type="submit" name="submit" id="submit" className="wpcf7-form-control" value="Submit"/>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}