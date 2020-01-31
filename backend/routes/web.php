<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Facade;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;

Route::get('/', function () {
    return view('welcome');
});
Route::post('/login', 'Auth\LoginController@login');
Route::get('/data', function () {
//    $analyticsData = (new Spatie\Analytics\Analytics( '154433676'))->fetchVisitorsAndPageViews(Period::days(7));
//    $analyticsData = (new Spatie\Analytics\Analytics)->fetchMostVisitedPages(Period::days(7));

//    dd($analyticsData);
});

