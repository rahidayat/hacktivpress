# hacktivpress

Just a simple blog app

## Build Setup

``` bash
# install dependencies in server
cd server
npm install

# install dependencies in client
cd client
npm install

# serve with hot reload at localhost:8080
cd client
npm run dev

```
## REST API
List of basic routes:

Route | HTTP | Description
----- | ---- | -----------
api/signup | POST | Sign up with new user info
api/signin | POST | Sign in while get an access token based on credentials
api/articles | GET | Get All the articles
api/article/:id | GET | Get a single article info
api/articles/:cat | GET | Get articles based on category
api/articles/author/:id | GET | Get articles based on author
api/article | POST | Create an article (auth user only)
api/article/:id | DELETE | Delete an article (auth user only)
api/article/:id | PUT | Update an article (auth user only)
