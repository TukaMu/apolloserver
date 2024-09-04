import { mongodb, permissions, hash, token } from '@/libs';

export abstract class BaseResolver {
    protected MongoDB: typeof mongodb;
    protected PermissionsLib: typeof permissions;
    protected HashLib: typeof hash;
    protected TokenLib: typeof token;

    constructor() {
        this.MongoDB = mongodb;
        this.PermissionsLib = permissions;
        this.HashLib = hash;
        this.TokenLib = token;
    }
}