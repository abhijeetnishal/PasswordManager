//you'll need to make a function to enable you to protect a particular endpoint from unauthenticated users.
const jwt = require('jsonwebtoken');

//Create and export an asynchronous function in which the authorisation code will live:
async function protectEndpoints(request, response, next){
    //use a try...catch... block to check if a user is logged in
    //In the try{} block, get the authentication token from the authorization header:
    try {
        //get the token from the authorization header
        const token = await request.headers.authorization.split(" ")[1];
        
        //Check if the token that was generated matches the token string (RANDOM-TOKEN) entered initially:
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
        
        //retrieve the user details of the logged in user
        const user = await decodedToken;

        //pass the the user down to the endpoints here
        request.user = user;
        
        // pass down functionality to the endpoint
        next();
    }
    catch (error) {
        response.status(401).json({
            error: new Error("Invalid request!"),
          });
          console.log(error);
    }
}

module.exports = protectEndpoints;
