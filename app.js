const express = require('express')
const fs = require('fs')
const fetch = require('node-fetch')
const filename = 'data.json'

const coins = ['btc', 'eth', 'neo', 'dash']
const app = express()

app.get('/', async (req, res) => {
  const prices = {}
  
  for (let i=0; i<coins.length; i++) {
    const coin = coins[i]

    const raw = await fetch('https://bittrex.com/api/v1.1/public/getmarketsummary?market=usdt-'+coin)
    const data = await raw.json()
    
    const lastPrice = data.result[0].Last
    console.log(lastPrice)
    prices[coin] = lastPrice
  }
  
  res.json(prices)

  const json = JSON.stringify(prices)
  fs.writeFile(filename, json, 'utf8', (err, data) => {
      if (err) console.log('error writing to tweets json', err)
  })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
