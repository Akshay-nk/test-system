const users = require('../Models/userSchema')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Register
exports.register = async (req, res) => {
    console.log("inside register controller function");
    const { email, password, name, status, phone } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            res.status(406).json("User already exists ...please login!!!");
        } else {
            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new users({
                name,
                email,
                password: hashedPassword,  // Store hashed password
                status,
                phone
            });

            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        res.status(401).json(`Register API failed, Error: ${err}`);
    }
};

// Login
exports.login = async (req, res) => {
    console.log("inside login controller function");
    const { phone, password } = req.body;

    try {
        const existingUser = await users.findOne({ phone });
        if (existingUser) {
            // Compare the entered password with the stored hashed password
            const isMatch = await bcrypt.compare(password, existingUser.password);

            if (isMatch) {
                const token = jwt.sign({ userId: existingUser._id }, "secret123");
                const userRole = existingUser.role;
                res.status(200).json({ existingUser, token, userRole });
            } else {
                res.status(404).json("Incorrect phone/password");
            }
        } else {
            res.status(404).json("User not found");
        }
    } catch (err) {
        res.status(401).json(`Login API Failed, Error: ${err}`);
    }
};