


const development = require('./environment/development');
const production = require('./environment/production');



module.exports  =  {
    development: Object.assign( {}, development),
    production: Object.assign( {}, production)
}[ process.env.NODE_ENV || 'development']
