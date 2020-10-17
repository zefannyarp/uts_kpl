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

class FrontendPerformanceController extends Controller
{
    public function getAveragePageLoadTime(Frontend $frontend)
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
        $reports = $response['reports'];
        $zero = $reports['0'];
        $data = $zero['data'];
        $totals = $data['totals'];
        $total = $totals['0'];
        $values = $total['values'];
        $avgPageLoadTime = $values['0'];

        $start_date = Carbon::parse($dateRange->startDate)->format('Y-m-d H:i:s');
        $end_date = Carbon::parse($dateRange->endDate)->format('Y-m-d H:i:s');

        $frontend->setAttribute(Frontend::ATTRIBUTE_START_DATE, $start_date);
        $frontend->setAttribute(Frontend::ATTRIBUTE_END_DATE, $end_date);
        $frontend->setAttribute(Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME, $avgPageLoadTime);
        $frontend->save();

        $frontend_performance = [
            'id' => $frontend->getAttribute(Frontend::ATTRIBUTE_ID),
            'start_date' => $frontend->getAttribute(Frontend::ATTRIBUTE_START_DATE),
            'end_date' => $frontend->getAttribute(Frontend::ATTRIBUTE_END_DATE),
            'avgPageLoadTime' => $frontend->getAttribute(Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME)
        ];
        return response()->json($frontend_performance);
    }

//    public function getData(Request $request, Frontend $frontend, FrontendDatasource $frontendDatasource) {
//        $start_date = $request->input('start_date');
//        $start_date = substr($start_date, 0, -3); // to cut the milli
//        $start_date = date('Y-m-d', $start_date);
//        $end_date = $request->input('end_date');
//        $end_date = substr($end_date, 0, -3); // to cut the milli
//        $end_date = date('Y-m-d', $end_date);
//
//        $frontendDatasource = $frontendDatasource::where(FrontendDatasource::ATTRIBUTE_START_DATE, $start_date)->first();
//        if ($frontendDatasource) {
//            $frontendDatasource = $frontendDatasource->toArray();
//        }
//        $id = $frontendDatasource['id'];
//        $start_date = $frontendDatasource['start_date'];
//        $end_date = $frontendDatasource['end_date'];
//        $avgPageLoadTime = $frontendDatasource['avgPageLoadTime'];
//
//        $frontend->setAttribute(Frontend::ATTRIBUTE_ID, $id);
//        $frontend->setAttribute(Frontend::ATTRIBUTE_START_DATE, $start_date);
//        $frontend->setAttribute(Frontend::ATTRIBUTE_END_DATE, $end_date);
//        $frontend->setAttribute(Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME, $avgPageLoadTime);
//        $frontend->save();
//
//        $response = [
//            'id' => $frontend->getAttribute(Frontend::ATTRIBUTE_ID),
//            'start_date' => $frontend->getAttribute(Frontend::ATTRIBUTE_START_DATE),
//            'end_total' => $frontend->getAttribute(Frontend::ATTRIBUTE_END_DATE),
//            'new' => $frontend->getAttribute(Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME),
//        ];
//
//        return response()->json($response);
//    }

    public function getData(Frontend $frontend){
        $date = Carbon::now();

        $random = rand(5, 9);
        $frontend->setAttribute(Frontend::ATTRIBUTE_DATE, $date);
        $frontend->setAttribute(Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME, $random);
        $frontend->save();

        return response()->json($frontend);
    }
    public function ShowFrontendPerformanceHistory()
    {
        return Frontend::all();
    }
}


