import { db } from '../db/index.js';

class CookiesController {
  constructor() {}
  get(req, res) {
    const { cookies } = db.data;
    res.status(200).send(JSON.stringify({ permission: cookies }));
  }
  post(req, res) {
    db.data.cookies = req.body.permission;
    db.write();
    res.send(JSON.stringify({ permission: db.data.cookies }));
  }
}

export { CookiesController };
