import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import { db } from '../db/index.js';

function signup(options, res) {
  const { users } = db.data;
  const salt = bcrypt.genSaltSync(10);
  const usernames = users.map((user) => user.username);

  if (usernames.includes(options.username)) {
    console.log('Error: Username taken');
    // return res.render(options.signUpTemplate, {errors: ['This username is already taken']})
  } else {
    db.data.users.push({
      username: options.username,
      password: bcrypt.hashSync(options.password, salt),
    });

    // redirect
    res.redirect(options.successRedirectUrl);
  }
}

function configurePassport(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
    const { users } = db.data;
    var user = users.find((user) => user.username === username);

    if (!user) {
      done({ message: 'Error: Invalid username' }, null);
    } else {
      done(null, user);
    }
  });

  passport.use(
    new Strategy(function (username, password, done) {
      const { users } = db.data;
      const user = users.find((user) => user.username === username);

      if (!user) {
        return done(null, false, { message: 'Error: Invalid credentials' });
      }

      const passwordsMatch = bcrypt.compareSync(password, user.password);

      if (!passwordsMatch) {
        return done(null, false, { message: 'Error: Invalid credentials' });
      }

      return done(null, user);
    })
  );
}

export { configurePassport };
