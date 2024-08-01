import User from '../models/user.model.js'

const newUser = async (req, res) => {

    try {
        const { user, collegeName, round1Marks, round2Marks, round3Marks, techMarks } = req.body;

        if (!user || !collegeName || !round1Marks || !round2Marks || !round3Marks || !techMarks) {
            return res.status(400).json({
                msg: "Enter necessary details!"
            })
        }

        const newUser = await User.create({
            user,
            collegeName,
            round1Marks,
            round2Marks,
            round3Marks,
            techMarks
        })
       
        if (!newUser) {
            return res.json({
                msg: "User not created. Something went wrong!"
            })
        }

        return res.status(202).json({
            msg: "New user created!",
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error in new user creation",
            error: error.message
        })
    }
}


export { newUser }

