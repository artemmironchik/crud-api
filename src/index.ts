import "dotenv/config"
import http from 'node:http'

import { routes } from "./routes"

const PORT = process.env.PORT || '5000'
const mode = process.env.NODE_ENV

const server = http.createServer((req, res) => {
  routes(req, res)
})

server.listen(PORT, () => {
  console.log(`API Server is listening on ${PORT} port in ${mode} mode`)
})
