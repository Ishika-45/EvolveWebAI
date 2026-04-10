const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      default: null,
    },
    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);

// THIS IS THE CORRECT VERSION - NO 'next' PARAMETER
userSchema.pre("save", async function() {
  // Only hash password if it exists and was modified
  if (!this.password || !this.isModified("password")) {
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);