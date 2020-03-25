const model = require('../models')['players']
const { Op } = require('sequelize')

let Players = {}

Players.getAll = async (req, res, next) => {
  let nationality = req.query.nationality;
  let score = req.query.score

  if(typeof nationality !== 'undefined'){
    const data = await model.findAll({}).filter((element) => {
      return element.nationality === nationality;})
      res.status(200).json({
        total: data.length,
        data
    })
  }

  if(typeof score !== 'undefined'){
    const data = await model.findAll({}).filter((element) => {
      return element.score >= score;})
      res.status(200).json({
        total: data.length,
        data
    })
  }
  
  if(typeof score == 'undefined' && typeof nationality == 'undefined'){
    const data = await model.findAll({})
      res.status(200).json({
        total: data.length,
        data
    })
  }

}

Players.getById = async (req, res, next) => {
  const { playerId} = req.params
  const data = await model.findOne({
    where: { id: playerId }
  })
  res.status(200).json(data)
}

Players.create = async (req, res, next) => {
  const result = await model.create(req.body)
  res.status(201).json(result)
}

Players.update = async (req, res, next) => {
  const { playerId } = req.params
  const result = await model.update(req.body, {
    where: { id: playerId }
  })

  res.status(200).json()
}

Players.delete = async (req, res, next) => {
  const { playerId } = req.params
  const result = await model.destroy({
    where: { id: playerId }
  })

  res.status(204).json()
}

module.exports = Players
