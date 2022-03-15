
import express, {json} from "express"
import cors from "cors"
import router from "./routes/index.js"
import config from "./config.js";

const app = express()

app.use(cors())
app.use(json())
app.use(router)

app.listen(config.port, ()=>{
    console.log(`Server listening on PORT ${config.port}`)
}) 