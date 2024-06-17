import { User } from "../database/userDatabase.js";
import express from "express";
import bcrypt from "bcrypt";
import Seller from "../database/Seller.js";
import Token from "../database/tookenDatabase.js"
import crypto from 'crypto';
import sendMail from "../utilis/sendEmail.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const route = express.Router();

route.post("/signup", async (req, res) => {
    const { name, email, phone, gender, password,img} = req.body;
    let exists = await User.findOne({ email: email });
    if (exists) {
        res.send("exists");
    }
    else {
        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name, email, phone, gender, password:hashPassword,img
        });
        const token = await Token.create({
            id: user._id,
            token: crypto.randomBytes(32).toString("hex")
        });
        const url = `${process.env.BACKEND_URL}/v1/user/${user._id}/verify/${token.token}`;
        await sendMail(user.email, "Verify Email", url);
        console.log("mail")
        res.send("sendMail");
    }
});
route.put("/edit/profile/:id", async (req, res) => {
    const token = req.params.id;
    if (!token) { 
        return res.send("user Not found");
    }
    const id =  jwt.verify(String(token),String( process.env.JWT_SECRET_KEY));
    const { name,phone, gender } = req.body;
    let exists = await User.findOne({ _id: id });
    if (exists) {
        let newUser = await User.findOneAndUpdate({ _id: id }, { name: name, phone: phone, gender: gender });
        return res.send(newUser);
    }
    else {
        return res.send("nothing");
    }
});
route.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            res.send("notauser");
        }
        const token = await Token.findOne({ id: user._id, token: req.params.token });
        if (!token) {
            res.send("invalidlink");
           
        }
        else {
            await User.updateOne({ _id: user._id }, {verified: true });
            await token.deleteOne();
            res.redirect(`${process.env.FRONT_END_BASE_URL}`);
        }
    }
    catch (e) {
        console.log(e);
    }
})
route.post("/login", async (req, res) => {
    const { email, password } = req.body;
    var exists = await User.findOne({ email: email });
    if (!exists) {
        res.send("notexists");
    }
    else if (exists.verified === false) {
        var token = await Token.findOne({ id: exists._id });
        if (!token) {
           token = await Token.create({
            id: exists._id,
            token: crypto.randomBytes(32).toString("hex")
        });
        }
        const url = `${process.env.BACKEND_URL}/v1/user/${exists._id}/verify/${token.token}`;
        await sendMail(email, "Verify Email", url);
        res.send("notverified")
    }
    else {

        let Match = await bcrypt.compare(password, exists.password);
        if (Match) {

            const token = jwt.sign(String(exists._id), String(process.env.JWT_SECRET_KEY));
            res.send({
                login: "login",
                id:token,
            });
        }
        else res.send("notlogin");
    }
});
route.post("/seller", async (req, res) => {
    var { shop, address, pincode, bankaccount, user_id } = req.body;  
    if (!user_id) { 
        return res.send("user Not found");
    }
    user_id =  jwt.verify(String(user_id),String( process.env.JWT_SECRET_KEY));
    let exists = await Seller.findOne({ user_id: user_id });
    if (exists) {
        res.send("Seller is Exists");
    }
    else {
        const user = await Seller.create({ shop, address, pincode, bankaccount, user_id });
        console.log(user);
        res.send("seller Profile is Created");
    }
});
route.get("/:id", async (req, res) => {
    const token = req.params.id;
     if (!token) { 
        return res.send("user Not found");
    }
    const id =  jwt.verify(String(token),String( process.env.JWT_SECRET_KEY));
    const userProfile = await User.find({ _id: id });
    const sellerProfile = await Seller.find({ user_id: id });
    res.send({userProfile:userProfile,sellerProfile:sellerProfile});
})
export default route;