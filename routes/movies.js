// jshint asi:true

const router = require('express').Router()
const queries = require('../database/queries')

router.route('/')
  .get((req, res) => {
    queries.list().then( result => res.json(result))
  })

  .post((req, res) => {
    queries.create(req.body).then( result => res.json(result))
  })

router.route('/:id')
  .get((req, res) => {
    queries.listSingle(req.params.id).then(
      result => res.json(result)
    )
  })

  .put((req, res) => {
    queries.update(req.body, req.params.id).then(
      result => res.json(result)
    )
  })

  .delete((req, res) => {
    queries.deleteRecord(req.params.id).then(
      result => res.json(result)
    )
  })

module.exports = router