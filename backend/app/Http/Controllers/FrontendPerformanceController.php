<?php

namespace App\Http\Controllers;

require_once __DIR__ . '/../../../vendor/autoload.php';

use App\Frontend;
use Carbon\Carbon;
use Google_Client;
use Google_Service_AnalyticsReporting;
use Google_Service_AnalyticsReporting_DateRange;
use Google_Service_AnalyticsReporting_GetReportsRequest;
use Google_Service_AnalyticsReporting_Metric;
use Google_Service_AnalyticsReporting_ReportRequest;
use Illuminate\Support\Facades\DB;

class FrontendPerformanceController extends Controller
{
    public function getData(Frontend $frontend)
    {
        // Use the developers console and download your service account
        // credentials in JSON format. Place them in this directory or
        // change the key file location if necessary.
        $KEY_FILE_LOCATION = __DIR__ . '/service-account-credentials.json';

        // Create and configure a new client object.
        $client = new Google_Client();
        $client->setApplicationName("Hello Analytics Reporting");
        $client->setAuthConfig($KEY_FILE_LOCATION);
        $client->setScopes(['https://www.googleapis.com/auth/analytics.readonly']);
        $analytics = new Google_Service_AnalyticsReporting($client);

//        $start_date = $request->input('start_date');
//        $end_date = $request->input('end_date');

        // Replace with your view ID, for example XXXX.
        $VIEW_ID = "154433676";

        // Create the DateRange object.
        $dateRange = new Google_Service_AnalyticsReporting_DateRange();
        $dateRange->setStartDate("7daysAgo");
        $dateRange->setEndDate("today");

        // Create the Metrics object.
        $sessions = new Google_Service_AnalyticsReporting_Metric();
        $sessions->setExpression("ga:avgPageLoadTime");
        $sessions->setAlias("pageloadtime");

        // Create the ReportRequest object.
        $request = new Google_Service_AnalyticsReporting_ReportRequest();
        $request->setViewId($VIEW_ID);
        $request->setDateRanges($dateRange);
        $request->setMetrics(array($sessions));

        $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
        $body->setReportRequests(array($request));

        $response = $analytics->reports->batchGet($body);
        $wakwaw = $response['reports'];
        $wikwiw = $wakwaw['0'];
        $wekwew = $wikwiw['data'];
        $wukwuw = $wekwew['totals'];
        $huhu = $wukwuw['0'];
        $wokwow = $huhu['values'];
        $hehe = $wokwow['0'];
        $tanggal = Carbon::now();
        $tanggal = Carbon::parse($tanggal)->format('Y-m-d H:i:s');

        $frontend->setAttribute(Frontend::ATTRIBUTE_DATE_TIME, $tanggal);
        $frontend->setAttribute(Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME, $hehe);
        $frontend->save();

        $frontend_performance = DB::table('frontend_performance')->latest('id')->first();
        return json_encode($frontend_performance);
    }
}


