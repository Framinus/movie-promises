#!/usr/bin/env node

const cheerio = require('cheerio');
const rp = require('request-promise');

const searchTerm = process.argv[2];

const searchIMDB = rp(`http://www.imdb.com/find?q=${searchTerm}&s=tt&ttype=ft&ref_=fn_ft`)
  .then(function (html) {
    parseData(html);
  })
  .catch(function (err) {
    throw new Error('Data request failed');
  });


const parseData = function (data) {
  const $ = cheerio.load(data);
  const titleArray = [];
  const titles = $('.findList')
    .first()
    .find('.result_text')
    .map((index, element) => $(element).text())
    .toArray();

  for (let i = 0; i < titles.length; i += 1) {
    titleArray.push(titles[i]);
    console.log(titles[i]);
  }
  return titleArray;
};

module.exports = { searchIMDB, parseData };
