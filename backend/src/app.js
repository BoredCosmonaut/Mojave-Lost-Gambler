import express from "express";
import cors from 'cors'
import registerRoutes from "../routes/index.js";
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true,limit: '10mb'  }));

const uploadsPath = path.join(__dirname, '..', 'uploads');
console.log('Serving uploads from:', uploadsPath);

app.use(
  '/uploads',
  express.static(path.join(__dirname,'..', '..', 'uploads'))
);

app.get('/ping', (req, res) => {
  res.send('pong');
});

registerRoutes(app);
export default app;