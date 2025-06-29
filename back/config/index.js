import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: parseInt(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    jwtSecret: process.env.JWT_SECRET,

    // Cloud Storage
    cloudStorage: {
        bucketName: process.env.CLOUD_STORAGE_BUCKET_NAME,
        region: process.env.CLOUD_STORAGE_REGION,
        accessKeyId: process.env.CLOUD_STORAGE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUD_STORAGE_SECRET_ACCESS_KEY,
        endpoint: process.env.CLOUD_STORAGE_ENDPOINT,
    },

}

if (!config.databaseUrl) {
    console.error('FATAL ERROR: DATABASE_URL is not defined!')
    process.exit(1)
}

export default config