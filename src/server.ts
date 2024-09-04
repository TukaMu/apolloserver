import 'reflect-metadata';
import 'tsconfig-paths/register';

import path from 'node:path'
import _ from 'lodash'

import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { AllUserType } from '@/dtos/enums/user-type'
import resolvers from '@/resolvers';
import token from '@/libs/token';

const regex = /^\s*(\w+)\s*\((.*)\)\s*{\s*$/gm;

async function context({ req }: any) {
    const queryString = req.body.query || ''
    const authHeader = req.headers.authorization || '';
    const tokenData = authHeader.replace('Bearer ', '');
    const matchEndPoint = regex.exec(queryString);
    let endPoint = 'endPoint';

    if (matchEndPoint) {
        endPoint = matchEndPoint[1]
    }

    if (_.isEmpty(tokenData)) {
        return {
            user: {
                name: AllUserType.open,
                login: AllUserType.open,
                type: [AllUserType.open],
            },
            endPoint
        }
    }

    const user = await token.validate({ token: tokenData });

    return { user, endPoint };
}

async function main() {
    const schema = await buildSchema({
        resolvers: _.map(resolvers, (value) => value) as any,
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    })

    const server = new ApolloServer({
        context,
        schema
    });

    const { url } = await server.listen();

    console.log(`HTTP on - ${url}`);
}

main();