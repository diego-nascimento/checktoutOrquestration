import { Router } from 'express'
import { checkoutObjectStartFactory } from '../../../../../main/factories/checkoutObject/start'
import { httpAdapter } from '../../adapters/httpAdapter'

const checkoutRoutes = Router()

const checkoutObjectStart = checkoutObjectStartFactory()

checkoutRoutes.post('/checkout', httpAdapter(checkoutObjectStart))

export { checkoutRoutes }
