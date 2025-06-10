// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { connection } from "./database/connection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import fileUpload from "express-fileupload";
// import userRouter from "./router/userRouter.js";
// import jobRouter from "./router/jobRouter.js";
// import applicationRouter from "./router/applicationRouter.js";
// import { newsLetterCron } from "./automation/newsLetterCron.js";


// const session = require("express-session");
// const passport = require("passport");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// // const userdb = require("./model/usermodel");
// const clientid = "688297758592-qbnfc5kpj3ksthrel68skm28lv9pifov.apps.googleusercontent.com";
// const clientsecret = "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";

// // Session middleware setup
// app.use(
//   session({
//     secret: "HireCo12398760239%^&%$#", 
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use((req, res, next) => {
//     console.log(`Request received: ${req.method} ${req.url}`);
//     next();
// });


// // Initialize Passport.js middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Setup Google OAuth strategy
// passport.use(
//   new OAuth2Strategy(
//     {
//       clientID: clientid,
//       clientSecret: clientsecret,
//       callbackURL: "http://localhost:4000/auth/google/callback",
//       // Must match Google Console
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log("Google profile:", profile);
//       try {
//         // Find user or create new one
//         let user = await userdb.findOne({ googleId: profile.id }); // corrected 'findOne'
//         if (!user) {
//           user = new userdb({
//             googleId: profile.id,
//             displayName: profile.displayName,
//             email: profile.emails[0].value,
//             image: profile.photos[0].value,
//           });
//           await user.save();
//         }
//         return done(null, user); // Pass user to serializeUser
//       } catch (error) {
//         return done(error, null); // Handle errors gracefully
//       }
//     }
//   )
// );

// // Used to store user info in session
// passport.serializeUser((user, done) => {
//   done(null, user); // Serialize full user object (you can use user.id for lighter sessions)
// });

// // Used to retrieve user from session
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Initialize Google OAuth login
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // Callback route after Google auth
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:5173/dashboard", // redirect on successful login
//     failureRedirect: "http://localhost:5173/login", // redirect on failure
//   })
// );


// const app = express();
// config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/job", jobRouter);
// app.use("/api/v1/application", applicationRouter);

// newsLetterCron()
// connection();
// app.use(errorMiddleware);

// export default app;





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
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);




// *****
// In your main App.js or similar
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000/api/v1';

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
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
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
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
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













// import express from "express";
// import { config } from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// import { connection } from "./database/connection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import fileUpload from "express-fileupload";
// import userRouter from "./router/userRouter.js";
// import jobRouter from "./router/jobRouter.js";
// import applicationRouter from "./router/applicationRouter.js";
// import { User } from "./models/userSchema.js";
// import { newsLetterCron } from "./automation/newsLetterCron.js";
// import { createServer } from 'http';

// // Configure environment variables
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Try multiple possible env file locations
// const envPaths = [
//   path.resolve(__dirname, "./config/config.env"),  // Primary location
//   path.resolve(__dirname, "../config/config.env"), // Alternative location
//   path.resolve(__dirname, ".env")                 // Fallback location
// ];

// let envLoaded = false;
// for (const envPath of envPaths) {
//   try {
//     console.log(`Attempting to load environment from: ${envPath}`);
//     config({ path: envPath });
    
//     // Check if required variables are loaded
//     if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
//       envLoaded = true;
//       console.log(`✅ Successfully loaded environment from: ${envPath}`);
//       break;
//     }
//   } catch (err) {
//     console.log(`❌ Failed to load from ${envPath}`);
//   }
// }

// // Validate required environment variables
// const requiredEnvVars = {
//   "GOOGLE_CLIENT_ID": "Google OAuth Client ID",
//   "GOOGLE_CLIENT_SECRET": "Google OAuth Client Secret",
//   "FRONTEND_URL": "Frontend Application URL",
//   "BACKEND_URL": "Backend API URL",
//   "SESSION_SECRET": "Session Secret Key"
// };

// const missingVars = Object.entries(requiredEnvVars)
//   .filter(([varName]) => !process.env[varName])
//   .map(([_, description]) => description);

// if (missingVars.length > 0 || !envLoaded) {
//   console.error("❌ Configuration Error:");
//   console.error("Missing required environment variables:");
//   missingVars.forEach(desc => console.error(`- ${desc}`));
//   console.error("\nPlease check these locations for your config.env file:");
//   envPaths.forEach(p => console.error(`- ${p}`));
//   console.error("\nThe file should contain these variables:");
//   Object.entries(requiredEnvVars).forEach(([varName, desc]) => 
//     console.error(`${varName}=your_${desc.replace(/ /g, '_').toLowerCase()}`)
//   );
//   process.exit(1);
// }

// // Initialize Express app
// const app = express();

// // Enhanced CORS configuration
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // Security middleware
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// // File upload configuration
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//     safeFileNames: true,
//     preserveExtension: true
//   })
// );

// // Secure session configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//       sameSite: "lax",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     },
//   })
// );

// // Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());

// // Enhanced Google OAuth Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
//       scope: ["profile", "email"],
//       passReqToCallback: true,
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         console.log("Google authentication attempt for:", profile.emails[0].value);

//         const existingUser = await User.findOne({
//           $or: [
//             { email: profile.emails[0].value },
//             { googleId: profile.id }
//           ]
//         });

//         if (existingUser) {
//           // Update existing user if needed
//           if (!existingUser.googleId) {
//             existingUser.googleId = profile.id;
//             await existingUser.save();
//           }
//           return done(null, existingUser);
//         }

//         // Create new user
//         const newUser = new User({
//           name: profile.displayName,
//           email: profile.emails[0].value,
//           googleId: profile.id,
//           password: null, // No password for OAuth users
//           role: "Job Seeker",
//           isVerified: true,
//           phone: "",
//           address: "",
//           ...(profile.photos?.[0]?.value && { 
//             image: profile.photos[0].value 
//           }),
//         });

//         await newUser.save();
//         return done(null, newUser);
//       } catch (error) {
//         console.error("Google OAuth error:", error);
//         return done(error, null);
//       }
//     }
//   )
// );

// // Passport serialization
// passport.serializeUser((user, done) => {
//   done(null, user._id); // Store only user ID in session
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id).select("-password");
//     done(null, user);
//   } catch (error) {
//     console.error("Deserialization error:", error);
//     done(error, null);
//   }
// });

