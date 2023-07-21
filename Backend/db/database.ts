
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
  getItem: (key: string) => storage.getItemSync(key),
  setItem: (key: string, value: string) => {
    storage.setItemSync(key, value);
  },
  removeItem: (key: string) => {
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

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  options,
);

async function select(table: string, columns: string[]) {
  const columnNames = columns.join(', ');
  // eslint-disable-next-line no-return-await
  const values = await supabase
    .from(table)
    .select(columnNames)
    .eq('username', 'user_1')
    .then((data: any) => data);
  console.table(values.data);
}

select('usuario', ['*']);

module.exports = {
  database: supabase,
  select,
}