import { Router } from 'express'
import { deliveryAddressFactory } from '../../../../../main/factories/address/deliveryAddress'
import { httpAdapter } from '../../adapters/httpAdapter'

const deliveryAddressRoutes = Router()

const deliveryAddress = deliveryAddressFactory()

deliveryAddressRoutes.post('/address', httpAdapter(deliveryAddress))

export { deliveryAddressRoutes }
