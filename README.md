Project completed-Backend 
Language used-Javascript,nodejs,express
Database used- Mongodb

Description of the project-
In this project, I have used RESTful APIs to create  user and subscription. 

List of files and folders included in this project-
1. I have in together created 4 APIs for this project. 
2. You can find the list of all APIs in the route.js file inside routes folders. 
3. I have created 2 files for models-userModel.js and subscriptionModel.js inside models folder.
4. I have created 2 files for controllers-userController.js where you can find the APIs for creating user and getting user_name of the user.
And subscriptionController.js where you can find the APIs performing creating and getting subscription with date given in path params as optional.
5. I have created a file validator.js inside utils folders where all functions for validation are defined.



My task was to create APIs for user and subscription. Below are the description of all APIs-
1. I have created 1st API in userController for 1st API was to create user.
In the request body I have given user_name
http method used- PUT

My response -
INPUT-
{
    "user_name":"pranav"
}
OUTPUT-
{
    "status": true,
    "message": "user created successfully",
    "data": {
        "user_name": "pranav",
        "_id": "621dc8bd8b984093f8188574",
        "createdAt": "2022-03-01T07:18:21.449Z",
        "updatedAt": "2022-03-01T07:18:21.449Z",
        "__v": 0
    }
}



2. I have created 2nd API in userController for getting user details.
In path params we have user_name
http method used-GET


My response -
{
    "status": true,
    "message": "user details are",
    "data": {
        "_id": "621dc8bd8b984093f8188574",
        "user_name": "pranav",
        "createdAt": "2022-03-01T07:18:21.449Z",
        "updatedAt": "2022-03-01T07:18:21.449Z",
        "__v": 0
    }
}



3. I have created 3rd API in subscriptionController for creating subscription.
In the request body I have given user_name,plan-id and start_date
http method used-POST


My response -
INPUT-
{
    "user_name":"pranav",
    "plan_id":"LITE_1M",
    "start_date":"2022-03-01"
}
OUTPUT-
{
    "status": "success",
    "amount": -100
}


4.I have created 4th API in subscriptionController for getting subscription. user_name and date are given in path params where date is optional and actions are performed accordings. My responses for both are given below.
http method used- GET


My response(date given in path params)-
{
    "plan_id": "PRO_6M",
    "days_left": 175
}


My response(date is not given in path params)-
[
    {
        "plan_id": "PRO_6M",
        "start_date": "2022-03-09T18:30:00.000Z",
        "valid_till": "2022-09-05T18:30:00.000Z"
    },
    {
        "plan_id": "TRIAL",
        "start_date": "2022-02-28T18:30:00.000Z",
        "valid_till": "2022-03-07T18:30:00.000Z"
    }
]








