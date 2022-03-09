// const chalk = require('chalk');
const bcrypt = require('bcrypt');
const {config} = require('../../config');
const User = require('../../models/Users');
require('../../lib/mongo');

function builAdminUser(password){
    return {
        password: password,
        email: config.authAdminEmail,
        username: config.authAdminUserName
    }
}
async function hasAdminUser(){
    const userAdmin = await User.find({username:config.authAdminUserName});
    return userAdmin  && userAdmin.length;
}
async function createAdminUser(){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(config.authAdminPassword,salt);
    const userAdmin = new User(builAdminUser(hashedPassword));
    const userId = await userAdmin.save();
    return userId;

}
async function seedAdmin(){
    try {
        if(await hasAdminUser()){
            console.log("Admin user already exists");
            return process.exit(1);
        }
        const adminUserId = await createAdminUser();
        console.log("Admin  user created with id:", adminUserId);
        return process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
seedAdmin();