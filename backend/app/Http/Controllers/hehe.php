<?php

namespace App\Http\Controllers;

use App\BackendResponseTime;
use App\BackendResponseTimeDatasource;
use Illuminate\Http\Request;

class hehe extends Controller
{
    public function showBackendResponseTimeData(BackendResponseTime $backendResponseTime) {
        $response = [
            'id' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_ID),
            'date' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_DATE),
            'vehicles_short_id' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_VEHICLES_SHORTID),
            'vehicles' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_VEHICLES),
            'get' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_GET),
            'post' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_POST)
        ];

        return response()->json($response);
    }

    public function getData(Request $request, BackendResponseTime $backendResponseTime) {
        $date = $request->input('date');
        $date = substr($date, 0, -3); // to cut the milli
        $date = date('Y-m-d', $date);

        $backendResponseTimeDatasource = BackendResponseTimeDatasource::where(BackendResponseTimeDatasource::ATTRIBUTE_DATE, $date)->first();
        if ($backendResponseTimeDatasource) {
            $backendResponseTimeDatasource = $backendResponseTimeDatasource->toArray();
        }

        $id = $backendResponseTimeDatasource['id'];
        $date = $backendResponseTimeDatasource['date'];
        $vehicles_short_id = $backendResponseTimeDatasource['vehicles_short_id'];
        $vehicles = $backendResponseTimeDatasource['vehicles'];
        $get = $backendResponseTimeDatasource['get'];
        $post = $backendResponseTimeDatasource['post'];

        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_ID, $id);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_DATE, $date);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_VEHICLES_SHORTID, $vehicles_short_id);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_VEHICLES, $vehicles);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_GET, $get);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_POST, $post);
        $backendResponseTime->save();

        $response = [
            'id' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_ID),
            'date' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_DATE),
            'vehicles_short_id' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_VEHICLES_SHORTID),
            'vehicles' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_VEHICLES),
            'get' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_GET),
            'post' => $backendResponseTime->getAttribute(BackendResponseTime::ATTRIBUTE_POST)
        ];

        return response()->json($response);
    }
    public function deleteBackendResponseTime($id)
    {
        $backendResponseTime = BackendResponseTime::findOrFail($id);
        $backendResponseTime->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }

}
