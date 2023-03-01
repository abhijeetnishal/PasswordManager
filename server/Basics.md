Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.


require() is a built-in function to include external modules in your Node.js application


cors(Cross-Origin Resource Sharing) - This will allow the user in the frontend to consume the APIs that you have created without any problem.


Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
To know more visit : https://expressjs.com/en/guide/using-middleware.html

The app.use() function is used to mount(organize and initiate) the specified middleware function(s) at the path which is being specified. 
It is mostly used to set up middleware for your application.
Syntax:
app.use(path, callback)

Parameters:
path: It is the path for which the middleware function is being called. It can be a string representing a path or path pattern or regular expression pattern to match the paths.
callback: It is a middleware function or a series/array of middleware functions.


Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js 
and Deno (alpha).
to read more visit: https://github.com/Automattic/mongoose


Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
Each route can have one or more handler functions, which are executed when the route is matched.
Route definition takes the following structure:
app.METHOD(PATH, HANDLER)
Where:
app is an instance of express.
METHOD is an HTTP request method, in lowercase.
PATH is a path on the server.
HANDLER is the function executed when the route is matched.
eg,
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.


bcrypty: A library that helps you to hash passwords.
To read more visit :https://auth0.com/blog/hashing-in-action-understanding-bcrypt/


Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

An environment variable is a variable whose value is set outside the program, typically through functionality built into the operating system or microservice. An environment variable is made up of a name/value pair, and any number may be created and available for reference at a point in time.


JSON:
For beginning developers, JSON stands for JavaScript Object Notation and is a text-based format for transmitting data across web applications. It stores information in an easy-to-access manner, both for developers and computers. It can be used as a data format by any programming language and is quickly becoming the preferred syntax for APIs, surpassing XML.
Token:
A token is a string of data that represents something else, such as an identity. In the case of authentication, a non-JWT based token is a string of characters that allow the receiver to validate the sender’s identity.

JWT, or JSON Web Token, is an open standard used to share security information between two parties — a client and a server. 
Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.

In short, JWTs are used as a secure way to authenticate users and share information.
Typically, a private key, or secret, is used by the issuer to sign the JWT. The receiver of the JWT will verify the signature to ensure that the token hasn’t been altered after it was signed by the issuer. It is difficult for unauthenticated sources to guess the signing key and attempt to change the claims within the JWT.

jwt.sign(payload, secretOrPrivateKey, [options, callback])
jwt.verify(token, secretOrPublicKey, [options, callback])


for mongoose query: https://masteringjs.io/tutorials/mongoose/find-certain-fields#:~:text=To%20filter%20object%20properties%20in,fields%20you%20wish%20to%20return.

