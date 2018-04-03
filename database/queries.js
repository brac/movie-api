// jshint asi:true
const client = require('./client')

const list = () => {
  return client.query(
    `SELECT * FROM movies ORDER BY id`).then(
      results => results.rows,
      error => { throw new Error(`Error encountered during query: ${error}`)}
    )
}

const create = (reqBody) => {
  const {
    title,
    releaseYear,
    director,
    genre
  } = reqBody

  return client.query(
    `
    INSERT INTO
      movies (title, releaseYear, director, genre)
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      *
    `,
    [title, releaseYear, director, genre]
  ).then (
    results => results.rows,
    error => { throw new Error(`Error encountered during create: ${error}`)}
  )
}

const update = (reqBody, id) => {
  return Promise.resolve(`I will update something, oh and this: ${id}`)
}

module.exports = {
  list,
  create,
  update }