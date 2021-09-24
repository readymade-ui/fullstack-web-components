import { join } from 'path';

import { Low, JSONFile } from 'lowdb';

type Data = {
  users: any[];
  contacts: {
    columnData: any[];
    rowData: any[];
  };
};

const file = join(process.cwd(), 'data', 'db.json');
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);

db.read();
db.data = db.data || { users: [], contacts: { columnData: [], rowData: [] } };

export { db };
