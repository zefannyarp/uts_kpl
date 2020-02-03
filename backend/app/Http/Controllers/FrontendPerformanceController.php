<?php

namespace App\Http\Controllers;

require_once __DIR__ . '/../../../vendor/autoload.php';

use Auth;
use App\Frontend;
use App\User;
use Carbon\Carbon;
use Google_Client;
use Google_Service_AnalyticsReporting;
use Google_Service_AnalyticsReporting_DateRange;
use Google_Service_AnalyticsReporting_GetReportsRequest;
use Google_Service_AnalyticsReporting_Metric;
use Google_Service_AnalyticsReporting_ReportRequest;

class FrontendPerformanceController extends Controller
{
    public function getAveragePageLoadTime(Frontend $frontend, User $user)
    {
        // if (!Auth::check()) {
        //     return response()->json([
        //         'unauthorized' => 'gaboleh ah'
        //     ], 401);
        // }
    
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

        // Replace with your view ID, for example XXXX.
        $VIEW_ID = "154433676";

        // Create the DateRange object.
        $dateRange = new Google_Service_AnalyticsReporting_DateRange();
        $dateRange->setStartDate("7daysAgo");
        $dateRange->setEndDate("today");

        // Create the Metrics object.
        $avgPageLoadTime = new Google_Service_AnalyticsReporting_Metric();
        $avgPageLoadTime->setExpression("ga:avgPageLoadTime");
        $avgPageLoadTime->setAlias("avgPageLoadTime");

        // Create the ReportRequest object.
        $request = new Google_Service_AnalyticsReporting_ReportRequest();
        $request->setViewId($VIEW_ID);
        $request->setDateRanges($dateRange);
        $request->setMetrics(array($avgPageLoadTime));

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

        $start_date = Carbon::parse($dateRange->startDate)->format('Y-m-d H:i:s');
        $end_date = Carbon::parse($dateRange->endDate)->format('Y-m-d H:i:s');

        $frontend->setAttribute(Frontend::ATTRIBUTE_START_DATE, $start_date);
        $frontend->setAttribute(Frontend::ATTRIBUTE_END_DATE, $end_date);
        $frontend->setAttribute(Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME, $hehe);
        $frontend->save();

        $rispinsi = [
            'id' => $frontend->getAttribute(Frontend::ATTRIBUTE_ID),
            'start_date' => $frontend->getAttribute(Frontend::ATTRIBUTE_START_DATE),
            'end_date' => $frontend->getAttribute(Frontend::ATTRIBUTE_END_DATE),
            'avgPageLoadTime' => $frontend->getAttribute(Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME)
        ];
        return response()->json($rispinsi);
        
    }

    public function ShowFrontendPerformanceHistory()
    {
        return Frontend::all();
    }
}


