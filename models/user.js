const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },

  {
    collection: "User",
    timestamps: true, // inserts createdAt and updatedAt
  }
);

userSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.name,
      role: this.role
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);


function validateUser(user) {
  schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(19).required(),
    role: Joi.string().required(),
  });
  return schema.validate({ name: user.name, email: user.email, role: user.role, password: user.password });
}


function ValidateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}


module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.ValidateObjectId = ValidateObjectId;
