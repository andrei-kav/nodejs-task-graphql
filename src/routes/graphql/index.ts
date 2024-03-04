import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {createGqlResponseSchema, gqlResponseSchema, gqlRootSchema} from './schemas.js';
import {graphql, parse, validate} from 'graphql';
import depthLimit from "graphql-depth-limit";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body

      // const queryDocument = parse(query)
      // const errors = validate(gqlRootSchema, queryDocument, [depthLimit(5)])
      // console.log('errors', errors)
      // if (errors.length > 0) {
      //   return { errors };
      // }

      return graphql({
        source: query,
        schema: gqlRootSchema,
        variableValues: variables,
        contextValue: { prisma }
      })
    },
  });
};

export default plugin;
