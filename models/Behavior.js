const { Model, DataTypes } = require('sequelize');

class Behavior extends Model {
    static init(sequelize) {
        super.init({
            type: DataTypes.STRING,
            resource: DataTypes.STRING,
            method: DataTypes.STRING,
            status: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            data: DataTypes.STRING,
            pattern_source: DataTypes.STRING,
            pattern_flag: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = Behavior;