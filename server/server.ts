import * as path from 'path';
import * as express from 'express';

import api from './api';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '../'), { maxAge: 31557600000 }));

app.use('/api/v1/', api);

app.listen(
    port,
    function() {
        console.log('Express server listening on port %d', port);
    }
);
