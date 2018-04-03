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
  // TODO: Check for incorrect column names / id
  // TODO: Handle promise rejections better

  return Promise.all(Object.keys(reqBody).map(p => {
    client.query(
      `
        UPDATE
          movies
        SET
          ${p} = '${reqBody[p]}'
        WHERE
          id = ${id}
      `
      )
  })).then(
    () => `Movie record ${id} updated!`,
    error => { throw new Error(`Error encountered during update: ${error}`)}
  )
}

const listSingle = (id) => {
  return client.query(
  `
    SELECT
      *
    FROM
      movies
    WHERE
      id = ${id}
  `
  ).then(
    results => {
      if (results.rows.length == 0) {
        return `No listing at that id: ${id}`
      } else {
        return results.rows}
      },
    error => { throw new Error(`Error encountered during listSingle: ${error}`) }
  )
}

const deleteRecord = (id) => {
  return client.query(
  `
    DELETE FROM
      movies
    WHERE
      id = ${id}
  `
  ).then(
    () => `Deleted record: ${id}`,
    error => { throw new Error(`Error encountered during delete: ${error}`) }
  )
}

module.exports = {
  list,
  create,
  update,
  listSingle,
  deleteRecord
}













