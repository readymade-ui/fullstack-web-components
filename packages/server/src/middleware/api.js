import express from 'express';
import { check } from 'express-validator';
import { AuthController } from '../route/auth.js';
import { ContactsController } from '../route/contacts.js';
import { CookiesController } from '../route/cookies.js';
import { db } from '../db/index.js';

const apiRouter = express.Router();
const auth = new AuthController();
const contacts = new ContactsController();
const cookies = new CookiesController();

apiRouter.get('/cookies', cookies.get);
apiRouter.post('/cookies', cookies.post);
apiRouter.get('/contacts', contacts.get);
apiRouter.get('/session', auth.session);
apiRouter.post('/contacts', contacts.post);
apiRouter.post('/auth', auth.login);
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
    // @ts-ignore
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
