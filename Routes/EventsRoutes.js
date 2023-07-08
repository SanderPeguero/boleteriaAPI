import express from 'express'
import { saveEvent, listEvents, findEvent, deleteEvent } from '../BLL/Events.js'

const router = express.Router()

router.get('/', listEvents)
router.get('/:id', findEvent)
router.post('/', saveEvent)
router.delete('/:id', deleteEvent)

export default router