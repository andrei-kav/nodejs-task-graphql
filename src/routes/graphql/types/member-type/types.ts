import {GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType} from "graphql";
import {MemberTypeId} from "../../../member-types/schemas.js";

export const MemberTypeIdGQLEnum = new GraphQLEnumType({
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