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
    Route::get('frontend', 'FrontendPerformanceController@getAveragePageLoadTime');
    Route::get('frontend/history', 'FrontendPerformanceController@ShowFrontendPerformanceHistory');
});

Route::get('login', 'Auth\LoginController@redirectTo')->name('login');

Route::post('register', 'Auth\RegisterController@action');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::get('session', 'UserController@show');

