const client = require('./esConfig');
const config = require('./config');

const index = config.es_index;

const esb = require('elastic-builder'); //the builder

module.exports = {
  async fetchMatchMultipleQuery(origin, name, weight){
    const requestBody = esb.requestBodySearch()
      .query(
        esb.boolQuery()
          .must([
            esb.matchQuery(
              'Origin', origin,
            ),
            (
              esb.matchQuery(
                'Name', name,
              )
            ),
          ])
        .filter(esb.rangeQuery('Weight_in_lbs').gte(weight))
      )
      return client.search({ index: index, body: requestBody.toJSON() });
  },
}