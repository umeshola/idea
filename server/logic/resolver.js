import mongoose, { Query } from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const SECRETE = process.env.SECRETE;

const User = mongoose.model("User")
const Comment = mongoose.model("Comment")
const Friend = mongoose.model("Friend")
const Friend_request = mongoose.model("Friend_request")
const Idea = mongoose.model("Idea")
const AskWork = mongoose.model("AskWork")
const Photo = mongoose.model("Photo")
const Like = mongoose.model("Like")
const OkWork = mongoose.model("OkWork")
const Message = mongoose.model("Message")
const Msgseen = mongoose.model("Msgseen")


const resolvers = {
    Query: {
        me: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const user = await User.findById(userId);
            return user;
        },
        allIdea: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const ideas = await Idea.find().populate('by').lean();
            // For each idea, fetch the related photos
            const ideaIds = ideas.map(idea => idea._id);
            const photos = await Photo.find({ on: { $in: ideaIds } }).lean();
            // Group photos by idea ID
            const photosByIdeaId = photos.reduce((acc, photo) => {
                if (!acc[photo.on]) acc[photo.on] = [];
                acc[photo.on].push(photo);
                return acc;
            }, {});
            // Attach photos to each idea and map _id to id
            const ideasWithPhotos = ideas.map(idea => ({
                ...idea,
                id: idea._id, // Map _id to id
                like: idea.like || 0,
                worker: idea.worker || 0,
                photos: photosByIdeaId[idea._id] || []
            }));

            return ideasWithPhotos;
        },
        yourIdea: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const ideas = await Idea.find({ by: userId }).populate('by').lean();
            // For each idea, fetch the related photos
            const ideaIds = ideas.map(idea => idea._id);
            const photos = await Photo.find({ on: { $in: ideaIds } }).lean();
            // Group photos by idea ID
            const photosByIdeaId = photos.reduce((acc, photo) => {
                if (!acc[photo.on]) acc[photo.on] = [];
                acc[photo.on].push(photo);
                return acc;
            }, {});
            // Attach photos to each idea and map _id to id
            const ideasWithPhotos = ideas.map(idea => ({
                ...idea,
                id: idea._id, // Map _id to id
                like: idea.like || 0,
                worker: idea.worker || 0,
                photos: photosByIdeaId[idea._id] || []
            }));
            return ideasWithPhotos;
        },
        singleIdea: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const idea = await Idea.findById(to).populate('by').lean();
            if (!idea) throw new Error("Idea not found!");
            const photos = await Photo.find({ on: idea._id }).lean();
            const ideaWithPhotos = {
                ...idea,
                id: idea._id,
                like: idea.like || 0,
                worker: idea.worker || 0,
                photos: photos || []
            };
            return ideaWithPhotos;
        },
        allIdea_signleUser: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const idea = await Idea.findById(to);
            if (!idea) throw new Error("Idea not found!");
            const userIdeas = await Idea.find({ by: idea.by });
            return userIdeas;
        },
        allaskingfor_work: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const works = await AskWork.find({ on: to }).populate('from').exec();
                return works.map(work => ({
                    from: {
                        id: work.from._id,
                        userName: work.from.userName,
                        email: work.from.email,
                        password: work.from.password
                    },
                    msg: work.msg
                }));
            } catch (err) {
                throw new Error("Error fetching work requests");
            }
        },
        allRequest_singleUser: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const friendRequests = await Friend_request.find({ to: to }).populate('from').exec();
                return friendRequests.map(request => ({
                    from: {
                        id: request.from._id,
                        userName: request.from.userName,
                        email: request.from.email,
                        password: request.from.password
                    }
                }));
            } catch (err) {
                throw new Error("Error fetching friend requests");
            }
        },
        allFriends: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");

            try {
                const friends = await Friend.find({ $or: [{ p1: userId }, { p2: userId }] });
                const friendDetails = [];
                for (const friend of friends) {
                    const friendsId = friend.p1.equals(userId) ? friend.p2 : friend.p1;
                    const user = await User.findById(friendsId);
                    if (user) {
                        friendDetails.push({
                            p1: userId,
                            p2: {
                                id: user._id,
                                userName: user.userName,
                                email: user.email
                            }
                        });
                    }
                }
                return friendDetails;
            } catch (error) {
                console.error("Error fetching friends:", error);
                throw new Error("Failed to fetch friends.");
            }
        },
        get_user_id_form_idea: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const Ideanew = await Idea.findById(to);
            const id = Ideanew.by;
            return id;
        },
        check_friends: async(_, { to }, { userId }) => {
            if (!userId) {
                throw new Error("You are not logged in!");
            }
            if (to == userId) {
                return true;
            }
            try {
                const friendship = await Friend.findOne({
                    $or: [
                        { $and: [{ p1: userId }, { p2: to }] },
                        { $and: [{ p1: to }, { p2: userId }] }
                    ]
                });
                return friendship !== null;
            } catch (error) {
                console.error("Error checking friendship:", error);
                throw new Error("Failed to check friendship.");
            }
        },
        work_or_not: async(_, { newDataID }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const { on } = newDataID;
            const newWork = await OkWork.findOne({ on, by: userId });
            if (newWork) {
                return true;
            }
            return false;
        },
        get_all_comment: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const comments = await Comment.find({ on: to })
                    .populate('by')
                    .sort({ time: -1 })
                    .exec();
                return comments.map(comment => ({
                    name: comment.name,
                    time: comment.time,
                    by: {
                        id: comment.by._id,
                        userName: comment.by.userName
                    }
                }));
            } catch (err) {
                throw new Error("Error fetching comments");
            }
        },
        get_top_like: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const topIdea = await Idea.findOne()
                    .sort({ like: -1 })
                    .select('_id')
                    .exec();

                if (!topIdea) {
                    throw new Error("No ideas found");
                }

                return topIdea._id;
            } catch (err) {
                throw new Error("Error fetching top liked idea");
            }
        },
        get_top_funded: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const topIdea = await Idea.findOne()
                    .sort({ fund: -1 })
                    .select('_id')
                    .exec();

                if (!topIdea) {
                    throw new Error("No ideas found");
                }

                return topIdea._id;
            } catch (err) {
                throw new Error("Error fetching top liked idea");
            }
        },
        get_msg: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const messages = await Message.find({ $or: [{ by: userId, to: to }, { by: to, to: userId }] });
            const formattedMessages = messages.map(message => ({
                msg: message.msg,
                side: message.by.equals(userId) // true if the message is sent by the user
            }));
            return { messages: formattedMessages }
        },
        check_msg: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const checkmsg = await Msgseen.findOne({ to: userId, by: to });
            if (checkmsg) {
                return true;
            }
            return false;
        }
    },

    Mutation: {
        signup: async(_, { userNew }) => {
            const { email, password } = userNew;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                if (existingUser.password !== password) {
                    throw new Error("Email or password is incorrect");
                }
                const token = jwt.sign({ userId: existingUser._id }, SECRETE);
                return { token };
            } else {
                const newUser = new User({...userNew });
                await newUser.save();
                const token = jwt.sign({ userId: newUser._id }, SECRETE);
                return { token };
            }
        },
        addIdea: async(_, { IdeaNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { title, desc, askForWork, photo } = IdeaNew;
            const newIdea = new Idea({ title, desc, askForWork, by: userId });
            await newIdea.save();
            const on = newIdea._id;
            const by = newIdea.by;
            if (photo) {
                const newPhoto = new Photo({ by, on, link: photo })
                await newPhoto.save();
                return "Idea created and saved with photo!"
            }
            return "Idea created and saved!"
        },
        addPhoto: async(_, { photoNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { by, on, link } = photoNew;
            const newIdea = await Idea.findById(on);
            if (newIdea.by == by) {
                const newPhoto = new Photo({ by, on, link })
                await newPhoto.save();
                return `Photo is been added to this idea ${on}`;
            }
            return "Your are not the owner of the idea";
        },
        addComment: async(_, { CommentNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { on, name } = CommentNew;
            const newComment = new Comment({ on, by: userId, time: new Date(), name });
            await newComment.save();
            return `You have commented on this Idea ${on}`
        },
        friendrequest: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const exist1 = await Friend.findOne({ p1: to, p2: userId });
            const exist2 = await Friend.findOne({ p1: userId, p2: to });
            if (exist1 || exist2) {
                return "Already friend"
            }
            const newFriendRequest = new Friend_request({
                from: userId,
                to
            })
            await newFriendRequest.save()
            return "request send!"
        },
        addfriend: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const newFriend = new Friend({
                p1: userId,
                p2: to
            })
            await newFriend.save();
            await Friend_request.deleteOne({ from: to, to: userId })
            return newFriend;
        },

        addLike: async(_, { likeNew }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const { on } = likeNew;
            const alreadLike = await Like.findOne({ on, by: userId });
            if (!alreadLike) {
                const newLike = new Like({ on, by: userId });
                await newLike.save()
                const idea = await Idea.findById(on);
                idea.like += 1;
                await idea.save()
                return "You have liked!"
            }
            return "You have already liked it!"
        },
        askforWork: async(_, { askData }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const { on, msg } = askData;
            const work = await OkWork.findOne({ by: userId, on });
            if (!work) {
                const newdata = new AskWork({ from: userId, on, msg })
                await newdata.save();
                return "You have send a request for asking to work!"
            }
            return "You are alreading working on the Idea"
        },
        addTowWork: async(_, { WorkNew }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const { on, by } = WorkNew;
            const alreadWorking = await OkWork.findOne({ on, by });
            if (!alreadWorking) {
                const newLike = new OkWork({ on, by });
                await newLike.save()
                const idea = await Idea.findById(on);
                idea.worker += 1;
                await idea.save()
                await AskWork.deleteOne({ from: by, on })
                return "You are now part of the idea!"
            }
            return "You have already woking in the idea!"
        },
        fundIdea: async(_, { NewFund }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const { to, token } = NewFund;
            const user = await User.findById(userId);
            const userMoney = user.token;
            if (token <= userMoney) {
                const newIdea = await Idea.findById(to);
                const newuser = await User.findById(newIdea.by);
                newuser.token += token;
                await newuser.save();
                newIdea.fund += token;
                await newIdea.save();
                user.token -= token;
                await user.save();
                return "Token sended"
            } else {
                return "Not enough token"
            }
            return "Something went wrong"

        },
        sendMsg: async(_, { NewMsg }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const { to, msg } = NewMsg;
            const newMSG = new Message({ to, by: userId, msg, time: new Date() })
            await newMSG.save()
            const checkMSGseen = await Msgseen.findOne({ to, by: userId });
            if (!checkMSGseen) {
                const newMSGseen = new Msgseen({ to, by: userId });
                await newMSGseen.save();
                return "message send! with saving in the msgseen"
            }
            return "message send! without saving in the msgseen"
        },
        msghasbeenseen: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            await Msgseen.findOneAndDelete({ to: userId, by: to })
            return "Done"
        }

    }

}
export default resolvers;