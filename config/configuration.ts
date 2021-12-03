export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host:
      process.env.NODE_ENV !== 'PRODUCTION'
        ? process.env.DATABASE_HOST
        : process.env.DATABASE_HOST_DEV,
  },
  shutdown_stop: process.env.SHUTDOWN_STOP || 30,
  attemtps_to_retry: process.env.ATTEMPTS_TO_RETRY || 5,
  jwt_secret: process.env.JWT_SECRET,
});
