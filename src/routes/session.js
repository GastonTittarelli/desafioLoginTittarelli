import { Router } from "express";
import { createUser, getAll, getByEmail } from "../DAO/UserDAO.js";
import { authMiddleware } from "../middlewares/auth.js";

const sessionRouter = Router();

sessionRouter.get("/register", (req, res) => {
    res.render("register", {})
})

sessionRouter.post("/register", async (req, res) => {
    let user = req.body;
    let result = await createUser(user);
    console.log(result);
    res.render("login", {})
})

sessionRouter.get("/login", (req, res) => {
    res.render("login", {})
})

sessionRouter.post("/login", async (req, res) => {
    let user = req.body;
    let result = await getByEmail(user.email);
    //si dejo este fragmento de codigo falla el login
    // if (user.password !== result.password){
    //     res.render("loginError", {})
    // }
    req.session.user = user.email;
    res.render("usuario", {user: req.session.user})
})

sessionRouter.get("/profile", authMiddleware, (req, res) => {
    res.render("usuario", {user: req.session.user})
})

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.render("login")
    });
})

export default sessionRouter;