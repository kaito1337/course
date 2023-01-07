import { Sequelize } from 'sequelize';
import { Configuration } from '../configuration';

const sequelize = new Sequelize(
    Configuration.orm.name,
    Configuration.orm.user,
    Configuration.orm.password,
    {
        dialect: Configuration.orm.dialect,
        host: Configuration.orm.host,
        port: +Configuration.orm.port
    }
)

export default sequelize;