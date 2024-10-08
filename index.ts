import express, { Express } from 'express'

import dotenv from "dotenv"
dotenv.config()

import path from "path"

import bodyParser from 'body-parser'

import * as database from "./config/database"

import clientRoutes from './routes/client/index.route'

import adminRoutes from './routes/admin/index.route'
import { systemConfig } from './config/config'


database.connect()

const app: Express = express()
const port: number | string = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"))

app.set("views", "./views")
app.set("view engine", "pug")

// TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
  );
  // End TinyMCE

// App local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Admin Routes
adminRoutes(app)

// Client Routes
clientRoutes(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
