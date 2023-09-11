import mongoose from "mongoose";
import User from "../models/UserSchema.js";



class UserController {
    constructor() { }

    async updateLocation(req, res) {
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

    async getHome(req, res) {
        try {
            const uid = req.userID;
            const user = await User.findById(uid);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            return res.status(200).json({ location: user.location ?? null });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }



    async getAll(req, res) {
        try {
            const uid = new mongoose.Types.ObjectId(req.userID);
    
            const users = await User.aggregate([
                {
                    $match: {
                        _id: { $ne: uid },
                        location: { $ne: null }
                    }
                },
                // Join with same collection to get friend's perspective for authenticated user
                {
                    $lookup: {
                        from: "users",
                        let: { userId: "$_id" },
                        pipeline: [
                            { $match: { _id: uid } },
                            {
                                $addFields: {
                                    friendRelationForAuthUser: {
                                        $filter: {
                                            input: "$friends",
                                            as: "friendEntry",
                                            cond: { $eq: ["$$friendEntry.friendId", "$$userId"] }
                                        }
                                    }
                                }
                            },
                            {
                                $project: {
                                    friendStatusForAuthUser: { $arrayElemAt: ["$friendRelationForAuthUser.status", 0] }
                                }
                            }
                        ],
                        as: "friendData"
                    }
                },
                {
                    $addFields: {
                        friendRelation: {
                            $filter: {
                                input: "$friends",
                                as: "friendEntry",
                                cond: { $eq: ["$$friendEntry.friendId", uid] }
                            }
                        }
                    }
                },
                {
                    $project: {
                        name: 1,
                        location: 1,
                        isFriend: {
                            $cond: [
                                { $eq: [{ $arrayElemAt: ["$friendRelation.status", 0] }, "ACCEPTED"] },
                                true,
                                false
                            ]
                        },
                        status: { $arrayElemAt: ["$friendData.friendStatusForAuthUser", 0] }
                    }
                }
            ]);
    
            return res.status(200).json({ users });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    
    

    async sendFriendRequest(req, res) {
        try {
            const uid = new mongoose.Types.ObjectId(req.userID);
            const fid = new mongoose.Types.ObjectId(req.params.id);
    
            if (!fid) {
                return res.status(400).json({ message: "Invalid user id" });
            }
    
            const user = await User.findById(uid);
            const friendUser = await User.findById(fid);
    
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            if (!friendUser) {
                return res.status(400).json({ message: "Friend user not found" });
            }
    
            const friendRelationForUser = user.friends.find(friend => friend.friendId.toString() === fid.toString());
            const friendRelationForFriendUser = friendUser.friends.find(friend => friend.friendId.toString() === uid.toString());
    
            // If both users have sent friend requests to each other
            if (friendRelationForUser && friendRelationForFriendUser) {
                friendRelationForUser.status = "ACCEPTED";
                friendRelationForFriendUser.status = "ACCEPTED";
                
                await user.save();
                await friendUser.save();
    
                return res.status(200).json({ message: "Friend request accepted", status: "ACCEPTED" });
            }
            
            // If only the user has sent a request (or no requests were sent yet)
            if (!friendRelationForUser) {
                user.friends.push({ friendId: fid, status: "SENT" });
                await user.save();
            }
    
            if (!friendRelationForFriendUser) {
                friendUser.friends.push({ friendId: uid, status: "PENDING" });
                await friendUser.save();
            }
    
            return res.status(200).json({ message: "Friend request sent successfully", status: "SENT" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    

    async acceptFriendRequest(req, res) {
        try {

            const uid = new mongoose.Types.ObjectId(req.userID);
            const fid = new mongoose.Types.ObjectId(req.params.id);

            if (!fid) {
                return res.status(400).json({ message: "Invalid user id" });
            }
            
            // Fetching user and friend user documents
            const user = await User.findById(uid);

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            // Check if friend request already exists or the users are already friends
            const friendRelation = user.friends.find(friend => friend.friendId.toString() === fid.toString());
            if (!friendRelation) {
                return res.status(400).json({ message: "Friend request not found" });
            }
            if (friendRelation.status === "ACCEPTED") {
                return res.status(400).json({ message: "You are already friends" });
            }

            // Update friend request to user as ACCEPTED
            friendRelation.status = "ACCEPTED";
            await user.save();

            // Update friend request to friend user as ACCEPTED
            
            const friend = await User.findById(fid);
            const friendRelationForFriendUser = friend.friends.find(friend => friend.friendId.toString() === uid.toString());
            friendRelationForFriendUser.status = "ACCEPTED";
            await friend.save();

            return res.status(200).json({ message: "Friend request accepted successfully" });

            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    

}

export default UserController;