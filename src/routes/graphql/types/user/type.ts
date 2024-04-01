import {
    GraphQLFloat,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";
import {UUIDType} from "../uuid.js";
import {ProfileType} from "../profile/type.js";
import {PostType} from "../post/type.js";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: UUIDType },
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
        profile: {
            type: ProfileType,
            async resolve(source, args, context) {
                return context.prisma.profile.findUnique({ where: { userId: source.id } })
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            async resolve(source, args, context) {
                return context.prisma.post.findMany({ where: { authorId: source.id } })
            }
        },
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            async resolve(source, args, context) {
                const results = await context.prisma.subscribersOnAuthors.findMany({
                    where: { subscriberId: source.id },
                    select: { author: true }
                })
                return results.map(result => result.author)
            },
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            async resolve(source, args, context) {
                const results = await context.prisma.subscribersOnAuthors.findMany({
                    where: { authorId: source.id },
                    select: { subscriber: true }
                })
                return results.map(result => result.subscriber)
            },
        }
    })
})