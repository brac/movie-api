# [RESTful Movie API example](https://www.sitepoint.com/creating-restful-apis-express-4/)
### An example project using Express and PG

#### The following is a series of notes on the creation and functioning of this simple example project

We start by initalizing an npm package and installing ```body-parser```, ```expresss``` and ```pg```.

We configure our database that we will be working with. First we add a script to our ```package.json``` file that will rest the database.:
```json
  "db:reset" : "dropdb movie_api && createdb movie_api && psql movie_api < ./database/movie-schema.sql && psql movie_api < database/movie-fixtures.sql",
```
Note that we now have to create two files; our schema for our table and some initial fixtures.

The shcema is straight forward, simply describing the various values that each movie record will have.

Our movie fixtures file, ```./database/movie-fixtures.sql``` is just a sql script that we can run with ```psql databaseName < scriptFile.sql```. Book, instant mock data.

We could have created a test database, but eh....

We also changed our ```package.json``` to have this: ```"main": "app.js",```. This will allow us to use ```nodemon start``` and the app will just start up.

Now according to the tutorial were suppose to build the routes first, then the app and 'bootstrapping' but that didn't give me any oportunity to test things as I went along. So instaed I created the app and got something working first. Under ```app.js```:

In this file we require express, body-parser, the routes for our movie api (to be written) and instantiate an express app.

We also configure the basic body-parser settings:
```javascript
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
```
Next up we register our routes, and turn on the app:
```javascript
app.use('/api/movies', movieApi)

app.use('/', (req, res) => {
  res.json({ message: 'Welcome!'})
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})
```

Ok so this way our app is nice any tiny. Heading into ```movies.js``` we start to plan how our routes will access the database.

Of note, we use ```router.route``` a number of times. This makes for better organization, esp if you plan on having different methods apply to the same routes. Since we are using pg we know that our queries (to be written) will return promises, so we chain our ```res.json()``` call on the end of those queries, ensuring that things run asynchronsly.

Let's take a look at our ```queries.js```
This is the longest file and it does the most things. We could probably refactor this to multiple command files, or better perhaps some helper functions, but I do not initally see any glaring repetitions.

Of note we are importing a client that is already connected, so if we have to do any changes to the connection, we can do it in ```client.js```

Our ```list()``` call just returns all records in the database. Note how we are passing the success and fail callback to that promise. Jared recommends this way.

Creating a new record with ```create()``` is pretty straight forward, as is ```deleteRecord()``` and ```listSingle()```. The other one is a little tricky

```update()``` required me to figure out how to update an unknown number of properties with unknown keys. To solve this I took the req body object, got an array of keys with ```Object.keys()```, and then ```.map()``` that array. I passed a callback to that mapping that called ```client.query()```, which i know to be a promise. So now the app would fire a bunch of queries and once they all returned successful, our original ```Promise.all``` would resovle. This was followed by the standard success/fail callbacks.

This was tested with Postman and a simple browser. I should also figure out how to use curl to make all these requests...






































