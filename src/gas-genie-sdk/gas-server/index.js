const express = require('express')
const cors = require("cors")
const axios = require('axios')

const app = express()
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('./gas'))
app.listen(8000, () => {
    console.log("Listening on port 8000")
})

app.post("/gas", async (req, res) => {
    const payload = req.body;
    const Auth = Buffer.from('2764e348a0d948a3b5ae126db084c18e' + ':' + 'kRfov5LywFbb4Ah2yLEUtx4ngBQXiuN0XM2WpwsyvbMn9YiP0hJKMw').toString("base64")
    // Execute the API request (Promise)
    const options = {
        headers: {
            Authorization: `Basic ${Auth}`,
        }
    }
    const apiResponse = await axios.get(
        `https://gas.api.infura.io/networks/${payload.chainId}/suggestedGasFees`,
        options
    )

    if (apiResponse.error) {
        console.log('err', apiResponse)
        throw Error("Request failed")
    }

    const { data } = apiResponse;
    res.send(data)
})
