import {GraphQLBoolean, GraphQLInputObjectType, GraphQLString} from "graphql";
import {UUIDType} from "../uuid.js";
import {PostType} from "./type.js";

const CreatePostInput = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: () => ({
        authorId: { type: UUIDType },
        content: { type: GraphQLString },
        title: { type: GraphQLString }
    })
})

const ChangePostInput = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: () => ({
        title: { type: GraphQLString },
        content: { type: GraphQLString }
    })
})

const CreatePost = {
    type: PostType,
    args: { dto: { type: CreatePostInput } },
    async resolve(source, args, context) {
        return context.prisma.post.create({data: args.dto})
    }
}

const DeletePost = {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    async resolve(source, args, context) {
        try {
            await context.prisma.post.delete({ where: { id: args.id } })
            return true
        } catch (e) {
            return false
        }
    }
}

const ChangePost = {
    type: PostType,
    args: {
        id: { type: UUIDType },
        dto: { type: ChangePostInput }
    },
    async resolve(source, args, context) {
        return context.prisma.post.update({ where: { id: args.id }, data: args.dto })
    }
}

export const postsRelatedMutations = {
    createPost: CreatePost,
    deletePost: DeletePost,
    changePost: ChangePost
}


