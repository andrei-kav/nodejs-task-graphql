import {GraphQLList} from "graphql";
import {MemberType, MemberTypeIdGQLEnum} from "./types.js";

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