import {GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLString} from "graphql";
import {UUIDType} from "../uuid.js";
import {UserType} from "./type.js";

const CreateUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat }
    })
})

const ChangeUserInput = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: () => ({
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat }
    })
})

const CreateUser = {
    type: UserType,
    args: { dto: { type: CreateUserInput } },
    async resolve(source, args, context) {
        return context.prisma.user.create({ data: args.dto })
    }
}

const DeleteUser = {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    async resolve(source, args, context) {
        try {
            await context.prisma.user.delete({ where: { id: args.id } })
            return true
        } catch (e) {
            return false
        }
    }
}

const ChangeUser = {
    type: UserType,
    args: {
        id: { type: UUIDType },
        dto: { type: ChangeUserInput }
    },
    async resolve(source, args, context) {
        return context.prisma.user.update({ where: { id: args.id }, data: args.dto })
    }
}

const SubscribeTo = {
    type: UserType,
    args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType }
    },
    async resolve(source, args, context) {
        await context.prisma.subscribersOnAuthors.create({
            data: { subscriberId: args.userId, authorId: args.authorId }
        })
        return await context.prisma.user.findFirst({ where: { id: args.userId } })
    }
}

const UnsubscribeFrom = {
    type: GraphQLBoolean,
    args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType }
    },
    async resolve(source, args, context) {
        try {
            await context.prisma.subscribersOnAuthors.deleteMany({
                where: { subscriberId: args.userId, authorId: args.authorId }
            })
            return true
        } catch (e) {
            return false
        }
    }
}

export const usersRelatedMutations = {
    createUser: CreateUser,
    deleteUser: DeleteUser,
    changeUser: ChangeUser,
    subscribeTo: SubscribeTo,
    unsubscribeFrom: UnsubscribeFrom
}