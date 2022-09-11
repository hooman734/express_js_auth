const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = class SqliteDb {

    static async save(table, data) {
        return await prisma[`${table}`].create({ data });
    }

    static async retrievAll(table) {
        return await prisma[`${table}`].findMany();
    }

    static async retrieveById(table, id) {
        return await prisma[`${table}`].findMany({
            where: { id }
        });
    }
}