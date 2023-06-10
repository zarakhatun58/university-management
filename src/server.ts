import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})
let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`if connected successfully`)

    server = app.listen(config.port, () => {
      logger.info(`app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(`failed to connect`, err)
  }
  process.on('unhandledRejection', error => {
    // console.log('Unhaled deceted')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
      })
    } else {
      process.exit(1)
    }
  })
}
main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
