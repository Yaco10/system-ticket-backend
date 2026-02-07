import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
 
type RegisterInput = {
  email: string;
  password: string;
  name?: string;
  lastname?: string;
  city?: string;
};

type LoginInput = {
  email: string;
  password: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function signToken(userId: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");

  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  const token = jwt.sign(
    { userId: userId },
    secret,
    { expiresIn: "1h" }
  );
  return token
}

export async function register(input: RegisterInput) {

    if (!input || typeof input.email !== "string" || typeof input.password !== "string") {
 
console.log("🟦 INPUT EN SERVICE:", input);
      const err = new Error("Email and password are required");
    (err as any).statusCode = 400;
    throw err;
  }


  const email = normalizeEmail(input.email)
  const password = input.password

    if (password.length < 6) {
    const err = new Error("Password must be at least 6 characters");
    (err as any).statusCode = 400;
    throw err;
  }

  const existingMail = await User.findOne({ email })
  if(existingMail){
    const err = new Error("Email already in use");
    (err as any).statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await User.create({
    email,
    passwordHash,
    name: input.name?.trim(),
    lastname: input.lastname?.trim(),
    city: input.city?.trim(),
  }); 


  const token = signToken(user._id.toString());

  return {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      city: user.city
    },
    token
  };
}

export async function login(input:LoginInput) {
  const email = normalizeEmail(input.email);
  const password = input.password;

   if (!email || !password) {
    const err = new Error("Email and password are required");
    (err as any).statusCode = 400;
    throw err;
  }

    const user = await User.findOne( {email} )
    if(!user){
       const err = new Error("Invalid credentials");
      (err as any).statusCode = 401;
      throw err;
    }

    const comparePassword = await bcrypt.compare(input.password, user.passwordHash)
    
    if (!comparePassword) {
    const err = new Error("Invalid credentials");
    (err as any).statusCode = 401;
    throw err;
  }

  const token = signToken(user._id.toString())

   return {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      city: user.city
    },
    token
  };
}