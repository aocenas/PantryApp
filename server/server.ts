import * as path from 'path';
import * as express from 'express';
const browserify = require('browserify-middleware');
const session = require('express-session');

import initDb from './models/init-db';
import api from './api';


// make sure db is initialized, we are using sqlite in memory so db is recreated every restart
initDb()
    .then(() => {
        const app = express();
        const port = process.env.PORT || 3000;

        // using default memory store so will be wiped sam way as the db
        app.use(session({
            secret: 'super secret',
            resave: false, // can be false for redis not sure about memoryStore
            saveUninitialized: false,
        }));

        // TODO: PERF: first response is pretty slow because it has to bundle all the things
        // TODO: use tsify to generate correct source maps
        app.get('/static/js/bundle.js', browserify(__dirname + '/../app/main.js', {}));

        app.use('/api/v1/', api);

        // serve files from the root so no security here
        app.use('/', express.static(path.join(__dirname, '../'), { maxAge: 31557600000 }));

        // catch all so we serve index on /stats
        app.get('*', (req, res) => {
            res.sendfile(path.join(__dirname, '../index.html'));
        });

        app.listen(
            port,
            function() {
                console.log('Express server listening on port %d', port);
            }
        );

    })
    .catch(console.error);



