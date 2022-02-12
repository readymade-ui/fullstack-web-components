import { db } from '../db/index.js';

class ContactsController {
  constructor() {}
  get(req, res) {
    const { contacts } = db.data;
    res.status(200).send(JSON.stringify(contacts));
  }
  post(req, res) {
    db.data.contacts.rowData = req.body;
    db.write();
    res.send(JSON.stringify(db.data.contacts));
  }
}

export { ContactsController };
