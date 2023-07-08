import { getInstanceSale } from '../Models/Sale.js'
import { getInstanceEvent } from '../Models/Event.js'
import { ConnectionStart } from '../DAL/Connection.js'
import { saveEvent } from '../BLL/Events.js'
import EventModel from '../Models/Event.js'


let Connection = ConnectionStart()
let SqlQuery = "SELECT Id, Name, Event, Date, Seats FROM sales "

export function saveSale(req, res){
    const SaleModel = getInstanceSale(req.body)
    
    const { id } = req.params
    const values = [id]

    Connection = ConnectionStart()

    Connection.query("SELECT Id, Name, Date, Seats FROM events " + " WHERE Id=? ", values, (err, result) => {
        
        Connection.destroy()
        let Event = getInstanceEvent(result[0])
        res.json(getInstanceEvent(result[0]))

        const SeatsAvailable = result[0].Seats
        console.log(SeatsAvailable)
        
        if(SeatsAvailable > 0 && SaleModel.Seats < SeatsAvailable){
            Event.Seats = Event.Seats - SaleModel.Seats
            saveEvent(Event)
            if(SaleModel.Id == null || SaleModel.Id == 0){
                insertSale(SaleModel,EventModel, res)
            }else{
                updateSale(SaleModel, res)
            }

        }

        
    })


}

function insertSale(SaleModel, EventModel, res) {

    const date = new Date().toDateString()
    const values = [
        SaleModel.Name,
        EventModel.Name,
        date,
        SaleModel.Seats
    ]

    const success = {
        Executed: false
    }

    Connection = ConnectionStart()

    Connection.query("INSERT INTO sales (Name, Event, Date, Seats) VALUES (?,?,?,?)", values, (err, result) => {
        if(!err){
            success.Executed = true
            Connection.destroy()
            res.json(success)
        }else{
            success.Executed = true
            Connection.destroy()
            console.log(err)
            res.status(500).json(success)
        }

    })
}

function updateSale(SaleModel, res){

    const values = [
        SaleModel.Id,
        SaleModel.Name,
        SaleModel.Event,
        SaleModel.Date,
        SaleModel.Seats,
    ]

    const success = {
        Executed: false
    }

    Connection = ConnectionStart()

    Connection.query("UPDATE sales SET Name=?, Event=?, Date=?, Seats=? WHERE Id=?", values, (err, result) => {
        if(!err){
            success.Executed = true
            Connection.destroy()
            res.json(success)
        }else{
            success.Executed = false
            Connection.destroy()
            console.log(err)
            res.status(500).json(success)
        }
    })
}

export function listSales(req, res){

    Connection = ConnectionStart()

    Connection.query(SqlQuery, (err, result) => {

        let data = []

        if(!err){
            for(let i=0; i<result.length; i++){
                let fila = result[i]
                data.push(Object.assign({}, getInstanceSale(fila)))
            }
            Connection.destroy()
            res.json(data)
        }else{
            Connection.destroy()
            console.log(err)
            res.status(500).json(data)
        }
    })
}

export function findSale(req,res){

    const { id } = req.params
    const values = [id, 1]

    Connection = ConnectionStart()

    Connection.query(SqlQuery + " WHERE Id=? ", values, (err, result) => {
        Connection.destroy()
        res.json(getInstanceSale(result[0]))
    })
}

export function deleteSale(req, res){

    const { id } = req.params
    const values = [id]

    const success = {
        Executed: false
    }

    Connection = ConnectionStart()

    Connection.query("DELETE FROM sales WHERE Id=? ", values, (err, result)=>{
        if(!err){
            success.Executed = true
            Connection.destroy()
            res.json(success)
        }else{
            success.Executed = false
            Connection.destroy()
            console.log(err)
            res.status(500).json(success)
        }
    })

}