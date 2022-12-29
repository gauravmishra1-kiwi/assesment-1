const jwt = require("jsonwebtoken");
const user = require('../models/schema');
const joi = require('joi');
const joiLoginSchema = joi.object({
    email: joi.string().email().min(8).required(),
    password: joi.string().min(8).required()
})
const joiSignupSchema = joi.object({
    email: joi.string().email().min(8).required(),
    name: joi.string().min(3).max(20).required(),
    phone_number: joi.string().min(9).max(14).required(),
    address: joi.string().min(10).max(50).required()
});

const joiEmailSchema = joi.object({
    email: joi.string().email().required()
})

const adminUpdateUser = function (req, res) {

    const object = joiSignupSchema.validate({ email: req.body.email, name: req.body.name, phone_number: req.body.phone_number, address: req.body.address });
    if (object.error != undefined) {
        console.log(object.error.details[0].message);
        res.send(object.error.details[0].message);
    }
    else {
        user.findOneAndUpdate({ email: req.body.email }, { $set: { name: req.body.name, phone_number: req.body.phone_number, address: req.body.address } }).then((value) => {
            try {
                console.log("Information has been updated");
                res.send("Information has been updated");
            }
            catch (err) {
                console.log(err);
                res.send(err);
            }
        });
    }
}

const adminUserDetails = function (req, res) {

    user.find().then((value) => {

        try {
            console.log(value);
            res.send(value);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    });
}

const adminDeleteUser = function (req, res) {

    const object = joiEmailSchema.validate({ email: req.body.email });
    if (object.error != undefined) {
        console.log(object.error.details[0].message);
        res.send(object.error.details[0].message);
    }
    else {
        user.deleteOne(({ email: req.body.email }), (err, val) => {

            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                if (val.deletedCount == 0) {
                    console.log("There is nothing for delete , Please enter other email for deletion");
                    res.send("There is nothing for delete , Please enter other email for deletion");
                }
                else {
                    console.log("Data has been deleted");
                    res.send("Data has been deleted");
                }
            }
        });
    }
}

const adminLogin = function (req, res) {
    const object = joiLoginSchema.validate({ email: req.body.email, password: req.body.password });

    if (object.error != undefined) {

        console.log(object.error.details[0].message);
        res.send(object.error.details[0].message);
    }
    else {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "Admin@123";

        if (req.body.email == adminEmail) {

            if (req.body.password == adminPassword) {
                const token = jwt.sign({ email: req.body.email }, "AdminKey");
                console.log(token);
                res.send(token);
            }
            else {
                res.send("Admin password does not match");
                console.log("Admin password does not match");
            }

        }
        else {
            res.send("Admin email does not match");
            console.log("Admin email does not match");
        }

    }
}

const adminActiveUser = function (req, res) {

    const object = joiEmailSchema.validate({ email: req.body.email });
    if (object.error != undefined) {
        console.log(object.error.details[0].message);
        res.send(object.error.details[0].message);
    }
    else {
        user.findOneAndUpdate({ email: req.body.email }, { $set: { active: true } }).then((value) => {
            try {
                console.log("User has been activated");
                res.send("User has been activated");
            }
            catch (err) {
                console.log(err);
                res.send(err);
            }
        });
    }
}

const adminDeactiveUser = function (req, res) {

    user.findOneAndUpdate({ email: req.body.email }, { $set: { active: false } }).then((value) => {
        try {
            console.log("User has been deactivated");
            res.send("User has been deactivated");
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    });
}

module.exports = {
    adminDeactiveUser: adminDeactiveUser,
    adminActiveUser: adminActiveUser,
    adminLogin: adminLogin,
    adminDeleteUser: adminDeleteUser,
    adminUserDetails: adminUserDetails,
    adminUpdateUser: adminUpdateUser
}