import express, { Router } from 'express';
import { passport } from "../utils/passport";
import { register } from "../controllers";

const router = Router();

router.get(
    "/login/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
}), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/")
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureMessage: true,
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/");
    }
);

router.post("/register", register);

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;