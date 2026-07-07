const { check } = require("express-validator");
const { validationResult } = require("express-validator"); 
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {

  // Render the login page.
  res.render("auth/login", {
    pageTitle: "Login",
    isLoggedIn: false, // Pass the isLoggedIn flag to the view
    user : {}
  });

};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        isLoggedIn: !!(req.session && req.session.isLoggedIn),
        errorMessage: ["Invalid email or password!"],
        user : {}
      });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        isLoggedIn: !!(req.session && req.session.isLoggedIn),
        errorMessage: ["Invalid email or password!"],
        user : {}
      });
    }

    console.log("Login attempt:", { email });
    req.session.isLoggedIn = true;
    req.session.user = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType
    };

     req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).send("Unable to log in");
      }
      res.redirect("/");
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).render("auth/login", {
      pageTitle: "Login",
      isLoggedIn: !!(req.session && req.session.isLoggedIn),
      errorMessage: ["Unable to log in. Please try again."],
      user : {}
    });
  }
};

exports.postLogout = (req, res, next) => {
  // Clear the isLoggedIn session variable.
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.status(500).send("Unable to log out");
    } 
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  // Render the signup page.
  res.render("auth/signup", {
    pageTitle: "Sign Up",
    isLoggedIn: !!(req.session && req.session.isLoggedIn) ,// Pass the isLoggedIn flag from session
    user: {}
  }); 
};


exports.postSignup = [

    check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),

    check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),

    check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

    check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character'),

    check("confirmPassword")
  .notEmpty()
  .withMessage("Please confirm your password")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

    check("userType")
  .notEmpty()
  .withMessage("Please select a user type")
  .isIn(["guest", "host"])
  .withMessage("Invalid user type"),


    check('terms')
    .notEmpty()
    .withMessage('You must accept the terms and conditions')
    .custom((value) => {
        if (value !== 'on') {
            throw new Error('You must accept the terms and conditions');
        }
        return true;
    }),

  
  (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword, userType } = req.body; 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Sign Up",
        errors: errors.array(),
        isLoggedIn: !!(req.session && req.session.isLoggedIn),
        user : {}
      });
    }



    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType
      });

      user.save().then(() => {
      console.log("User created successfully:", user);
      res.redirect("/auth/login");
    }).catch((err) => {
      console.error("Error saving user:", err);
      res.status(500).render("auth/signup", {
        pageTitle: "Sign Up",
        errors: [{ msg: "An error occurred while creating the user." }],
        isLoggedIn: !!(req.session && req.session.isLoggedIn),
        user : {}
      });
    });
      
    });
    
    console.log("Signup attempt:", req.body);
}

];