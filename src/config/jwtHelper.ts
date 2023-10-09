import { RequestHandler } from "express";

const jwt = require("jsonwebtoken");

export const verifyJwtToken:RequestHandler = (req, res, next) => {
    let token:String | null = null;
    if (req.headers.authorization) token = req.headers.authorization.split(" ")[1];
    if (!token) {
      console.log("No JWT token provided for req:" + req.method + ":" + req.url);
      return res.status(403).send({ auth: false, message: "No token provided." });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err:any, decoded: any) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            console.log(`Token Expired`);
            return res.status(500).json({ auth: false, message: "Token Expired" });
          } else {
            console.log(`Verification Failed for JWT token:${token}`);
            console.log("Req:" + req.method + ":" + req.url);
            return res.status(500).send({ auth: false, message: "Token authentication failed." });
          }
        }else {
            req.body.jwtPayload = decoded;
            next();
        }
    });
    }
  };