const os = require('os')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 8080

var morgan = require('morgan')
app.use(morgan('combined'))

dotenv.config()

app.get('/', (req, res) => {
  res.json({
    version: process.env.APPVERSION,
    hostname: os.hostname(),
    uptime: os.uptime()
  })
})

app.get('/osinfo', (req, res) => {
  res.json(getOsInfo());
})

app.get('/env', (req, res) => {
  res.json(process.env);
})

// Ready 
app.get('/ready', (req, res) => {
  let uptime = process.uptime()
  if (uptime < 30) {
    res.status(404).json({
      version: process.env.APPVERSION,
      uptime: process.uptime()
    })
  } else {
    res.json({
      version: process.env.APPVERSION,
      uptime: process.uptime()
    })
  }
})

// 
app.get('/kill', (req, res) => {
  console.log("Killing server");
  process.exit(1);
})

// memory hog
app.get('/cpuhog', (req, res) => {
  while (true) {}
})

// memory hog
const requests = new Map();
app.get('/memhog', (req, res) => {  
  requests.set(req.id, req);
  memusage = process.memoryUsage();
  res.json({
    rss: memusage.rss,
    heapTotal: memusage.heapTotal,
    heapUsed: memusage.heapUsed,
    external: memusage.external,
    arrayBuffers: memusage.arrayBuffers
  })
})

app.get('/isprime', (req, res) => {
  let number = req.query.number;
  if (checkPrime(number)) {
    res.json({
      message: number+" is a prime number"
    })
  } else {
    res.json({
      message: number+" is NOT a prime number"
    })
  }
})




// Utility functions
const getOsInfo = () => {
  return {
    uptime: os.uptime(),
    type: os.type(),
    release: os.release(),
    hostname: os.hostname(),
    arch: os.arch(),
    platform: os.platform()
  };
}

const checkPrime = (n) => {
  if (n === 1) {
    return false;
  }
  else if (n === 2) {
    return true;
  } else {
    for (var x = 2; x < n; x++) {
      if (n % x === 0) {
        return false;
      }
    }
    return true;
  }
}

//

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})