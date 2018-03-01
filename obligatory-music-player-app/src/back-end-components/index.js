let express = require('express');

let app = express();

// allow cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const songDatabase = [
    {
        name: 'Say It',
        artist:'Tory Lanez',
        album:'I Told You',
        img: '/img/0.jpg',
        len:'3:58',
        source: '/music/0.mp3',
        id:0
      },
      {
        name: 'Hallucinations',
        artist:'DVSN',
        album:'Sept. 5th',
        img: '/img/1.jpg',
        len:'4:06',
        source: '/music/1.mp3',
        id:1
      },
      {
        name: 'Say Less',
        artist:'Roy Woods',
        album:'Say Less',
        img: '/img/2.jpg',
        len:'3:07',
        source: '/music/2.mp3',
        id:2
      },
      {
        name: 'goosebumps',
        artist:'Travis Scott',
        album:'Birds In The Trap',
        img: '/img/3.jpg',
        len:'4:03',
        source: '/music/3.mp3',
        id:3
      }
];

app.get('/songdatabase', (req, res) => {
    res.json(songDatabase);
})

app.listen('8080', () => {
    console.log('listening on port 8080');
})