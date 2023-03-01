//Require mongoose in the userModel file:
const mongoose = require("mongoose");

//Create a constant (UserSchema) and assign it the mongoose schema:
const passwordSchema = new mongoose.Schema({
    //Specify how the fields should work by adding some mongoose option:
    websiteName: {
        type: String,
        require: [true, "Please provide website name"],
        unique: false
    },

    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },

    iv: {
        type: String,
        required: false,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
},{timestamps: true})

//mongodb generates userId to use further operation Crud of user with that id.

//Finally, export UserSchema with the following code:
module.exports = mongoose.model.passwords || mongoose.model("password", passwordSchema);

//The code above is saying: "create a user table or collection if there is no table with that name already".
//You have completed the model for the user. The user collection is now ready to receive the data that is to be passed to it.
