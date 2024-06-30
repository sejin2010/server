const express = require('express');
const cors = require('cors');
const app = express();
const ytdl = require('ytdl-core');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('server running port 5000')
});

let url = null;

app.get('/download', async (req, res) => {

    if (url) {
        const videoID = await ytdl.getURLVideoID(url);
        const metaInfo = await ytdl.getInfo(url);
        let data = {
            url: 'https://www.youtube.com/embed/' + videoID,
            info: metaInfo.formats
        };
        res.json(data);
    }
    else {
        const error = { code: 404, message: 'Invalid URL' };
        res.json(error);
    }

    
});

app.post('/download', (req, res) => {
    const getUrl = req.body.url;
    url = getUrl;
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});