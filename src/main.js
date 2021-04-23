import express from 'express';
import cors from 'cors';
import router from './routers';

// create express app
const app = express();
app.use(cors());
app.use(router)
const port = process.env.PORT || 5000;

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
