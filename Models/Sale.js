const SaleModel = {
    Id: 0,
    Name: "",
    Event: "",
    Date: "",
    Seats: 0
}

export function getInstanceSale(row = null){
    if(row == null){
        return SaleModel
    }

    SaleModel.Id = row.Id || 0
    SaleModel.Name = row.Name || ""
    SaleModel.Event = row.Event || ""
    SaleModel.Date = row.Date || ""
    SaleModel.Seats = row.Seats || 0

    return SaleModel
    
}

export default SaleModel