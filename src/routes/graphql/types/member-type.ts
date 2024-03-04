import {GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType} from "graphql";
import {MemberTypeId} from "../../member-types/schemas.js";

/**
 * types
 */
const MemberTypeIdGQLEnum = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        basic: { value: MemberTypeId.BASIC },
        business: { value: MemberTypeId.BUSINESS }
    }
})

export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
        id: { type: MemberTypeIdGQLEnum },
        discount: { type: GraphQLFloat },
        postsLimitPerMonth: { type: GraphQLInt }
    })
})

/**
 * queries
 */
const MemberTypeQuery = {
    type: MemberType,
    args: { id: { type: MemberTypeIdGQLEnum } },
    async resolve(source, args, context) {
        return context.prisma.memberType.findUnique({ where: { id: args.id } })
    }
}

const MemberTypesQuery = {
    type: new GraphQLList(MemberType),
    async resolve(source, args, context) {
        return context.prisma.memberType.findMany()
    }
}

export const memberTypesRelatedQueries = {
    memberType: MemberTypeQuery,
    memberTypes: MemberTypesQuery
}