/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client';
import { isNil } from 'lodash';
import paginateExt from 'prisma-paginate';

const prismaClientSingleton = () => {
    return new PrismaClient().$extends(paginateExt);
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = !isNil(globalThis.prismaGlobal) ? globalThis.prismaGlobal : prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
