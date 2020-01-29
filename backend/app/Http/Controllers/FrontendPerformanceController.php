<?php

namespace App\Http\Controllers;

// Load the Google API PHP Client Library.
use Google_Client;
use Google_Service_AnalyticsReporting;
use Google_Service_AnalyticsReporting_DateRange;
use Google_Service_AnalyticsReporting_GetReportsRequest;
use Google_Service_AnalyticsReporting_Metric;
use Google_Service_AnalyticsReporting_ReportRequest;

    require_once __DIR__ . '/../../../vendor/autoload.php';

    try {
        $analytics = initializeAnalytics();
    } catch (\Google_Exception $e) {
    }
    $response = getReport($analytics);
    $wakwaw  = $response['reports'];
    $wikwiw = $wakwaw['0'];
    $wekwew = $wikwiw['data'];
    $wukwuw = $wekwew['totals'];
    $huhu = $wukwuw['0'];
    $wokwow = $huhu['values'];
    $hehe = $wokwow['0'];
    $rispinse = [
      'avgPageLoadTime' => $hehe
    ];
    return $rispinse;
//    printResults($response);



/**
 * Initializes an Analytics Reporting API V4 service object.
 *
 * @return Google_Service_AnalyticsReporting
 * @throws \Google_Exception
 */
function initializeAnalytics()
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
    return new Google_Service_AnalyticsReporting($client);
}


/**
 * Queries the Analytics Reporting API V4.
 *
 * @param service An authorized Analytics Reporting API V4 service object.
 * @return The Analytics Reporting API V4 response.
 */
function getReport($analytics) {

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
    $body->setReportRequests( array( $request) );
    return $analytics->reports->batchGet( $body );
}


/**
 * Parses and prints the Analytics Reporting API V4 response.
 *
 * @param An Analytics Reporting API V4 response.
 */
//function printResults($reports) {
//    for ( $reportIndex = 0; $reportIndex < count( $reports ); $reportIndex++ ) {
//        $report = $reports[ $reportIndex ];
//        $header = $report->getColumnHeader();
//        $dimensionHeaders = $header->getDimensions();
//        $metricHeaders = $header->getMetricHeader()->getMetricHeaderEntries();
//        $rows = $report->getData()->getRows();
//
//        for ( $rowIndex = 0; $rowIndex < count($rows); $rowIndex++) {
//            $row = $rows[ $rowIndex ];
//            $dimensions = $row->getDimensions();
//            $metrics = $row->getMetrics();
////            var_dump($dimensions, $metrics);
////            var_dump($dimensionHeaders);
//            for ($i = 0; $i < count($dimensionHeaders) && $i < count($dimensions); $i++) {
//                print($dimensionHeaders[$i] . ": " . $dimensions[$i] . "\n");
//            }
//
//            for ($j = 0; $j < count($metrics); $j++) {
//                $values = $metrics[$j]->getValues();
//                for ($k = 0; $k < count($values); $k++) {
//                    $entry = $metricHeaders[$k];
//                    print($entry->getName() . ": " . $values[$k] . "\n");
//                }
//            }
//        }
//    }
//}
