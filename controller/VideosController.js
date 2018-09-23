const WebBeeController = require('./WebBeeController');
const videoDao = require('../data/dynamoDb/VideoDao');


const ctrl = new WebBeeController('/api');

ctrl.config([
  {
    path: '/videos',
    methods: 'GET',
    run: async (ctx) => {
      const items = await videoDao.findAll();
      ctx.body = { data: items };
      ctx.status = 200;
    },
  },
  // {
  //   path: '/rules',
  //   methods: 'POST,PUT',
  //   run: async (ctx) => {
  //     const docs = ctx.request.body;
  //     const inserted = await RuleStore.save(docs);
  //     ctx.body = { data: { count: inserted.length, inserted } };
  //     ctx.status = 200;
  //   },
  // },
  // {
  //   path: '/rules/remove',
  //   methods: 'POST,PUT,PATCH,DELETE',
  //   run: async (ctx) => {
  //     const body = [...ctx.request.body];
  //     const removed = await RuleStore.remove(body);
  //     ctx.body = { data: { count: removed } };
  //     ctx.status = 200;
  //   },
  // },
]);

module.exports = ctrl;
