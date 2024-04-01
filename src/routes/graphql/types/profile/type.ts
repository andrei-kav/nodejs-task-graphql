import {UUIDType} from "../uuid.js";
import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString
} from "graphql";
import {UserType} from "../user/type.js";
import {MemberType} from "../member-type/types.js";

/**
 * types
 */
export const ProfileType = new GraphQLObjectType({
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

