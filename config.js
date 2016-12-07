exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://<dbuser>:<dbpassword>@ds149207.mlab.com:49207/exercise-app' :
                            'mongodb://localhost/exercise-app-dev');
exports.PORT = process.env.PORT || 8080;