const joi=require('joi')

const authSchema=joi.object({
    name:joi.string().min(3).max(20),
    email: joi.string().email().lowercase().required(),
    phone:joi.number().min(3).max(10).required(),
    address:joi.string().min(10).max(50),
    // user_status: joi.valid(['active', 'inactive']).required()
})

module.exports={
    authSchema,
}