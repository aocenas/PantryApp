import * as path from 'path';
import * as express from 'express';

import initDb from './models/init-db';
import api from './api';

// make sure db is initialized, we are using sqlite in memory so db is recreated every restart
initDb()
    .then(() => {
        const app = express();
        const port = process.env.PORT || 3000;

        // serve files from the root so no security here
        app.use('/', express.static(path.join(__dirname, '../'), { maxAge: 31557600000 }));

        app.use('/api/v1/', api);

        app.listen(
            port,
            function() {
                console.log('Express server listening on port %d', port);
            }
        );

    })
    .catch(console.error);



