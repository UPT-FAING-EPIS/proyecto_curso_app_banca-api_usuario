const isEnvProduction = process.env.NODE_ENV === 'production'

export default isEnvProduction
  ? {
      port: 80,
      db: {
        host: 'db1.c5odpn9hksgv.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'UPT2023*',
        name: 'users',
      },
    }
  : {
      port: 3000,
      db: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'alcbart12',
        name: 'users',
      },
    }
