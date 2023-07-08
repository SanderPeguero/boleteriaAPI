
const EventModel = {
    Id: 0,
    Name: "",
    Date: "",
    Image: "",
    TotalTickets: 0,
    TicketsSold: 0,
    VIPTickets: 0,
    VIPTicketsPrice: 0,
    RegularTickets: 0,
    RegularTicketsPrice: 0,
    SpecialGuestTickets: 0,
    SpecialGuestTicketsPrice: 0,
    GuestTickets: 0,
}

export function getInstanceEvent(row = null){
    if(row == null){
        return EventModel
    }

    EventModel.Id = row.Id || 0
    EventModel.Name = row.Name || ""
    EventModel.Date = row.Date || ""
    EventModel.Image = row.Image || ""
    EventModel.TotalTickets = row.TotalTickets || 0
    EventModel.TicketsSold = row.TiketsSold || 0
    EventModel.VIPTickets = row.VIPTickets || 0
    EventModel.VIPTicketsPrice = row.VIPTicketsPrice || 0
    EventModel.RegularTickets = row.RegularTickets || 0
    EventModel.RegularTicketsPrice = row.RegularTicketsPrice || 0
    EventModel.SpecialGuestTickets = row.SpecialGuestTickets || 0
    EventModel.SpecialGuestTicketsPrice = row.SpecialGuestTicketsPrice || 0
    EventModel.GuestTickets = row.GuestTickets || 0

    return EventModel
    
}

export default EventModel