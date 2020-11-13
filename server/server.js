const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const upload = multer({ dest: 'uploads'})

app.post('/upload/single', upload.single('single'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file) 
})

app.post('/upload/multiple', upload.array('multiple'), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files) 
})

app.listen(3000, () => {
  console.log('listening on 3000')
})