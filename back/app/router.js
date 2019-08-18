'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/home', controller.home.index);

  router.get('/home/demo', controller.home.indexadd);
  router.get('/demo', controller.demo.index);

  // date
  router.get('/date', controller.date.index);
  router.post('/req', controller.date.req);


  //demoaxios
  router.get('/getfn',controller.demoaxios.getfn)
  router.post('/postfn',controller.demoaxios.postfn)
  router.head('/headfn',controller.demoaxios.headfn)
  router.delete('/deletefn',controller.demoaxios.deletefn)

  //mongo
  router.post('/find',controller.mongo.find)
  router.post('/insert',controller.mongo.insert)
  router.get('/count',controller.mongo.count)
  router.del('/remove',controller.mongo.remove)
  router.post('/update',controller.mongo.update)
};
