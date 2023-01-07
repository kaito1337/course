import sequelize from "database/sequelize";

interface ISequelizeProvider {
  alterSync(): Promise<void>;
  sync(): Promise<void>;
}

class SequelizeProvider implements ISequelizeProvider {
  public async alterSync(): Promise<void> {
    await sequelize.sync({ alter: true });
  }

  public async sync(): Promise<void> {
    await sequelize.sync({ force: true });
  }
}

export { SequelizeProvider, ISequelizeProvider };
