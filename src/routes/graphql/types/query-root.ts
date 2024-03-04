import {GraphQLObjectType} from "graphql";
import {usersRelatedQueries} from "./user/queries.js";
import {profilesRelatedQueries} from "./profile/queries.js";
import {postsRelatedQueries} from "./post/queries.js";
import {memberTypesRelatedQueries} from "./member-type/queries.js";

export const queryRootType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ...usersRelatedQueries,
        ...postsRelatedQueries,
        ...memberTypesRelatedQueries,
        ...profilesRelatedQueries
    })
})