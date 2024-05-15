/* eslint-disable prettier/prettier */
import { Injectable, Logger } from "@nestjs/common";
import { Pool, createPool, Connection } from "mysql2/promise";

@Injectable()
export class MySQLProvider {
    private readonly logger: Logger
    private readonly pool: Pool
    constructor(){
        this.logger = new Logger('MySQLProvider')
        this.pool = createPool({
            host: 'localhost',
            user: 'root',
            database: 'cat_products',
            password: 'Edu0215',
            waitForConnections: true,
            connectionLimit: 20,
            queueLimit: 0,
        })
    }
    async getConnection(): Promise<Connection> {
        return await this.pool.getConnection()
    }
}