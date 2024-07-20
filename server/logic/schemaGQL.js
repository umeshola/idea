import { gql } from "apollo-server";

const typeDefs = gql `
type Query{
    me:User
    allIdea:[Idea]
    yourIdea:[Idea]
    singleIdea(to:String!):Idea
    allIdea_signleUser(to:String!):[Idea]
    allaskingfor_work(to:String!):[Work]
    allRequest_singleUser(to:String!):[FriendRequest]
    allFriends:[FriendDetail]
    get_user_id_form_idea(to:String!):ID!
    check_friends(to:String!):Boolean
    work_or_not(newDataID:DataInputID!):Boolean
    get_all_comment(to:String!):[CommentWithUser]
    get_top_like:ID!
    get_top_funded:ID!
    get_msg(to:String!):Data
    check_msg(to:String!):Boolean
}
type Data {
    messages: [Message!]!
}
type Message {
    msg: String!
    side: Boolean!
}
type CommentWithUser{
    name:String!
    time:String!
    by:User!
}
input DataInputID{
    on:ID!
}
type FriendDetail{
    p1:ID!
    p2:User!
}
type FriendRequest {
    from: User!
}
type Work{
    from:User!
    msg:String!
}
type Idea {
    id: ID!
    title: String!
    desc: String!
    fund:Int!
    by: User!
    like: Int!
    worker: Int!
    photos: [Photo!]!
}
type Photo {
    id: ID!
    on: ID!
    by: ID!
    link: String!
}
type User{
    id:ID!
    userName:String!
    email:String!
    password:String!
}
type Mutation{
    signup(userNew:UserInput!):Token
    addIdea(IdeaNew:IdeaInput!):String
    addComment(CommentNew:CommentInput!):String
    friendrequest(to: String!):String
    addfriend(to:String!):Friend
    askforWork(askData:AskInput!):String
    addPhoto(photoNew:PhotoInput!):String
    addLike(likeNew:LikeInput!):String
    addTowWork(WorkNew:WorkInput!):String
    fundIdea(NewFund:FundInput!):String
    sendMsg(NewMsg:MsgInput!):String
    msghasbeenseen(to:String!):String

}
input MsgInput{
    to:ID!
    msg:String!
}
input FundInput{
    to:ID
    token:Int  
}
input WorkInput{
    on:ID!
    by:ID!
}
input LikeInput{
    on:ID!
}
input PhotoInput{
    on:ID!
    by:ID!
    link:String!
}
input AskInput{
    on:ID!
    msg:String!
}
type Friend{
    p1:ID!
    p2:ID!
}
input CommentInput{
    on:ID!
    name:String!
}
input IdeaInput{
    title:String!
    desc:String!
    askForWork:Int!
    photo:String
}

type Token{
    token:String!
}

input UserInput{
    userName:String!
    email:String!
    password:String!
}
`
export default typeDefs;