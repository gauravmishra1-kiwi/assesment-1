const express = require('express');
var adminRouter = express.Router();
const adminauthentication = require('../middleware/adminauthentication');
const adminController = require('../conttroller/admincontroller');
const adminLogin = adminController.adminLogin;
const adminUpdateUser = adminController.adminUpdateUser;
const adminDeleteUser = adminController.adminDeleteUser;
const adminUserDetails = adminController.adminUserDetails;
const adminActiveUser = adminController.adminActiveUser;
const adminDeactiveUser = adminController.adminDeactiveUser;

adminRouter.get('/adminLogin', adminLogin);
adminRouter.put("/adminUpdateUser", adminauthentication,adminUpdateUser);
adminRouter.get('/adminUserDetails', adminauthentication,adminUserDetails);
adminRouter.delete("/adminDeleteUser", adminauthentication,adminDeleteUser);
adminRouter.put("/deactivate", adminauthentication,adminDeactiveUser);
adminRouter.put("/activate", adminauthentication,adminActiveUser);

module.exports = adminRouter;