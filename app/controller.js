const Services = require('./services');

module.exports = {
  async fetchMatchMultipleQuery(req,res) {
    const origin = req.query.Origin;
    const name = req.query.Name;
    const weight = req.query.Weight_in_lbs;
    try {
      const result = await Services.fetchMatchMultipleQuery(origin, name, weight);
      const data = result.body.hits.hits.map((car) => {
        return {
          id: car._id,
          data: car._source
        }
      })
      res.json({
        status_code: 200,
        success: true,
        data: data,
        messsage: "fetch match query for multiple requests successful!"
      });
    } catch (err) {
      res.json({ status_code: 500, success: false, data: [], message: err });
    }
  }
}