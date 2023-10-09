import { RequestHandler, response } from 'express';
import User, { UserMap } from '../models/user';
import database from '../config/db';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const createUser:RequestHandler = async(req, res, next) => {
    try{
        let newUser = req.body as User
        if(typeof newUser.username != undefined && typeof newUser.password != undefined){
            UserMap(database);
            // Adding salt makes the hashed key unique everytime with same input
            let salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            const result = await User.create(newUser as any);
            newUser = result.dataValues as User;
            return res.status(201).json({ message: 'User created successfully',id: newUser.id });
        }else return res.status(400).json({error: "Invalid Data Received"});
    }catch(err){
        console.log("Unable to create new User", err);
        return res.status(400).json({error: "Unable to create new User"});
    }
};

export const userLogin:RequestHandler = async(req, res, next) => {
    try{
        let newUser = req.body as User
        if(typeof newUser.username != undefined && typeof newUser.password != undefined){
            UserMap(database);
            const result = await User.findOne({
                where: { username: newUser.username }
            });
            if(result == null) return res.status(404).json({message: "User Not found"});
            if(await verifyPassword(newUser.password, result.password)){ //True if password matching Successfull
                let payload = {
                    id: result.id,
                    userName: result.username,
                }; // payload for jwt
                const token = await generateJwt(payload); //Generaing the JWT Token
                return res.status(201).json({ message: 'User LoggedIn successfully',token: token });
            }else return res.status(403).json({message:"Invalid Password!"}); // password doesn't match
        }else return res.status(400).json({error: "Invalid Data Received"}); //Invalid Data is received in body
    }catch(err){
        console.log("Unable to create new User", err);
        return res.status(400).json({error: "Unable to create new User"});
    }
};

function generateJwt(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
  }
async function verifyPassword(password:String, hashedPassword:String) {
    return bcrypt.compareSync(password, hashedPassword);
  }