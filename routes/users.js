import express from 'express'
import fs from 'fs'
import path from 'path'
const router = express.Router()
import {v4 as uuidv4} from 'uuid'


let usersPath = path.join(path.resolve(), '/assets/users.json')

let users = []

let initializeUsers = () => {
        fs.readFile(usersPath, 'utf8', (err, data) => {
            if(err){
                console.log('File not found!')
            }else{
                users = JSON.parse(data)
            }
        });
}
initializeUsers(usersPath)

//get all user
router.get('/', (req, res) => {
    initializeUsers(usersPath)
    console.log(users)
    res.send(users)
})

//add new user
router.post('/', (req, res) => {
    const user = req.body

    users.push({ ...user, id : uuidv4() })
    fs.writeFileSync(usersPath, JSON.stringify(users))

    res.send(`${user.firstName} ${user.lastName} (${user.age}) added!`)
})


// get a specific user
router.get('/:id', (req, res) => {
    const {id} = req.params

    const foundUser = users.find((user) => user.id === id)

    if(foundUser == null){
        res.send({"message":"No user found"})
        return 0;
    }
    res.send(foundUser)
})

// delete a specific user
router.delete('/:id', (req, res) => {
    const {id} = req.params
    users = users.filter((user) => user.id !== id)
    fs.writeFileSync(usersPath, JSON.stringify(users))
    res.send(`User with the id [${id}] DELETED!`)
})


// update specific user

router.patch('/:id', (req, res) => {
    const {id} = req.params
    const {firstName, lastName, age} = req.body

    const user = users.find((user) => user.id === id)

    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(age) user.age = age

    fs.writeFileSync(usersPath, JSON.stringify(users))
    res.send(`User [id=${id}] UPDATED!`)
})

export default router