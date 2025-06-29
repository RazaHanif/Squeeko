import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const config = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Cloud Storage -- idk if i need this yet
    // Will need to rename
    cloudStorage: {
        bucketName: process.env.CLOUD_STORAGE_BUCKET_NAME,
        region: process.env.CLOUD_STORAGE_REGION,
        accessKeyId: process.env.CLOUD_STORAGE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUD_STORAGE_SECRET_ACCESS_KEY,
        endpoint: process.env.CLOUD_STORAGE_ENDPOINT,
    },

}

if (!config.DATABASE_URL) {
    console.error('FATAL ERROR: DATABASE_URL is not defined!')
    process.exit(1)
}

if (!config.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined!')
    process.exit(1)
}

export default config