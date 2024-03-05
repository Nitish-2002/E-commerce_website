import jwt from 'jsonwebtoken';
import { User } from "../modals/Registermodal.js";
import bcrypt from 'bcrypt'

const loginpage = async (req, res) => {
    //  console.log(req)
    
    console.log(await bcrypt.genSalt(), 10);
    try {
        const { username, password } = req.body;
        const userExist = await User.findOne({

            where: {
                username: username,
            },
        });
        // console.log(req.body,"as request")
        if (userExist) {
            if (password == userExist.password) {
                const token = jwt.sign({
                    id: userExist.id,
                    username: userExist.username,
                }, "$2b$10$AdmfXaD4DGnYSrTEX9HArO.", { expiresIn: '12h' });

                console.log("Generated Token:", token);
                res.json({ token, message: "Logged in" });
            } else {
                res.send("Password mismatch");
            }
        } else {
            res.send("Invalid login credentials: Username doesn't exist");
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("Unauthorized login");
    }
};

export default loginpage;
