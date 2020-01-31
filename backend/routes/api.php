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
Route::group(['middleware' => ['auth']], function () {
    Route::post('uptime', 'UptimeController@getUptimeSummary');
    Route::get('uptime/{id}', 'UptimeController@getUptimeDetails');
    Route::get('history', 'UptimeController@getUptimeHistory');
    Route::post('save', 'UptimeController@saveDataToDatabase');
    Route::get('frontend', 'FrontendPerformanceController@getAveragePageLoadTime');
    Route::get('frontend/history', 'FrontendPerformanceController@getHistory');
});

Route::post('register', 'Auth\RegisterController@action');
Route::post('login', 'Auth\LoginController@index');
Route::post('logout', 'Auth\LoginController@logout');

