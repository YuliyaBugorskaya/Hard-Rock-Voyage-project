const { Action } = require('./db/models');

Action.findAndCountAll({
  where: { startDate: '2023-06-05' },
  limit: 5,
  offset: null,

})
.then(data => console.log(JSON.parse(JSON.stringify(data))))
