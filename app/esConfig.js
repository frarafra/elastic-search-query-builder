const { Client } = require('@elastic/elasticsearch');
const config = require('./config');

const client = new Client({
  cloud: {
    id: 'elastic-demo:ZXUtY2VudHJhbC0xLmF3cy5jbG91ZC5lcy5pbyRhOTcxZGE4ODVlNWU0MzVjODhhNDBjNzA5YzE0NDVkOSRlOWNjMDllZjdmNDk0YmIwOTlhM2FhN2Q3MThkNGEwNw==',
  },
  auth: {
    username: config.es_user,
    password: config.es_pass
  }
}) 

module.exports = client;