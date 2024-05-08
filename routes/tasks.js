const express = require("express");
const router = express.Router()
const {prisma} = require("../db/prisma")

// let tasks = [
//     {
//         id: 1,
//         name: "Passear no lago",
//         description: "Ir no lago passear",
//         isDone: false
//     },
//     {
//         id: 2,
//         name: "Estudar",
//         description: "Estudar javascript",
//         isDone: false
//     },
//     {
//         id: 3,
//         name: "Trabalhar",
//         description: "ir para o trabalho",
//         isDone: false
//     }
// ]

router.get('/tasks', async (req, res) => {
    const tasks = await prisma.tasks.findMany({
        where: {
            id: req.query.id ? Number(req.query.id) : undefined
        }
    })
    res.json(tasks)
})

router.post('/tasks', async (req, res) => {
    const data = req.body
    const task = await prisma.tasks.create({
        data: {
            name: data.name,
            description: data.description
        }
    })

    res.status(201).json(task)
})

router.put('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id)
    const {name, description, isDone} = req.body
    const task = await prisma.tasks.update({
        data: {
            name,
            description
        },
        where: {
            id
        }
    })
    if(!task) return res.json({message: "Não tem essa task carai"})
    res.json(task)
})

router.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    const task = tasks.find((task) => task.id === id)
    if(!task) return res.json({message: "Não tem essa task carai"})
    tasks = tasks.filter((task) => task.id !== id)
    res.json({message: `Task com o id: ${id} deletada`})
})






module.exports = {
    router
}