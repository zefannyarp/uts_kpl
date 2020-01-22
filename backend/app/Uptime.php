<?php

namespace App;

use GuzzleHttp\Client;
use http\Env\Request;
use Illuminate\Database\Eloquent\Model;

class Uptime extends Model
{
    protected $guarded;

    public $table = 'uptime_summary';

//    public function getData(Request $request)
//    {
//        $start_date = $request->input('start_date');
//        $end_date = $request->input('end_date');
//
//        $headers = array(
//            'kbn-xsrf' => true,
//            'Content-Type' => 'application/json',
//            'Accept' => 'application/json',
//            'NETOAPI_ACTION' => 'GetOrder',
//            'NETOAPI_KEY' => env('NETO_API_KEY')
//        );
//
//        $GetOrder = ('{
//                          "version": true,
//                          "size": 500,
//                          "sort": [
//                            {
//                              "@timestamp": {
//                                "order": "asc",
//                                "unmapped_type": "boolean"
//                              }
//                            }
//                          ],
//                          "_source": {
//                            "excludes": []
//                          },
//                          "aggs": {
//                            "2": {
//                              "date_histogram": {
//                                "field": "@timestamp",
//                                "interval": "1m",
//                                "time_zone": "Asia/Jakarta",
//                                "min_doc_count": 1
//                              }
//                            }
//                          },
//                          "stored_fields": [
//                            "*"
//                          ],
//                          "script_fields": {},
//                          "docvalue_fields": [
//                            "@timestamp",
//                            "context.ctx_queue_body.data.created_at"
//                          ],
//                          "query": {
//                            "bool": {
//                              "must": [
//                                {
//                                  "match_all": {}
//                                },
//                                {
//                                  "bool": {
//                                    "should": [
//                                      {
//                                        "match_phrase": {
//                                          "http_status": "502"
//                                        }
//                                      },
//                                      {
//                                        "match_phrase": {
//                                          "http_status": "504"
//                                        }
//                                      }
//                                    ],
//                                    "minimum_should_match": 1
//                                  }
//                                },
//                                {
//                                  "match_phrase": {
//                                    "http_host": {
//                                      "query": "garasi.id"
//                                    }
//                                  }
//                                },
//                                {
//                                  "match_phrase": {
//                                    "request": {
//                                      "query": "GET /api/"
//                                    }
//                                  }
//                                },
//                                {
//                                  "range": {
//                                    "@timestamp": {
//                                      "gte": ' . $start_date . ',
//                                      "lte": ' . $end_date . ',
//                                      "format": "epoch_millis"
//                                    }
//                                  }
//                                }
//                              ],
//                              "filter": [],
//                              "should": [],
//                              "must_not": []
//                            }
//                          },
//                          "highlight": {
//                            "pre_tags": [
//                              "@kibana-highlighted-field@"
//                            ],
//                            "post_tags": [
//                              "@/kibana-highlighted-field@"
//                            ],
//                            "fields": {
//                              "*": {}
//                            },
//                            "fragment_size": 2147483647
//                          }
//                        }'
//        );
//
//        $client = new Client();
//        $json = $client->post('https://kibana.garasi.id/_plugin/kibana/api/console/proxy?path=_search&method=POST',
//            [
//                'headers' => $headers,
//                'body' => $GetOrder
//            ]
//        );
//
//        $poop = json_decode($json->getBody(), 1);
//        $kocak = $poop['hits'];
//        $males = $kocak['total'];
//        $a = $kocak['hits'];
//
//        $start_date = substr($start_date, 0, -3); // to cut the milli
//        $end_date = substr($end_date, 0, -3);
//        $start_date = date('Y-m-d H:i:s', $start_date);
//        $end_date = date('Y-m-d H:i:s', $end_date);
//    }

}

