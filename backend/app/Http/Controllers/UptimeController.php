<?php

namespace App\Http\Controllers;

use App\Uptime;
use App\UptimeDetail;
use App\UptimeReport;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UptimeController extends Controller
{
    public function getUptimeSummary(Request $request, Uptime $uptime, UptimeDetail $uptimeDetail, UptimeReport $uptimeReport)
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

        $GetOrder = ('{
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
                'body' => $GetOrder
            ]
        );

        $poop = json_decode($json->getBody(), 1);
        $kocak = $poop['hits'];
        $males = $kocak['total'];

        $start_date = substr($start_date, 0, -3); // to cut the milli
        $end_date = substr($end_date, 0, -3);
        $start_date = date('Y-m-d H:i:s', $start_date);
        $end_date = date('Y-m-d H:i:s', $end_date);

        $uptime->setAttribute(Uptime::ATTRIBUTE_START_DATE, $start_date);
        $uptime->setAttribute(Uptime::ATTRIBUTE_END_DATE, $end_date);
        $uptime->setAttribute(Uptime::ATTRIBUTE_TOTAL_ERROR, $males);
        $uptime->save();

        foreach ($kocak['hits'] as $hit) {
            $e = $hit['_source'];
            $f = $e['@timestamp'];
            $c = substr($f, 0, -7);
            $d = $e['request'];

            UptimeDetail::firstOrCreate([
                UptimeDetail::ATTRIBUTE_UPTIME_SUMMARY_ID => $uptime->getAttribute('id'),
                UptimeDetail::ATTRIBUTE_DATE_TIME => $c,
                UptimeDetail::ATTRIBUTE_REQUEST => $d
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

        $uptimeReport->setAttribute(UptimeReport::ATTRIBUTE_UPTIME_SUMMARY_ID, $uptime->getAttribute('id'));
        $uptimeReport->setAttribute(UptimeReport::ATTRIBUTE_START_DATE, $start_date);
        $uptimeReport->setAttribute(UptimeReport::ATTRIBUTE_END_DATE, $end_date);
        $uptimeReport->setAttribute(UptimeReport::ATTRIBUTE_TOTAL_ERROR, $males);
        $uptimeReport->setAttribute(UptimeReport::ATTRIBUTE_DOWNTIME, $downtime);
        $uptimeReport->save();

        $promotion = DB::table('uptime_summary')->latest('id')->first();
        return json_encode($promotion);
//        return UptimeReport::
//        $response = [
//            'start_date' => $start_date,
//            'end_date' => $end_date,
//            'total_error' => $males,
//            'downtime' => $downtime
//        ];

//        $uptime->setAttribute(Uptime::ATTRIBUTE_DOWNTIME, $downtime);
//        $uptime->save();
//        dd($uptime);

//        return response()->json($response, 200);
    }

    public function getUptimeDetails($id, UptimeDetail $uptimeDetail)
    {
        return UptimeDetail::where(UptimeDetail::ATTRIBUTE_UPTIME_SUMMARY_ID, $id)->get();
    }

    public function saveDataToDatabase(Uptime $uptime, Request $request)
    {

    }

    public function getUptimeHistory()
    {
        return Uptime::all();
    }
}
