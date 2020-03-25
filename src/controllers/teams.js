const teamsModel = require('../models')['teams']
const playersModel = require('../models')['players']

let Teams = {}

Teams.getAll = async (req, res, next) => {
  const data = await teamsModel.findAll()
   
    res.status(200).json({
       total: data.length,
       data
    })
  
}

Teams.getById = async (req, res, next) => {
  const { teamId } = req.params
  const result = await teamsModel.findOne({
    where: { id: teamId }
  })
  const resultPlayers = await playersModel.findAll({
    where: { teamId: teamId }
  })

  res.status(200).json({
    id: result.id,
    name: result.name,
    description: result.description,
    coach: result.coach,
    shieldUrl: result.shieldUrl,
    birthYear: result.birthYear,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    players: result.name
  })
}

Teams.getTeamPlayers = async (req, res, next) => {
  
  const { teamId } = req.params
  const data = await playersModel.findAll({
    where: {
      teamId: teamId
    }
    /*include: {
      model: teamsModel
    }*/
  })
  res.status(200).json({
     total: data.length,
     data
  })
}

Teams.create = async (req, res, next) => {
  const result = await teamsModel.create(req.body)
  res.status(201).json(result)
}

Teams.update = async (req, res, next) => {
  const { teamId } = req.params
  const result = await teamsModel.update(req.body, {
    where: { id: teamId }
  })

  res.status(200).json({})
}

Teams.delete = async (req, res, next) => {
  const { teamId } = req.params
  const result = await teamsModel.destroy({
    where: { id: teamId }
  })

  res.status(204).json({})
}

module.exports = Teams
