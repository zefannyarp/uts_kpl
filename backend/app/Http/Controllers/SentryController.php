<?php

namespace App\Http\Controllers;

use App\BackendCoverageDatasource;
use App\ScheduleJobs;
use App\Sentry;
use App\SentryDatasource;
use App\User;
use Illuminate\Http\Request;

class SentryController extends Controller
{
    public function showSentry() {
        return Sentry::all();
    }

    public function getData(Request $request, Sentry $sentry, SentryDatasource $sentryDatasource) {
        $date = $request->input('date');
        $date = substr($date, 0, -3); // to cut the milli
        $date = date('Y-m-d', $date);

        $sentryDatasource = SentryDatasource::where(SentryDatasource::ATTRIBUTE_DATE, $date)->first();
        if ($sentryDatasource) {
            $sentryDatasource = $sentryDatasource->toArray();
        }
        $id = $sentryDatasource['id'];
        $date = $sentryDatasource['date'];
        $total = $sentryDatasource['total'];
        $new = $sentryDatasource['new'];
        $high = $sentryDatasource['high'];

        $sentry->setAttribute(Sentry::ATTRIBUTE_ID, $id);
        $sentry->setAttribute(Sentry::ATTRIBUTE_DATE, $date);
        $sentry->setAttribute(Sentry::ATTRIBUTE_TOTAL, $total);
        $sentry->setAttribute(Sentry::ATTRIBUTE_NEW, $new);
        $sentry->setAttribute(Sentry::ATTRIBUTE_HIGH, $high);
        $sentry->save();

        $response = [
          'id' => $sentry->getAttribute(Sentry::ATTRIBUTE_ID),
          'date' => $sentry->getAttribute(Sentry::ATTRIBUTE_DATE),
          'total' => $sentry->getAttribute(Sentry::ATTRIBUTE_TOTAL),
          'new' => $sentry->getAttribute(Sentry::ATTRIBUTE_NEW),
          'high' => $sentry->getAttribute(Sentry::ATTRIBUTE_HIGH)
        ];
        return response()->json($response);
    }

    public function hehe(Sentry $sentry, $id)
    {
        $sentry = Sentry::findOrFail($id);
        $sentry->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }
}
