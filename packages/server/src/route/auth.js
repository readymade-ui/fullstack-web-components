import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { db } from '../db/index.js';
import { passport } from '../index.js';

class AuthController {
  constructor() {}
  login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      req.login(user, function (err) {
        if (!user) {
          res.status(204).send();
          // TODO: error handling / validation
        } else {
          req.session.sid = req.cookies['connect.sid'];
          res.cookie('connect.sid', req.cookies['connect.sid']);
          req.session.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              res.json({ username: user.username });
            }
          });
        }
      });
    })(req, res, next);
  }
  signup(req, res) {
    const errors = validationResult(req).array();
    if (errors?.length) {
      res.status(400).send({
        errors,
      });
    } else {
      const username = req.body.username?.trim();
      const password = req.body.password?.trim();
      const salt = bcrypt.genSaltSync(10);
      const user = {
        username,
        password: bcrypt.hashSync(password, salt),
      };
      db.data?.users.push(user);
      res.status(200).send(user);
    }
  }
  session(req, res) {
    if (!req.session.passport) {
      res.status(401).send();
    } else {
      res.status(200).send();
    }
  }
}

export { AuthController };
