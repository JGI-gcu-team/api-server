const express = require("express");
const router = express.Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

router.get("/", passport.authenticate("google", { scope: ["email"] }));

router.get(
    "/callback",
    passport.authenticate("google", { failureRedirect: "/" }), //? 그리고 passport 로그인 전략에 의해 googleStrategy로 가서 구글계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
    (req, res) => {
        res.redirect("/");
    },
);

passport.use(
    new GoogleStrategy(
        {
            clientID: "process.env.CLIENT_ID",
            clientSecret: "process.env.CLIENT_SECRET",
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        },
    ),
);

module.exports = router;
