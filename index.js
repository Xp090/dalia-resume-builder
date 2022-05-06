const app = require("./app");
const serverPort = process.env.PORT || 7000
const dbUtils = require("./utils/db.utils")

app.listen(serverPort, async (error) => {
    if (error) console.error('Error starting', error)
    else console.log(`Started at http://localhost:${serverPort}`)
    try {
        await dbUtils.connect()
    } catch (e) {
        console.error('Error connecting to db', e)
    }
})
