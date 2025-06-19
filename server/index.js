import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index.js';
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', rootRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