// // Authentication Routes
// app.get("/auth/google",
//   passport.authenticate("google", { 
//     scope: ["profile", "email"],
//     prompt: "select_account" // Force account selection
//   })
// );

// app.get("/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth`,
//     session: true
//   }),
//   (req, res) => {
//     // Successful authentication
//     res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
//   }
// );
// // Add this with your other routes
// app.get("/auth/check", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.status(401).json({ authenticated: false });
//   }
//   // Return user info without sensitive data
//   const { password, ...safeUser } = req.user;
//   res.status(200).json({ 
//     authenticated: true,
//     user: safeUser
//   });
// });

// // Auth status check endpoint
// app.get("/auth/status", (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ 
//       authenticated: false,
//       message: "Not authenticated" 
//     });
//   }
  
//   // Return safe user data (exclude sensitive fields)
//   const { password, googleId, ...safeUser } = req.user.toObject();
//   res.status(200).json({ 
//     authenticated: true,
//     user: safeUser
//   });
// });

// // API Routes
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/job", jobRouter);
// app.use("/api/v1/application", applicationRouter);

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ 
//     status: "healthy",
//     timestamp: new Date().toISOString() 
//   });
// });

// import net from 'net';
// import { exec } from 'child_process';

// const PORT = 4000;

// // 1. Hyper-aggressive port cleaner
// const obliteratePort = () => new Promise((resolve) => {
//     const cmd = process.platform === 'win32' ?
//         `powershell -Command "Get-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess | Stop-Process -Force; netsh int ipv4 reset"` :
//         `kill -9 $(lsof -t -i:${PORT})`;
    
//     exec(cmd, (err) => {
//         if (err) console.error('⚠️ Cleanup encountered issues');
//         resolve();
//     });
// });

// // 2. Forensic port analysis
// const forensicPortCheck = () => new Promise((resolve) => {
//     const cmd = process.platform === 'win32' ?
//         `powershell -Command "Get-NetTCPConnection -LocalPort ${PORT} | Select-Object OwningProcess, State | Format-Table"` :
//         `lsof -i :${PORT}`;
    
//     exec(cmd, (err, stdout) => {
//         if (stdout.trim()) {
//             console.error('🔍 FORENSIC PORT ANALYSIS:');
//             console.error(stdout);
//             resolve(false);
//         } else {
//             resolve(true);
//         }
//     });
// });

// // 3. Server startup with military precision
// const startServer = async () => {
//     console.log('🚀 Launching server takeover protocol...');
    
//     await obliteratePort();
    
//     if (!await forensicPortCheck()) {
//         console.error(`
//         🚨 PORT ${PORT} UNDER SIEGE! 🚨

//         LAST RESORT ACTIONS:

//         1. REBOOT YOUR COMPUTER
//         2. DISABLE ANTIVIRUS TEMPORARILY
//         3. CHECK FOR DOCKER/WSL CONTAINERS
//         4. SCAN FOR MALWARE
        
//         After reboot, run:
//         netsh winsock reset
//         netsh int ip reset
//         `);
//         process.exit(1);
//     }

//     app.listen(PORT, () => {
//         console.log(`🏆 PORT ${PORT} DOMINATION COMPLETE! Server running`);
//     }).on('error', (err) => {
//         console.error(`💥 CATASTROPHIC FAILURE: ${err.message}`);
//         forensicPortCheck();
//         process.exit(1);
//     });
// };

// startServer();
// export default app;







