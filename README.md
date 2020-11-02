# Virtual Walkathon Tracker

## Description: 
This app allows user to track their miles by entrusting the user to manually entering the miles. This is a single page application using React,MongoDB (NoSQL DB), and NodeJS express. The user would have to first register in order to be able to start tracking their miles. The purpose of this application was to be able to track miles and be able to compete as a team. The design of the website is very minimalistic to create a modern appearance. This website is very responsive and supports mobile devices.
## Prerequisite
1. Need to have **NodeJS** and **NPM**. Here are the installation process to install NodeJS and NPM: https://www.npmjs.com/get-npm
2. Need to have **MongoDB**. Here are the installation process to install MongoDB (Communnity - Free Tier): https://docs.mongodb.com/manual/installation/
3. **(OPTIONAL)** **MongoDB Compass** This is a UI to view the data. This is not a must but recommeneded to easily view the data. Installation process to install MongoDB Community: https://www.mongodb.com/try/download/compass

## How to start the application
1. Open the Command Prompt/Terminal and startup mongodb if not started. To start mongodb: ```mongod```
2.  Once the mongoDB has started. Open a new Command Prompt/Terminal and naviagate to the root folder. Run the command ```npm i```
3. Once the installation process finished, navigate to backend folder. Run the command ```npm i```
4. Once the installation process finished, navigate to frontend folder. Run the command ```npm i```
5. There are two ways to boot up the application. One is running the **prod environment**, which is faster and more optimized. The other is the **dev environment**, This is more slower cause it has debug feature, which allows debugging. You can make changes and view those changes live. This way you do not have to constantly restart the server for every change. 
    1. To naviagate to the root folder and run ```npm run dev```. This will boot both the ExpressJS service and the React. Once both service are up and running. Open up a browser. In the URL, type http://localhost:3000. You should be able to view the website. 
    2. To navigate to the frontend folder and run ```npm run build```. Once the build has finished. Navigate back to the root folder and run ```npm run prod```. Once both the service has started, open a browser. In the URL, type http://localhost:3000. You should be able to view the website. 

## How to use the application
1. You need to register to be able to track the miles. This is the screenshot of the register page. 
![Register](https://github.com/uttamindukuri5/Cancer-Walkathon-Step-Challenge/blob/master/img/Register.png)
2. The Dashboard page shows key statistics of the cumulative miles done overall by individual participants. Also shows team cumalitve miles as well. Here is the screenshot of the dashboard. 
![Dashbard](https://github.com/uttamindukuri5/Cancer-Walkathon-Step-Challenge/blob/master/img/Dashboard.png)
3. The Enter Miles section, is where you would enter the mile you did in that particular day. There are some restriction, like you cannot enter a future date. You can only enter miles from Sept 28th to Oct 28th. Anything before or after that date will not accept. Here is the screenshot of the Enter Miles: ![Enter_Miles](https://github.com/uttamindukuri5/Cancer-Walkathon-Step-Challenge/blob/master/img/Enter_Mile.png)
4. The View Mile Section, is where you would view the previously entered miles. If you have registered but have not enter any miles, it will throw an error. Here is the View Mile section screenshot. ![View_Miles](https://github.com/uttamindukuri5/Cancer-Walkathon-Step-Challenge/blob/master/img/Enter_Mile.png)
