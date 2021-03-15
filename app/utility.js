const fs = require('fs');
const client = require('./esConfig');
const config = require('./config');

const data = JSON.parse(fs.readFileSync(__dirname + '/dataToEs.json'));

const index = config.es_index;

async function createCarMapping(client, index) {
  const carSchema = {
    "Acceleration": {
      "type": "long"
    },
    "Cylinders": {
      "type": "long"
    },
    "Displacement": {
      "type": "long"
    },
    "Horsepower": {
      "type": "long"
    },
    "Miles_per_Gallon": {
      "type": "long"
    },
    "Name": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "Origin": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "Weight_in_lbs": {
      "type": "long"
    },
    "Year": {
      "type": "date"
    }
  }
  try {
    const response = await client.indices.putMapping({
      index,
      body: { properties: carSchema }
    })
    console.log("Successfully put mapping", response);
  } catch (error) {
    console.error("Failed to put mapping", error);
    throw new Error(error);;
  }
}

async function writeCarDataToEs(index, data) {
  try {
    for (let i = 0; i < data.length; i++ ) {
      await client.create({
        refresh: true,
        index: index,
        id: i,
        body: data[i]
      });
      console.log("Successfully imported data", data[i]);
    }
  } catch (error) {
    console.error("Failed to import data", error);
    throw new Error(error);;
  }
};

module.exports = {
  async resetIndex() {
    try {
      if (client.indices.exists({ index })) {
        await client.indices.delete({ index });
      }
      await client.indices.create({ index });
      await createCarMapping(client, index);
      await writeCarDataToEs(index, data);
    } catch (error) {
      console.error("Failed to reset index", error);
      return;
    }
  }
};