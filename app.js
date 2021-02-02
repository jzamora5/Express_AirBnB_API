import express from 'express';
import db from './config/database';
import stateRouting from './routes/states';

const app = express();
const port = process.env.PORT || 5000;

// Test Database
db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch((error) => console.log(error.message));

db.sync();
// Recommended to have migrations in production

app.get('/', (req, res) => res.send('HELLO'));

// State routes
stateRouting(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
