const database = {
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    define: {
        timestamps: true,
        underscored: true
    }
};

module.exports = database;