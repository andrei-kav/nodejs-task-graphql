import {GraphQLObjectType} from "graphql";
import {profilesRelatedMutations} from "./profile/mutations.js";
import {usersRelatedMutations} from "./user/mutations.js";
import {postsRelatedMutations} from "./post/mutations.js";

export const mutationRootType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        ...usersRelatedMutations,
        ...profilesRelatedMutations,
        ...postsRelatedMutations
    })
})