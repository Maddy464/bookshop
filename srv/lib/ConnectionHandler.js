
const cds = require('@sap/cds');
//const GWSAMPLE = require('./external/GWSAMPLE');

async function ConnectBackend(req) {

  const backendconnnect = await cds.connect.to('GWSAMPLE');
  const tx  = backendconnnect.tx(req);
  return  tx.run(req.query);

}

module.exports = { ConnectBackend };