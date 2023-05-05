require('dotenv').config();

const { dbUsers } = require('./database/users.config');
const { dbTransfers } = require('./database/transfers.config');

const app = require('./app');

dbUsers
  .authenticate()
  .then(() => {
    console.log('database authenticated');
  })
  .catch((error) => console.log(error));
dbUsers
  .sync()
  .then(() => {
    console.log('database synced');
  })
  .catch((error) => console.log(error));

dbTransfers
  .authenticate()
  .then(() => {
    console.log('database authenticated');
  })
  .catch((error) => console.log(error));
dbTransfers
  .sync()
  .then(() => {
    console.log('database synced');
  })
  .catch((error) => console.log(error));

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
