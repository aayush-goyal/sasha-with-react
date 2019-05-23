A simple responsive web blog using React as the front-end and Firebase as the back-end.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The blog theme is based on Sasha blog theme found [here](https://colorlib.com/wp/template/sasha).

You can see the live demo of the app [here](https://blog.aayushgoyal.in).

# Development

### Development Setup
---
- Install latest version of npm on your local. You can find the guide [here](https://nodejs.org/en/).
- Clone the project from GitHub onto your local.
- Open terminal at the root folder level for the cloned project.
- Run `npm install`. It will take a while to install all the dependencies for your project.
- Follow Firebase Setup below.
- Run `npm start`.
> Note: The server will start the development version of the app on the localhost and not the production ready version of the app. You can learn more about it [here](https://github.com/facebook/create-react-app).

### Firebase Setup
---
- Create a new Firebase project in your Firebase console.
- Add a web app to it and follow the instructions on the Firebase console.
- In the step, 'Add Firebase SDK' copy the entire script.
- Create a file inside **src** folder and name it **config.js**.
- Add the following code to it. Replace the value for each key according to the script you copied earlier.
        
        var firebaseConfigData = {
            apiKey: "YOUR FIREBASE APP API KEY",
            authDomain: "YOUR FIREBASE APP AUTH DOMAIN",
            databaseURL: "YOUR FIREBASE APP DATABASE URL",
            projectId: "YOUR FIREBASE APP PROJECT ID",
            storageBucket: "YOUR FIREBASE APP STORAGE BUCKET",
            messagingSenderId: "YOUR FIREBASE APP MESSAGING SENDER ID",
            appId: "YOUR FIREBASE APP ID"
        };

        module.exports = firebaseConfigData;
    
- Set-up **Cloud Firestore** for your app in the Firebase console.
- Create two collections in your Cloud Firestore with the names **categories** and **posts** and the following schema:
    - **category** (enter document ID in a valid readable URL format)
        - **cover_image (string)**: Image URL for the category. Add image to the Firebase Storage and copy the download URL link here.
        - **title (string)**: Title for the category
    - **post** (enter document ID in a valid readable URL format)
        - **author (string)**: Name of the author
        - **category (string)**: Category of the article
        - **cover_image (string)**: Image URL for the category. Add image to the Firebase Storage and copy the download URL link here.
        - **previous_post (string)**: Document ID of the article just previous to this article when arranged in descending chronological order.
        - **post (string)**: The body of the article in HTML format.
        - **next-post (string)**: Document ID of the article just next to this article when arranged in descending chronological order.
        - t**ags (array)**: [tag1, tag2, tag3, tag4, tag5]
        - **time (timestamp)**: Time
        - **title (string)**: Title of the article
        - **views (number)**: Total number of views generated for a particular article. Initial value must be 0.

- Sample documents:
    - **travel**
        - **cover_image**: https://firebasestorage.googleapis.com/v0/b/sasha-with-react.appspot.com/o/1920X1080.jpg?alt=media&token=848be014-8e5f-4837-8734-eaab9fd931c2
        - **title**: article
    - **into-the-wild**
        - **author**: Aayush Goyal
        - **category**: travel
        - **cover_image**: https://firebasestorage.googleapis.com/v0/b/sasha-with-react.appspot.com/o/1920X1080.jpg?alt=media&token=848be014-8e5f-4837-8734-eaab9fd931c2
        - **previous_post**: the-adventure-in-switzerland
        - **post**:

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi chitecto beatae vitae dicta sunt explicabo.</p><p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p><p>Quisque nunc erat, pharetra ut cursus quis, tristique eu enim. Maecenas elementum dolor vel erat vestibulum malesuada. Pellentesque sed magna porta, finibus elit et, mollis lacus. Proin elementum metus nec tincidunt iaculis. Donec ut vulputate sem, venenatis ultricies felis. Praesent convallis mauris leo, a dignissim lorem bibendum eget. Duis sodales urna sed odio maximus egestas. Nulla molestie consequat mattis.</p><p>Vestibulum non tristique metus. Morbi tempus nibh sed quam fringilla fringilla a a neque. In aliquet ex vitae eros convallis dictum. Suspendisse vulputate mauris id tincidunt rhoncus. Vestibulum sit amet nibh nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
        - **next-post**: incredible-india 
        - **tags**: [food, adventure, vacation]
        - **time**: 11/23/1996 7:30:00 PM GMT+5:30
        - **title**: Into The Wild
        - **views**: 0

- Change security rules for the database to the following:

        service cloud.firestore {
            match /databases/{database}/documents {
                match /posts/{post} {
                    function notAddingAnyOtherFieldIntoDocument() {
                        return request.resource.data.size() == resource.data.size();
                    }
                    
                    function onlyUpdatingViewField() {
                        return (request.resource.data.author == resource.data.author)
                                && (request.resource.data.category == resource.data.category)
                            && (request.resource.data.cover_image == resource.data.cover_image)
                            && (request.resource.data.next_post == resource.data.next_post)
                            && (request.resource.data.post == resource.data.post)
                            && (request.resource.data.previous_post == resource.data.previous_post)
                            && (request.resource.data.tags == resource.data.tags)
                            && (request.resource.data.time == resource.data.time)
                            && (request.resource.data.title == resource.data.title)
                            && (request.resource.data.views == resource.data.views + 1);
                    }
                    
                    allow read;
                    allow create, delete: if request.auth.id != null;
                    allow update: if notAddingAnyOtherFieldIntoDocument() && onlyUpdatingViewField();
            
                    match /comments/{comment} {
                        allow read, create;
                        allow update, delete: if request.auth.id != null;
                    }
                }
            
                match /categories/{category} {
                    allow read;
                    allow write: if request.auth.id != null;
                }
            }
        }

# Changelog

### [1.0.0] - 2019-05-24
---
#### Added
- Main page for the app that uses [React Router v4](https://reacttraining.com/react-router/) to render different routing cases.
- Home page which has following features:
    1. A carousel that transitions between two most recent posts.
    2. A list showing next eight recent posts.
    3. "About Me" section in the right side-bar for a quick link to the author profile.
    4. "Top Posts" that shows user top six posts based on the number of views each post garnered.
- Articles page that displays all the articles in descending chronological order.
- Categories page that displays all the categoies.
- Category page that displays all the articles in descending chronological order within the selected category.
- Article page with the following features:
    1. An image and content of the post.
    2. Author info at the end of the content.
    3. "Previous Post" and "Next Post"
    4. "Top Posts" section at the bottom that shows user top three posts based on the number of views each post garnered.
    5. "About Me" section in the right side-bar for a quick link to the author profile.
    6. "Top Posts" section in the right side-bar that shows user top six posts based on the number of views each post garnered.
- About page that displays info about the author of the blog.
- Contact page that lets users to send their queries, feedback, comments, and etc.

#### Changed
- Default font changed to [Montserrat](https://fonts.google.com/specimen/Montserrat).

#### Removed
- Removed boilerplate code and resources.

### [0.1.0] - 2019-05-08
---
#### Added
- First commit.

## LICENSE

Copyright 2019 Aayush Goyal

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
