import 'dotenv/config';
import app from '../app.js';
import importCommonJS from '../utils/importCommonJS.js';

const port = process.env.DEPLOY_PORT;

app.listen(port, async () => {
  console.log(`Server running on ${port}`);
});
