import { ApolloServer, gql } from "apollo-server-lambda";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./logic/schemaGql.js";
import mongoose, { mongo } from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.DATABASE_URL;
const SECRETE = process.env.SECRETE;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})

mongoose.connection.on("error", (err) => {
    console.log("error connecting", err)
})

import './DB/AskWork.js'
import './DB/Comment.js'
import './DB/Friend.js'
import './DB/Friend_request.js'
import './DB/Idea.js'
import './DB/User.js'
import './DB/Photo.js'
import './DB/Like.js'
import './DB/OkWork.js'
import './DB/Message.js'
import './DB/Msgseen.js'

import resolvers from './logic/resolver.js'

const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, SECRETE)
        return { userId }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
// });
exports.handler = server.createHandler();