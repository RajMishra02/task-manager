import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res) =>{
    const {username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({message:"successfull"})
}

export const signin = async (req, res) =>{
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username})
        if(!user){
            console.log("user doesn't exist")
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            console.log("Wrong credentials")
        }
        const age = 1000 * 60 * 60 * 24 * 7
        const token = jwt.sign({id: user._id}, "rajmishra", {expiresIn: age})
        res.status(200).cookie("acces-token", token, {
            httpOnly: true,
            maxAge: age, 

        }).json({
            message: "Signin Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error)
    }

}

export const logout = (req, res) => {
    res.clearCookie('acces-token', {
        httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
};
