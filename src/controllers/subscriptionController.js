const userModel = require('../models/userModel')
const subscriptionModel = require('../models/subscriptionModel')
const validator = require('../utils/validator')
const moment = require('moment')

const createSubscription = async function (req, res) {
    try {
        let balance = 0
        let requestBody = req.body
        let { user_name, plan_id, start_date } = requestBody
        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author details' })
        }
        const user = await userModel.findOne({ user_name: user_name })
        if (!user) {
            return res.status(404).send({ status: 'failure', message: 'user does not exist' })
        }
        if (!validator.isValid(user_name)) {
            return res.status(400).send({ status: false, message: 'user name is required' })
        }
        if (!validator.isValid(plan_id)) {
            return res.status(400).send({ status: false, message: 'Please mention your plan' })
        }
        if (!validator.isValid(start_date)) {
            return res.status(400).send({ status: false, message: 'start date is required' })
        }
        const subData = {
            user_name: user_name,
            plan_id: plan_id,
            start_date: moment(start_date).toISOString()
        }
        const plans = {
            FREE: 0,
            TRIAL: 0,
            LITE_1M: 100,
            PRO_1M: 200,
            LITE_6M: 500,
            PRO_6M: 900
        }


        if (!plans.hasOwnProperty(plan_id)) {
            return res.status(400).send({ status: 'failure', message: 'plan id is invalid' })
        }

        balance = balance - plans[plan_id]

        await subscriptionModel.create(subData)
        return res.status(200).send({ status: 'success', amount: balance })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
const getSubscription = async function (req, res) {
    try {
        const requestParams = req.params
        let { userName, date } = requestParams
        const user = await subscriptionModel.findOne({ user_name: userName })
        if (!user) {
            return res.status(404).send({ status: 'failure', message: 'user does not exist' })
        }
        const planValidity = {
            TRIAL: 7,
            LITE_1M: 30,
            PRO_1M: 30,
            LITE_6M: 180,
            PRO_6M: 180
        }
        let givenDate = (new Date(date)).getTime()
        let startDate = (new Date(user.start_date)).getTime()
        if (!planValidity.hasOwnProperty(user.plan_id)) {
            return res.status(400).send({ status: 'failure', message: 'plan id is invalid' })
        }
        let validity = planValidity[user.plan_id]
        let daysLeft = Math.ceil(((startDate - givenDate) / (1000 * 60 * 60 * 24)) + validity)
        if (date) {
            let data = {
                plan_id: user.plan_id,
                days_left: daysLeft
            }
            return res.status(200).send(data)
        }
        else {
            let arr = []
            const allUsers = await subscriptionModel.find({ user_name: userName })
            for (let i = 0; i < allUsers.length; i++) {
                let d = new Date(allUsers[i].start_date)
                let validity = planValidity[allUsers[i].plan_id]
                let data1 = {
                    plan_id: allUsers[i].plan_id,
                    start_date: allUsers[i].start_date,
                    valid_till: new Date(d.setDate(d.getDate() + validity))
                }
                arr.push(data1)
            }
            return res.status(200).send(arr)
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = {
    createSubscription,
    getSubscription
}
