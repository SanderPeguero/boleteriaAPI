import { getInstanceEvent } from '../Models/Event.js'

import { ConnectionStart } from '../DAL/Connection.js'

let Connection = ConnectionStart()
let SqlQuery = "SELECT Id, Name, Date, Image, TotalTickets, TicketsSold, VIPTickets, VIPTicketsPrice, RegularTickets, RegularTicketsPrice, SpecialGuestTickets, SpecialGuestTicketsPrice, GuestTickets FROM events "

export function saveEvent(req, res){
    const EventModel = getInstanceEvent(req.body)

    if(EventModel.Id == null || EventModel.Id == 0){
        insertEvent(EventModel, res)
    }else{
        updateEvent(EventModel, res)
    }
}

function insertEvent(EventModel, res){

    const values = [
        EventModel.Name,
        EventModel.Date,
        EventModel.Image,
        EventModel.TotalTickets,
        EventModel.TicketsSold,
        EventModel.VIPTickets,
        EventModel.VIPTicketsPrice,
        EventModel.RegularTickets,
        EventModel.RegularTicketsPrice,
        EventModel.SpecialGuestTickets,
        EventModel.SpecialGuestTicketsPrice,
        EventModel.GuestTickets
    ]

    const success = {
        Executed: false
    }

    Connection = ConnectionStart()
    
    Connection.query("INSERT INTO events (Name, Date, Image, TotalTickets, TicketsSold, VIPTickets, VIPTicketsPrice, RegularTickets, RegularTicketsPrice, SpecialGuestTickets, SpecialGuestTicketsPrice, GuestTickets ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", values, (err, result) => {
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

function updateEvent(EventModel, res){

    const values = [
        EventModel.Name,
        EventModel.Date,
        EventModel.Image,
        EventModel.TotalTickets,
        EventModel.TicketsSold,
        EventModel.VIPTickets,
        EventModel.VIPTicketsPrice,
        EventModel.RegularTickets,
        EventModel.RegularTicketsPrice,
        EventModel.SpecialGuestTickets,
        EventModel.SpecialGuestTicketsPrice,
        EventModel.GuestTickets,
        EventModel.Id
    ]

    const success = {
        Executed: false
    }

    Connection = ConnectionStart()

    // Connection.query(SqlQuery + " WHERE Id=?", EventModel.Id, (err, result) => {
    //     if (!err) {
    //         if (result.length > 0) {
                // if (result[0].Email == userModel.Email) {

                    // Connection = ConnectionStart()
                    console.log({EventModel})
                    Connection.query(" UPDATE events SET Name=?, Date=?, Image=?, TotalTickets=?, TicketsSold=?, VIPTickets=?, VIPTicketsPrice=?, RegularTickets=?, RegularTicketsPrice=?, SpecialGuestTickets=?, SpecialGuestTicketsPrice=?, GuestTickets=?  WHERE Id=? ", values, (err, result) => {
                        if(!err){
                            success.Executed = (result.affectedRows > 0)
                            Connection.destroy()
                            res.json(success)
                        }else{
                            success.Executed = false
                            Connection.destroy()
                            console.log(err)
                            res.status(500).json(success)
                        }
                    })

                // } else {
                //     Connection = ConnectionStart()
                //     Connection.query(SqlQuery + " WHERE Email = ?", userModel.Email, (err, result) => {
                //         if (!err) {
                //             if (result.length > 0) {
                //                 success.ValidEmail = false
                //             }
                //             Connection.destroy()
                //             res.json(success)
                //         } else {
                //             Connection.destroy()
                //             console.log(err)
                //             res.status(500).json(success)
                //         }
                //     })
                // }
            // }
    //     } else {
    //         Connection.destroy()
    //         console.log(err)
    //         res.status(500).json(success)
    //     }
    // })

    
}

export function listEvents(req, res){

    Connection = ConnectionStart()

    Connection.query(SqlQuery, (err, result) => {

        let data = []

        if(!err){
            for(let i=0; i<result.length; i++){
                let fila = result[i]
                data.push(Object.assign({}, getInstanceEvent(fila)))
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

export function findEvent(req,res){

    const { id } = req.params
    const values = [id]

    Connection = ConnectionStart()

    Connection.query(SqlQuery + " WHERE Id=? ", values, (err, result) => {
        Connection.destroy()
        res.json(getInstanceEvent(result[0]))
    })
}

export function deleteEvent(req, res){

    const { id } = req.params
    console.log(id)
    const values = [id]

    const success = {
        Executed: false
    }

    Connection = ConnectionStart()

    Connection.query("DELETE FROM events WHERE Id=? ", values, (err, result)=>{
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