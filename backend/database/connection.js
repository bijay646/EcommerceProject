module.exports = {
     HOST: 'localhost',
     USER: 'root',
     PASSWORD: '',
     DB: 'ecommerce',
     dialect: 'mysql',
 
     pool: {
         max: 10,
         min: 0,
         acquire: 40000,
         idle: 10000
     }
 }