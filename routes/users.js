import express from 'express'
import fs from 'fs'
import path from 'path'
const router = express.Router()

let usersPath = path.join(path.resolve(), '/assets/user.json')

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


router.get('/', (req, res) => {
    initializeUsers(usersPath)
    console.log(users)
    res.send(users)
})


router.post('/', (req, res) => {
    const user = req.body

    users.push(user)
    fs.writeFileSync(usersPath, JSON.stringify(users))

    res.send(`${user.firstName} ${user.lastName} (${user.age}) added!`)
})

export default router