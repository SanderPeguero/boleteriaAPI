import mysql from 'mysql'

let ConnectionData = {
    host: 'us-cdbr-east-06.cleardb.net',
	user: 'b49b68378d148c',
	password: '90f3b5e2',
	database: 'heroku_02fbc9e78140c23'
}


let Connection = mysql.createConnection({
    host: ConnectionData.host,
    user: ConnectionData.user,
    password: ConnectionData.password,
    database: ConnectionData.database
})


function ConnectionStart(){
    try{
        Connection.destroy()
        Connection = mysql.createConnection({
            host: ConnectionData.host,
            user: ConnectionData.user,
            password: ConnectionData.password,
            database: ConnectionData.database
        })

        return Connection

    }catch(err){

        console.log("Restarting Connection..." + err)
        Connection.on("error", ConnectionStart())

    }
}

export { Connection, ConnectionStart }