const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        },
    plan_id: {
        type: String,
        required: true,
        trim: true,
    },
    start_date: {
        type: Date,
        trim: true,
        required:true
       
    }
    }, { timestamps: true })

module.exports = mongoose.model('Subscription', subscriptionSchema)