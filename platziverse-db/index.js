'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequalize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequalize.authenticate()

  if (config.setup) {
    await sequalize.sync({ force: true }) // Si la DB existe, bórrela y cree una nueva
  }

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
