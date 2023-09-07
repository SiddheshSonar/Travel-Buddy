import User from "../models/UserSchema.js";

class UserController {
    constructor () {}

    async updateLocation (req, res) {
        try {
            // console.log("updateLocation")
            const { location } = req.body;
            const uid = req.userID;
            console.log(location, uid)
            const user = await User.findById(uid);
            console.log(user)
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            user.location.latitude = location.latitude;
            user.location.longitude = location.longitude;
            await user.save();
            return res.status(200).json({ message: "Location updated successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getHome (req, res) {
        try{
            const uid = req.userID;
            const user = await User.findById(uid);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            return res.status(200).json({ location: user.location ?? null });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getAll (req, res) {
        try {
            const uid = req.userID;
            // this is my uid, i want all users other than mine who have the their location as set
            // i don't want all data, i want only name, location and _id
            // const users = await User.find({ _id: { $ne: uid }, location: { $ne: null } });
            const users = await User.find({ _id: { $ne: uid }, location: { $ne: null } }).select("name location");
            return res.status(200).json({ users });
            // get only those users whose location is not null
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController;