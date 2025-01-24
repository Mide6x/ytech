import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/.env` });

// Get environment variables safely
const getEnvVar = (key, defaultValue = undefined) => {
    // Using globalThis instead of process directly
    const value = globalThis.process?.env?.[key] ?? defaultValue;
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
};

export const config = {
    mongoUrl: getEnvVar('MONGO_URL'),
    port: parseInt(getEnvVar('PORT', '3000')),
    jwtSecret: getEnvVar('JWT_SECRET', 'your-secret-key'),
    jwtExpiresIn: getEnvVar('JWT_EXPIRES_IN', '90d')
}; 