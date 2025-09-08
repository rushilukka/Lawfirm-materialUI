const express = require('express');
const app = express();
const router = require('./routing/routing');
const cors = require('cors');
const { ADMIN_SERVER } = require('./constants/constants');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ADMIN_SERVER.ALLOWED_ORIGINS
}));

app.use('/', router);

app.listen(ADMIN_SERVER.PORT, () => {
    console.log(`Admin server running on port ${ADMIN_SERVER.PORT}`);
});
