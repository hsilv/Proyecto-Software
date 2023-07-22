import 'dotenv/config';
import app from '../app.js';
import auth from '../routes/auth/index.js';

const port = process.env.DEPLOY_PORT;

app.listen(port, async () => {
  console.log(`Server running on ${port}`);
});

app.use('/auth/', auth);
