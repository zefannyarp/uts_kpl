# KPI DASHBOARD (Frontend Performance and Uptime)

This is a project for Garasi.id to help each KPI PIC to get the data from data source (Uptime from Kibana, Frontend Performance from Google Analytics).
There's some set up that you need to do before pulling this project.
First of all, you have to make sure that you have Composer, Laravel and NPM installed in your computer. If you don't have any of that, you can get it from here:
  - [Composer](https://getcomposer.org/download/)
  - [Laravel](https://laravel.com/docs/6.x)
  - [NPM](https://www.npmjs.com/get-npm)

After that, make a "KPI Dashboard" folder and you have to do all the steps inside this folder.
##Backend Set Up

1. Create a new laravel project.
    ````
    composer create-project --prefer-dist laravel/laravel backend
    ````
2. Make a "kpi_dashboard" database, then set up the database connection inside the .env file. (After this step, go to Frontend set up first. After the frontend set up finished, you can pull the project. After pulling the project you can continue to step number 3.)
3. There's also some package that you probably need to install after pulling this project such as:
    - [Google Client](https://packagist.org/packages/google/apiclient)
    - [Guzzle](https://github.com/guzzle/guzzle)
    - [Carbon](https://carbon.nesbot.com/)
    - [JWT Auth](https://jwt-auth.readthedocs.io/en/develop/laravel-installation/)
      
    You can follow all the instruction from each source above.
4. After pulling the project, you have to migrate the database. 
    ````
   php artisan migrate
    ````

##Frontend Set Up

1. Install ReactJS from node.js command prompt inside "KPI Dashboard" folder.
    ```
   npm install -g create-react-app
    ```
2. Create a new ReactJS project.
    ````
   create-react-app frontend
    ````
##How to run KPI Dashboard
1. Inside the frontend folder.
    ````
   npm start
    ````
2. Inside the backend folder.
    ````
   php artisan serve
    ````   
3. If you are having CORS issue, you probably need to install CORS package for the backend project. You can choose any of this package:
    - [Spatie CORS](https://github.com/spatie/laravel-cors)
    - [Fruitcake](https://github.com/fruitcake/laravel-cors)