import {UUIDType} from "./uuid.js";
import {GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import {UserType} from "./user.js";
import {MemberType} from "./member-type.js";

/**
 * types
 */
const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: UUIDType },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        userId: { type: UUIDType },
        memberTypeId: { type: GraphQLString },
        user: {
            type: UserType,
            async resolve(source, args, context) {
                return context.prisma.user.findUnique({ where: { id: source.userId } })
            }
        },
        memberType: {
            type: MemberType,
            async resolve(source, args, context) {
                return context.prisma.memberType.findUnique({ where: { id: source.memberTypeId } })
            }
        }
    })
})

/**
 * queries
 */
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

