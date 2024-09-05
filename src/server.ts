import 'reflect-metadata';
import 'tsconfig-paths/register';

import path from 'node:path';
import _ from 'lodash';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { AllUserType } from '@/dtos/enums/user-type';
import resolvers from '@/resolvers';
import { mongodb, token, loaders } from '@/libs';
import { FetchUsersUC } from '@/useCases/user';

class Server {
    private regex = /^\s*(\w+)\s*\((.*)\)\s*{\s*$/gm;

    private FetchUsers: FetchUsersUC;
    private UserLoaderById: ReturnType<typeof loaders.createUserLoaderById>;
    private MongoDB: typeof mongodb

    constructor() {
        this.MongoDB = mongodb
        this.FetchUsers = new FetchUsersUC(this.MongoDB)
        this.UserLoaderById = loaders.createUserLoaderById(this.FetchUsers)
    }

    async context({ req }: any) {
        const queryString = req.body.query || '';
        const authHeader = req.headers.authorization || '';
        const tokenData = authHeader.replace('Bearer ', '');
        const matchEndPoint = this.regex.exec(queryString);
        let endPoint = 'endPoint';

        if (matchEndPoint) {
            endPoint = matchEndPoint[1];
        }

        if (_.isEmpty(tokenData)) {
            return {
                user: {
                    name: AllUserType.open,
                    login: AllUserType.open,
                    type: [AllUserType.open],
                },
                endPoint,
                loaders: { userLoader: this.UserLoaderById }
            };
        }

        const user = await token.validate({ token: tokenData });

        return {
            user,
            endPoint,
            loaders: { userLoader: this.UserLoaderById }
        };
    }

    public async run() {
        const schema = await buildSchema({
            resolvers: _.map(resolvers, (value) => value) as any,
            emitSchemaFile: path.resolve(__dirname, 'schema.gql')
        });

        const server = new ApolloServer({
            context: this.context.bind(this),
            schema
        });

        const { url } = await server.listen();

        console.log(`HTTP on - ${url}`);
    }
}

new Server().run();