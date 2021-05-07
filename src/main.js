import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routers';

// create express app
const app = express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors());
app.use('/api', jsonParser, router)
const port = process.env.PORT || 5000;

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
