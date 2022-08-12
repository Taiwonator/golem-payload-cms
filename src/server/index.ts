import express from 'express';
import payload from 'payload';
import cors from 'cors'
require('dotenv').config();

const app = express();

// Enables requests from custom subdomain
const corsOptions = {
  origin: process.env.GOLEM_ADMIN_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
if(process.env.NODE_ENV === 'production') {}
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  },
})

// Add your own express routes here

app.listen(3000);
