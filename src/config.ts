import { DatabaseConfig} from './types';

interface AuthApiConfig {
    domainUrl: string;
    serverPort: number;
    database: DatabaseConfig; 
}

const config: AuthApiConfig = {
    domainUrl: process.env.DOMAIN_URL || 'localhost',
    serverPort: Number(process.env.SERVER_PORT) || 9001,
    database: {
        dbType: process.env.DB_TYPE || 'mongodb',
        dbPort: process.env.DB_PORT || 27017,
        host: process.env.DB_HOST || 'localhost:27017',
        username: process.env.DB_USER || 'admin', 
        password: process.env.DB_PASSWORD || '87654321',
        dbName: process.env.DB_NAME || 'testProject',
    }
};


export default config;
