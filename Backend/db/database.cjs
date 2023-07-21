const storage = require('node-persist');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function main() {
  await storage.init({
    dir: 'storage',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf-8',
    logging: true,
    ttl: false,
  });
}

main();

const appStorage = {
  getItem: (key) => storage.getItemSync(key),
  setItem: (key, value) => {
    storage.setItemSync(key, value);
  },
  removeItem: (key) => {
    storage.removeItemSync(key);
  },
};

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    storage: appStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
};

// eslint-disable-next-line import/prefer-default-export
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  options,
);

async function select(params) {
  const columnNames = params.columns.join(', ');
  // eslint-disable-next-line no-return-await
  const { data, error } = await supabase.from(params.table).select(columnNames).eq(params.conditions.columnName, params.conditions.comparation);
  if (error) {
    throw error;
  }
  console.table(data);
  return data;
}

module.exports = {
  database: supabase,
  select,
};
