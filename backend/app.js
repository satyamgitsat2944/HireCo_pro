





import express from "express";

import MongoStore from 'connect-mongo';
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./router/userRouter.js";
import jobRouter from "./router/jobRouter.js";
import applicationRouter from "./router/applicationRouter.js";
import { User } from "./models/userSchema.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";
import axios from "axios";

// Configure environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "./config/config.env");

console.log("Loading environment from:", envPath);
config({ path: envPath });
connection();
// Validate required environment variables
const requiredEnvVars = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "FRONTEND_URL",
  "BACKEND_URL",
  "SESSION_SECRET"
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  missingVars.forEach(varName => console.error(`- ${varName}`));
  process.exit(1);
}

// Initialize Express app
const app = express();

// Middleware setup
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// const allowedOrigins = [
//   // 'http://localhost:5173',
//   'https://hireco-pro-frontend.onrender.com'
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://hireco-akk.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);





// *****
// In your main App.js or similar
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://hireco-ak.onrender.com/api/v1';

// Add response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 400) {
      console.error('400 Error Details:', {
        config: error.config,
        response: error.response?.data
      });
    }
    return Promise.reject(error);
  }
);










app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Session configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     },
//   })
// );


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ // Use proper session store
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.COOKIE_DOMAIN || 'localhost'
  }
}));







// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `https://hireco-ak.onrender.com/auth/google/callback`,
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile received:", profile);

        let user = await User.findOne({
          $or: [
            { email: profile.emails[0].value },
            { googleId: profile.id }
          ]
        });

        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: "google-auth-temp-password",
            role: "Job Seeker",
            isVerified: true,
            phone: "",
            address: "",
            ...(profile.photos?.[0]?.value && { image: profile.photos[0].value }),
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in Google OAuth callback:", error);
        return done(error, null);
      }
    }
  )
);

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});



// Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `https://hireco-akk.onrender.com/dashboard`,
    failureRedirect: `https://hireco-akk.onrender.com/login?error=google_auth_failed`,
  })
);

app.get("/auth/check", (req, res) => {
  res.status(200).json({
    isAuthenticated: !!req.user,
    user: req.user || null,
  });
});


// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Initialize application
connection(); // Database connection
newsLetterCron(); // Start cron job
app.use(errorMiddleware); // Error handling middleware

export default app;


















