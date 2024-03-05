import { Sequelize } from "sequelize";
// import dotenv from 'dotenv-safe';
// dotenv.config({path: `.env.${process.env.NODE_ENV}`});


export const sequelize= new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'demo',
});
await sequelize.sync({ force: true });
sequelize
  .authenticate()
  .then(() => {
    console.log('DataBase Conneced successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the DataBase:', err);
  });
export default sequelize;





