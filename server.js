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
    uptime: process.uptime()
  })
})

app.get('/osinfo',(req,res)=>{
  res.json(getOsInfo());
})

app.get('/env',(req,res)=>{
  res.json(process.env);
})

// Ready 
app.get('/ready',(req,res)=>{
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

// Caos
app.get('/caos',(req,res)=>{
  res.json({
    message: "ok"
  })
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

//

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})