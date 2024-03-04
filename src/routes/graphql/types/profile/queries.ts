import {UUIDType} from "../uuid.js";
import {GraphQLList} from "graphql";
import {ProfileType} from "./type.js";

const ProfileQuery = {
    type: ProfileType,
    args: { id: { type: UUIDType } },
    async resolve(source, args, context) {
        return context.prisma.profile.findUnique({ where: { id: args.id } })
    }
}

const ProfilesQuery = {
    type: new GraphQLList(ProfileType),
    async resolve(source, args, context) {
        return context.prisma.profile.findMany()
    }
}

export const profilesRelatedQueries = {
    profile: ProfileQuery,
    profiles: ProfilesQuery
}