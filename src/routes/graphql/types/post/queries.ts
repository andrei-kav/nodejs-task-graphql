import {UUIDType} from "../uuid.js";
import {GraphQLList} from "graphql";
import {PostType} from "./type.js";

const PostQuery = {
    type: PostType,
    args: { id: { type: UUIDType } },
    async resolve(source, args, context) {
        return context.prisma.post.findUnique({ where: { id: args.id } })
    }
}

const PostsQuery = {
    type: new GraphQLList(PostType),
    async resolve(source, args, context) {
        return context.prisma.post.findMany()
    }
}

export const postsRelatedQueries = {
    post: PostQuery,
    posts: PostsQuery
}