const Sequelize = require('sequelize');
// Deconstructed object to avoid writing sequalize everywhere
const { DataTypes } = Sequelize;

const username = 'root';
const password = 'root@12345';
const optionsObject = {
	dialect: 'mysql',
    /*
    // For global settings for all tables
    define: {
        freezeTableName: true,
    }*/
};
	/* host: 'localhost',
	port: 3306, */

const sequelize = new Sequelize('sequelize-video',username, password, optionsObject);

// Users - table of users
const modelName = 'user';
// The attributes will correspond to a model column
const modelAttributes = {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            len: [4, 6]
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    WittCodeRocks: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
};

const modelOptions = {
    freezeTableName: true,
    timestamps: false ,
};


const User = sequelize.define(modelName, modelAttributes, modelOptions);

const data = {
    username: 'Wittcode',
    password: '123',
    //WittCodeRocks: true
};

User.sync({ alter: true }).then(() => {
    //console.log("Table and model synced successfully!");
    // const user = User.build(data);
    // user.username = 'soccer';
    // return user.save();
    // accessing properties of the returned data
    // console.log(user.username);
    // console.log(user.password);
    // return User.create({
    //     username: 'Whitcode',
    //     password: 'subscribe',
    //     age: 25,
    //     WittCodeRocks: false,
    // })
    return User.bulkCreate([
    {
        username: "Tom",
        age: 25,
        password: 'pizzasoccer',
    },
    {
        username: "Mike",
        age: 31,
        password: '12345'
    },
    {
        username: "Freddie"
    }
    ],
    { 
        validate: true
    });
    // passing data into a promise to see if its successful
}).then((data) => {
    //console.log(data.toJSON());
    data.forEach(element => {
        console.log(element.toJSON());
    });
    console.log("User added to database");
    data.username = "pizza";
    data.age = 45;
    // return data.decrement({ age: 2});
    return data.increment({ age: 2});
    // To keep only age and not changed username, we can keep the key to fields
    return data.save({ fields: ['age']});
    // return data.destroy();
    //return data.reload();
}).then(() => {
    console.log("User returned to normal!");
    console.log(data);
})
.catch((err) => { 
    console.log(err);
});

//sequelize.sync({ alter: true });

/* Another way to connect to database and writing promises
async function myFunction() {
    await sequelize.authenticate();
    console.log("Connection successful");
}

myFunction();*/

// Checking for successfull database connection and returns a promise
// sequelize.authenticate().then(() => {
//     console.log("Connection successful");
// }).catch((err) => {
//     console.log("Error connecting to database");
// });

// console.log("Another task");

