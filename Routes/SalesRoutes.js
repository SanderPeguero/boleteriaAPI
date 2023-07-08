import express from 'express'
import { saveSale, listSales, findSale, deleteSale } from '../BLL/Sales.js'

const router = express.Router()

router.get('/', listSales)
router.get('/:id', findSale)
router.post('/:id', saveSale)
router.delete('/:id', deleteSale)

export default router