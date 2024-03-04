import {UUIDType} from "../uuid.js";
import {GraphQLList} from "graphql";
import {UserType} from "./type.js";

const getUser = {
    type: UserType,
    args: { id: { type: UUIDType } },
    async resolve(source, args, context) {
        return context.prisma.user.findUnique({ where: { id: args.id } })
    }
}

const getUsers = {
    type: new GraphQLList(UserType),
    async resolve(source, args, context) {
        return context.prisma.user.findMany()
    }
}

export const usersRelatedQueries = {
    user: getUser,
    users: getUsers
}