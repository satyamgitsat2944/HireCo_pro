




import express from "express";
import passport from "passport";
import { 
  getUser, 
  login, 
  logout, 
  register, 
  updatePassword, 
  updateProfile,
  getGoogleAuthStatus,
  forgotPassword,
  resetPassword
} from "../controllers/userController.js";
import { sendToken } from "../utils/jwtToken.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Regular user routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/google-auth-status", getGoogleAuthStatus);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);

// Password reset routes
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);




router.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/login?error=google_auth_failed',
    session: true // Ensure sessions are enabled
  }),
  async (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { id: req.user._id }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '1d' }
      );

      // Set JWT cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      // Redirect with token in URL (for frontend)
      res.redirect(`${process.env.FRONTEND_URL}/login/success?token=${token}`);
    } catch (err) {
      console.error('Authentication error:', err);
      res.redirect('/login?error=auth_error');
    }
  }
);














router.get('/google/logout', isAuthenticated, async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie('token', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    // Revoke tokens if exists
    if (req.user?.googleTokens) {
      await req.user.revokeGoogleTokens();
    }

    // Logout passport
    req.logout();

    // Destroy session
    await new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.status(200).json({ 
      success: true, 
      message: 'Logout successful',
      redirectUrl: `${process.env.FRONTEND_URL}/login`
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Logout failed' 
    });
  }
});




export default router;














