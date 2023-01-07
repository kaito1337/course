import { SequelizeProvider } from "database/Provider/Provider";

const main = async () => {
  const sequelizeProvider = new SequelizeProvider();
  sequelizeProvider.sync();
};

main()
  .then()
  .catch((err) => console.log(err));
