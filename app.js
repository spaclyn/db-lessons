require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);


const User = sequelize.define("User", {
    username: {
        type:DataTypes.STRING
    }
})
/** 
    * One To One Rel 
 */
const Profile = sequelize.define("Profile", {
    birthday: {
        type: DataTypes.DATE
    }
})

User.hasOne(Profile, {
    onDelete: "CASCADE"
});
Profile.belongsTo(User);
/** 
    * One To Many
 */
const Order = sequelize.define("Order", {
    shipDate: {
        type: DataTypes.DATE
    }
})
User.hasMany(Order);
Order.belongsTo(User);
/** 
    * Many To Many
 */
const Class = sequelize.define("Class", {
    className: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATE
    }
})

User.belongsToMany(Class, { through: "Users_Classes" })
Class.belongsToMany(User, { through: "Users_Classes" })

//iffie
; (async () => {
    await sequelize.sync({force: true});
})();