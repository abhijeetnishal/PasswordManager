//Require mongoose in the userModel file:
const mongoose = require("mongoose");

//Create a constant (UserSchema) and assign it the mongoose schema:
const UserSchema = new mongoose.Schema({
    //Specify how the fields should work by adding some mongoose option:
    username:{
        type: String,
        require: true,
        unique: false
    },

    email: {
        type: String,
        required: true, 
        unique: true,
    },

    password: {
        type: String,
        required: true, 
        unique: false,
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
}, {timestamps: true})

//Finally, export UserSchema with the following code:
module.exports = mongoose.model.User || mongoose.model("User", UserSchema);

//The code above is saying: "create a user table or collection if there is no table with that name already".
//You have completed the model for the user. The user collection is now ready to receive the data that is to be passed to it.
