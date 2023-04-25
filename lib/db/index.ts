import config from 'config'
import { Sequelize } from 'sequelize'

const dbString = config.get('database')
const sequelize = new Sequelize(dbString)

export default sequelize