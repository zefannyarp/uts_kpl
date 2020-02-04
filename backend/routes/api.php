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

Route::group(['middleware' => 'jwt.verify'], function () {
    Route::post('uptime', 'UptimeController@getUptimeSummary');
    Route::get('uptime/{id}', 'UptimeController@getUptimeDetails');
    Route::get('frontend', 'FrontendPerformanceController@getAveragePageLoadTime');
    Route::get('frontend/history', 'FrontendPerformanceController@ShowFrontendPerformanceHistory');
    Route::get('history', 'UptimeController@getUptimeHistory');
    Route::post('admin/add', 'AdminController@addUser');
    Route::post('admin/update', 'AdminController@updateUser');
    Route::post('admin/delete/{id}', 'AdminController@deleteUser');
    Route::get('admin/user/{id}', 'AdminController@showUser');
    Route::get('admin/users', 'AdminController@getUser');
});

Route::group(['middleware' => 'api', 'prefix' => 'auth' ], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::post('register-admin', 'UsirController@registerAdmin');
Route::post('register', 'UsirController@register');
Route::post('login', 'UsirController@authenticate');
Route::get('open', 'DataController@open');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UsirController@getAuthenticatedUser');
    Route::get('closed', 'DataController@closed');
});
