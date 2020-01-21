<?php

use App\Http\Controllers\UptimeController;
use Illuminate\Http\Request;

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

Route::post('summary', 'UptimeController@getUptimeSummary');
Route::get('details', 'UptimeController@getUptimeDetails');
Route::get('history', 'UptimeController@getUptimeHistory');
