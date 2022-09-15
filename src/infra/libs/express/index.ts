import express, { Express } from 'express'
import { handleBadJson } from './midwares/handleBadJson'

import { checkoutRoutes } from './routes/checkout'
import { deliveryAddressRoutes } from './routes/deliveryAddress'

const routes = [checkoutRoutes, deliveryAddressRoutes]
export class Server {
  server: Express

  constructor () {
    this.server = express()
    this.midwares()
    this.routes()
  }

  private midwares () {
    this.server.use(express.json())
    this.server.use(handleBadJson)
  }

  private routes () {
    this.server.use(routes)
  }

  init (port: number) {
    this.server.listen(port, () => console.log(`Server running on port ${port}`))
  }
}
