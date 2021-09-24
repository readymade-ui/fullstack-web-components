import express from 'express';
import { check } from 'express-validator';
import { AuthController } from '../route/auth.js';
import { ContactsController } from '../route/contacts.js';
import { db } from '../db/index.js';

const apiRouter: express.Router = express.Router();
const auth: any = new AuthController();
const contacts: any = new ContactsController();

apiRouter.get('/contacts', contacts.get);
apiRouter.post('/contacts', contacts.post);
apiRouter.post('/login', auth.login);
apiRouter.post(
  '/signup',
  check('username')
    .isLength({
      min: 4,
    })
    .withMessage('Username must have at least 4 characters'),
  check('password')
    .isLength({
      min: 4,
    })
    .withMessage('Password must have at least 4 characters'),
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
  check('passwordRepeat')
    .notEmpty()
    .withMessage('Password must be entered twice'),
  check('password').custom((value, { req }) => {
    if (value !== req.body.passwordRepeat) {
      throw new Error('Passwords do not match');
    } else {
      return true;
    }
  }),
  check('username').custom((value) => {
    const { users } = db.data;
    const usernames = users.map((user) => user.username);
    if (usernames.includes(value)) {
      throw new Error('Username taken');
    } else {
      return true;
    }
  }),
  auth.signup
);

export default apiRouter;
