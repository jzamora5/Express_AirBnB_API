import express from 'express';
import db from './config/database';
import stateRouting from './routes/states';
import cityRouting from './routes/cities';
import amenityRouting from './routes/amenities';
import userRouting from './routes/users';
import reviewRouting from './routes/reviews';
import placeRouting from './routes/places';

const app = express();
const port = process.env.PORT || 5000;

// Test Database
db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch((error) => console.log(error.message));

db.sync({ force: true });
// Recommended to have migrations in production

app.get('/', (req, res) => res.send('HELLO'));

// Routes
stateRouting(app);
cityRouting(app);
amenityRouting(app);
userRouting(app);
reviewRouting(app);
reviewRouting(app);
placeRouting(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
