import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from '../utils/prismaClient';
import { createId } from '@paralleldrive/cuid2';
import { UserProfile } from '../interfaces';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    prisma.user.findUnique({
        where: { id: payload.sub }
    }).then((user) => {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }).catch((err) => {
        done(err, false);
    })
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile'],
    state: true
},
    function verify(accessToken: string, refreshToken: string, profile: UserProfile, cb: any) {
        prisma.user.upsert({
            where: { email: profile.emails[0].value },
            update: {},
            create: {
                id: createId() as string,
                userType: 'WRITER',
                createdAt: new Date(),
                updatedAt: new Date(),
                image: profile.photos[0].value,
                email: profile.emails[0].value,
                name: profile.displayName
            }
        }).then((user) => {
            cb(null, user);
        }).catch((err) => {
            cb(err, null);
        })
    }
));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Check if user exists in database
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Check if password is correct
        const isMatch = bcryptjs.compareSync(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY as string);

        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));


export default passport;

