const Product = require('../models/product');

const getBalance = async (req, res, next) => {
  var request = require('request');
  const options = {
    method: 'POST',
    url: 'http://localhost:8545',
    headers: {},
    body: '{\n    "jsonrpc": "2.0",\n    "method": "eth_getBalance",\n    "params": [\n        "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",\n        "latest"\n    ],\n    "id": 1\n}',
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};
const sendEther = async (req, res, next) => {};

const getAllProductsStatic = async (_req, res, _next) => {
  // const search = 'ab';
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res, _next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`,
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  // select
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getBalance,
  sendEther,
};
