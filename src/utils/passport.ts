
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from './prismaClient';
import bcryptjs from 'bcryptjs';


// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_REDIRECT_URI!,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in database
        let user = await prisma.user.findUnique({ where: { email: profile?.emails[0]?.value } });
        if (user) {
            return done(null, user);
        }

        // Create new user if not found in database
        const newUser = await prisma.user.create({
            data: {
                email: profile?.emails[0]?.value,
                name: profile?.displayName,
                image: profile?.photos[0]?.value,


            }
        });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
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

        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

// Serialize user
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: id } });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
