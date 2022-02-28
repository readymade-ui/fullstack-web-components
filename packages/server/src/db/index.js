import { join } from 'path';

import { Low, JSONFile } from 'lowdb';

const file = join(process.cwd(), 'data', 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.read();
db.data = db.data || {
  users: [],
  contacts: { columnData: [], rowData: [] },
  cookies: false,
};

export { db };
