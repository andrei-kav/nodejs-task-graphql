import {GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import {UUIDType} from "./uuid.js";

/**
 * types
 */
export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: UUIDType },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: UUIDType },
    })
})

/**
 * queries
 */
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