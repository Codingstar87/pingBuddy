import jwt from "jsonwebtoken" ;

import dotenv from "dotenv" ;
dotenv.config()

const generateToken = (userId, res) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn : "7d" 
    })

    res.cookie("jwt", token , {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly : true ,                       //prevent XSS attacts cross-site scripting attacks
        secure: true,                           // Required for HTTPS
        sameSite : "None" ,                     //CSRF  attacks cross-site request forgery attacks
        secure : process.env.NODE_ENV != "development"

    })

    return token ;

}

export default generateToken ;