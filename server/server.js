const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const passportUtilities = require('./modules/passport-utilities');
const sessionConfig = require('./modules/session-middleware');

// Route includes
const linkedinRouter = require('./routes/linkedin.auth.router');
const googleRouter = require('./routes/google.auth.router');
const passportAuthRouter = require('./routes/passport.auth.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration
app.use(sessionConfig);

app.use(passportUtilities.initialize());
app.use(passportUtilities.session());

/* Routes */
app.use('/api/linked', linkedinRouter);
app.use('/auth', googleRouter);
app.use('/auth', passportAuthRouter);
// Serve static files
app.use(express.static('server/public'));

const port = process.env.PORT;

/** Listen * */
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
