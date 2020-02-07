<?php

namespace App\Http\Controllers;

use App\UptimeReport;
use App\UptimeDetail;
use App\UptimeSummary;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UptimeController extends Controller
{
    public function getUptimeSummary(Request $request, UptimeReport $uptimeReport, UptimeDetail $uptimeDetail, UptimeSummary $uptimeSummary)
    {
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');

        $headers = array(
            'kbn-xsrf' => true,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'NETOAPI_ACTION' => 'GetOrder',
            'NETOAPI_KEY' => env('NETO_API_KEY')
        );

        $query = ('{
                          "version": true,
                          "size": 500,
                          "sort": [
                            {
                              "@timestamp": {
                                "order": "asc",
                                "unmapped_type": "boolean"
                              }
                            }
                          ],
                          "_source": {
                            "excludes": []
                          },
                          "aggs": {
                            "2": {
                              "date_histogram": {
                                "field": "@timestamp",
                                "interval": "1m",
                                "time_zone": "Asia/Jakarta",
                                "min_doc_count": 1
                              }
                            }
                          },
                          "stored_fields": [
                            "*"
                          ],
                          "script_fields": {},
                          "docvalue_fields": [
                            "@timestamp",
                            "context.ctx_queue_body.data.created_at"
                          ],
                          "query": {
                            "bool": {
                              "must": [
                                {
                                  "match_all": {}
                                },
                                {
                                  "bool": {
                                    "should": [
                                      {
                                        "match_phrase": {
                                          "http_status": "502"
                                        }
                                      },
                                      {
                                        "match_phrase": {
                                          "http_status": "504"
                                        }
                                      }
                                    ],
                                    "minimum_should_match": 1
                                  }
                                },
                                {
                                  "match_phrase": {
                                    "http_host": {
                                      "query": "garasi.id"
                                    }
                                  }
                                },
                                {
                                  "match_phrase": {
                                    "request": {
                                      "query": "GET /api/"
                                    }
                                  }
                                },
                                {
                                  "range": {
                                    "@timestamp": {
                                      "gte": ' . $start_date . ',
                                      "lte": ' . $end_date . ',
                                      "format": "epoch_millis"
                                    }
                                  }
                                }
                              ],
                              "filter": [],
                              "should": [],
                              "must_not": []
                            }
                          },
                          "highlight": {
                            "pre_tags": [
                              "@kibana-highlighted-field@"
                            ],
                            "post_tags": [
                              "@/kibana-highlighted-field@"
                            ],
                            "fields": {
                              "*": {}
                            },
                            "fragment_size": 2147483647
                          }
                        }'
        );

        $client = new Client();
        $json = $client->post('https://kibana.garasi.id/_plugin/kibana/api/console/proxy?path=_search&method=POST',
            [
                'headers' => $headers,
                'body' => $query
            ]
        );

        $json = json_decode($json->getBody(), 1);
        $hits = $json['hits'];
        $total_hits = $hits['total'];

        $start_date = substr($start_date, 0, -3); // to cut the milli
        $end_date = substr($end_date, 0, -3);
        $start_date = date('Y-m-d H:i:s', $start_date);
        $end_date = date('Y-m-d H:i:s', $end_date);

        $uptimeReport->setAttribute(UptimeReport::ATTRIBUTE_START_DATE, $start_date);
        $uptimeReport->setAttribute(UptimeReport::ATTRIBUTE_END_DATE, $end_date);
        $uptimeReport->setAttribute(UptimeReport::ATTRIBUTE_TOTAL_ERROR, $total_hits);
        $uptimeReport->save();

        foreach ($hits['hits'] as $hit) {
            $source = $hit['_source'];
            $timestamp = $source['@timestamp'];
            $date_time = substr($timestamp, 0, -7);
            $request = $source['request'];

            UptimeDetail::firstOrCreate([
                UptimeDetail::ATTRIBUTE_UPTIME_REPORT_ID => $uptimeReport->getAttribute('id'),
                UptimeDetail::ATTRIBUTE_DATE_TIME => $date_time,
                UptimeDetail::ATTRIBUTE_REQUEST_NAME => $request
            ]);
        }

        $total = DB::table('uptime_details')
            ->select(DB::raw('count(*) as total_error'))
            ->groupBy('date_time')
            ->get();

        $downtime = 0;

        foreach ($total as $totol) {
            if ($totol < '100')
                $downtime = $downtime + 1;
        }

        $uptimeSummary->setAttribute(UptimeSummary::ATTRIBUTE_UPTIME_REPORT_ID, $uptimeReport->getAttribute('id'));
        $uptimeSummary->setAttribute(UptimeSummary::ATTRIBUTE_START_DATE, $start_date);
        $uptimeSummary->setAttribute(UptimeSummary::ATTRIBUTE_END_DATE, $end_date);
        $uptimeSummary->setAttribute(UptimeSummary::ATTRIBUTE_TOTAL_ERROR, $total_hits);
        $uptimeSummary->setAttribute(UptimeSummary::ATTRIBUTE_DOWNTIME, $downtime);
        $uptimeSummary->save();

        $response = [
            'id' => $uptimeSummary->getAttribute(UptimeSummary::ATTRIBUTE_ID),
            'start_date' => $uptimeSummary->getAttribute(UptimeSummary::ATTRIBUTE_START_DATE),
            'end_date' => $uptimeSummary->getAttribute(UptimeSummary::ATTRIBUTE_END_DATE),
            'total_error' => $uptimeSummary->getAttribute(UptimeSummary::ATTRIBUTE_TOTAL_ERROR),
            'downtime' => $uptimeSummary->getAttribute(UptimeSummary::ATTRIBUTE_DOWNTIME),
        ];

        return response()->json($response);
    }

    public function getUptimeDetails($id, UptimeDetail $uptimeDetail)
    {
        return UptimeDetail::where(UptimeDetail::ATTRIBUTE_UPTIME_REPORT_ID, $id)->get();
    }

    public function getUptimeHistory()
    {
        return UptimeSummary::all();
    }
}
