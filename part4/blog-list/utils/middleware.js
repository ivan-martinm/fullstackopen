const logger = require('./logger')

const customLogger = (request, response, next) => {
  const timestamp = new Date().toTimeString().split(' ')[0]
  const log = `${timestamp} - ${request.method} - ${request.path} ${request.method === 'POST' ? JSON.stringify(request.body) : ''}`
  logger.info('--------\n', log)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted' })
  }
  next(error)
}

module.exports = { customLogger, unknownEndpoint, errorHandler }