const express = require("express")
const {router} = require('./routes/tasks')


const server = express()
server.use(express.json())

server.get('/health' ,(req, res) => {
    res.json({
        message: "lal de lal"
    })
})

server.use('/', router)


const port = 5000
server.listen(port, () =>{
    console.log(`Rodando na porta: ${port}`)
})

