import {GraphQLObjectType} from "graphql";
import {usersRelatedQueries} from "./user.js";
import {postsRelatedQueries} from "./post.js";
import {memberTypesRelatedQueries} from "./member-type.js";
import {profilesRelatedQueries} from "./profile.js";

export const queryRootType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...usersRelatedQueries,
        ...postsRelatedQueries,
        ...memberTypesRelatedQueries,
        ...profilesRelatedQueries
    }
})