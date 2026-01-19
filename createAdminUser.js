import mongoose from "mongoose";
import User from "./models/user.js";
import bcrypt from "bcrypt";

const connectionString = "mongodb+srv://admin:123@cluster0.comxkvx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString)
    .then(async () => {
        console.log("Connected to database");
        
        const email = "admin@glowstore.com";
        const password = "adminpassword";
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Check if exists
        const exists = await User.findOne({ email });
        if (exists) {
            console.log("Admin user already exists");
            exists.role = "admin"; // Ensure role is admin
            await exists.save();
            console.log("Updated existing user to admin");
        } else {
            const admin = new User({
                email,
                firstName: "Admin",
                lastName: "User",
                password: hashedPassword,
                role: "admin",
                img: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            });
            await admin.save();
            console.log("Created new admin user");
        }

        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error", err);
        process.exit(1);
    });
