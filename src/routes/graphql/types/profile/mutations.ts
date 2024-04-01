import {GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLString} from "graphql";
import {UUIDType} from "../uuid.js";
import {ProfileType} from "./type.js";

const CreateProfileInput = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: () => ({
        userId: { type: UUIDType },
        memberTypeId: { type: GraphQLString },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt }
    })
})

const ChangeProfileInput = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: () => ({
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt }
    })
})

const CreateProfile = {
    type: ProfileType,
    args: { dto: { type: CreateProfileInput } },
    async resolve(source, args, context) {
        return context.prisma.profile.create({ data: args.dto })
    }
}

const DeleteProfile = {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    async resolve(source, args, context) {
        try {
            await context.prisma.profile.delete({ where: { id: args.id } })
            return true
        } catch (e) {
            return false
        }
    }
}

const ChangeProfile = {
    type: ProfileType,
    args: {
        id: { type: UUIDType },
        dto: { type: ChangeProfileInput }
    },
    async resolve(source, args, context) {
        return context.prisma.profile.update({ where: { id: args.id }, data: args.dto })
    }
}

export const profilesRelatedMutations = {
    createProfile: CreateProfile,
    deleteProfile: DeleteProfile,
    changeProfile: ChangeProfile
}