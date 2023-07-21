const { database, select } = require('../db/database.ts');

select('usuarios', ['*']);
