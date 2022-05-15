const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  passportID:{
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    min: 4,
    max: 15,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {//Usar bcryptjs en caso de que no haga log con google
    //Usar en la rutas para incriptar y desincrptar
    type: String,
    min: 8,
    max: 32,
  },
  gender: {
    type: String,
    required: true,
    enum: "Male" || "Female" ||"Other"
  },
  dateOfBirth: {
    type: Date,
  },
  profilePicture: {
    type: String,
  },
  about: {
    type: String,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  resgitrationCompleted:{
    type: Boolean,
    default: ()=>false,
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
