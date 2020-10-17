<?php

namespace App\Http\Controllers;

use App\BackendCoverageDatasource;
use App\BackendResponseTime;
use App\BackendResponseTimeDatasource;
use App\User;
use Illuminate\Http\Request;

class BackendResponseTimeController extends Controller
{
    public function showBackendResponseTimeData(BackendResponseTimeDatasource $backendResponseTimeDatasource) {
        $u = BackendResponseTime::all();
        return $u;
    }

    public function getData(Request $request, BackendResponseTime $backendResponseTime, BackendResponseTimeDatasource $backendResponseTimeDatasource) {
        $date = $request->input('date');
        $date = substr($date, 0, -3); // to cut the milli
        $date = date('Y-m-d', $date);

        $backendResponseTimeDatasource = BackendResponseTimeDatasource::where(BackendResponseTimeDatasource::ATTRIBUTE_DATE, $date)->first();
        if ($backendResponseTimeDatasource) {
            $backendResponseTimeDatasource = $backendResponseTimeDatasource->toArray();
        }
        dd($backendResponseTimeDatasource);
        $id = $backendResponseTimeDatasource->id;
        $date = $backendResponseTimeDatasource->date;
        $vehicles_short_id = $backendResponseTimeDatasource->vehicles_short_id;
        $vehicles = $backendResponseTimeDatasource->vehicles;
        $get = $backendResponseTimeDatasource->get;
        $post = $backendResponseTimeDatasource->post;

        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_ID, $id);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_DATE, $date);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_VEHICLES_SHORTID, $vehicles_short_id);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_VEHICLES, $vehicles);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_GET, $get);
        $backendResponseTime->setAttribute(BackendResponseTime::ATTRIBUTE_POST, $post);
        $backendResponseTime->save();

        return response()->json($backendResponseTime);
    }
    public function deleteBackendResponseTime(BackendResponseTime $backendResponseTime, $id)
    {
        $backendResponseTime = BackendResponseTime::findOrFail($id);
        $backendResponseTime->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }
}
