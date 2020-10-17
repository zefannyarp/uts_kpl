<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Support\Facades\Route;

    Route::get('coba', 'TestController@testShop');

    Route::post('hehe', 'hehe@getData');

//Route::group(['middleware' => 'jwt.verify'], function () {
    //Uptime
    Route::post('uptime', 'UptimeController@getUptimeSummary');
    Route::get('uptime/{id}', 'UptimeController@getUptimeDetails');
    Route::get('history', 'UptimeController@getUptimeHistory');
    Route::post('new_uptime', 'UptimeController@getData');
    Route::post('delete_uptime/{id}', 'UptimeController@deleteUptime');

    //Frontend
    Route::get('frontend', 'FrontendPerformanceController@getAveragePageLoadTime');
    Route::get('frontend/history', 'FrontendPerformanceController@ShowFrontendPerformanceHistory');
    Route::get('new_fp', 'FrontendPerformanceController@getData');

    //User
    Route::post('admin/add', 'AdminController@addUser');
    Route::post('admin/update', 'AdminController@updateUser');
    Route::post('admin/delete/{id}', 'AdminController@deleteUser');
    Route::get('admin/user/{id}', 'AdminController@showUser');
    Route::get('admin/users', 'AdminController@getUser');

    //Backend Coverage
    Route::get('backendcoverage', 'BackendCoverageController@showBackendCoverage');
    Route::post('new_bc', 'BackendCoverageController@getData');
    Route::get('delete_bc/{id}', 'BackendCoverageController@bodo');

    //Backend Response Time
    Route::get('backendresponsetime', 'BackendResponseTimeController@showBackendResponseTimeData');
    Route::post('new_brt', 'BackendResponseTimeController@getData');
    Route::post('delete_brt/{id}', 'BackendResponseTimeController@deleteBackendResponseTime');

    //Sentry
    Route::get('sentry', 'SentryController@showSentry');
    Route::post('new_sentry', 'SentryController@getData');
    Route::post('delete_sentry/{id}', 'SentryController@hehe');

    //Schedule Jobs
    Route::get('schedulejobs', 'ScheduleJobsController@showScheduleJobs');
    Route::post('new_sj', 'ScheduleJobsController@getData');
    Route::post('delete_sj/{id}', 'ScheduleJobsController@deleteSJ');

    Route::post('login', 'Auth\LoginController@login');
//});

Route::group(['middleware' => 'api', 'prefix' => 'auth' ], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('register-admin', 'UsirController@tolol');
});

Route::post('register-admin', 'UsirController@tolol');
Route::post('register', 'UsirController@register');
//Route::post('login', 'UsirController@authenticate');
Route::get('open', 'DataController@open');
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UsirController@getAuthenticatedUser');
    Route::get('closed', 'DataController@closed');
});

