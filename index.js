import express from 'express'
import cors from 'cors'
import EventsRoutes from './Routes/EventsRoutes.js'
import SalesRoutes from './Routes/SalesRoutes.js'

const app = express()

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.use(cors())
app.use(express.json())
app.use('/events', EventsRoutes)
app.use('/sales', SalesRoutes)


