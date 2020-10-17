<?php

namespace App\Http\Controllers;

use App\BackendCoverage;
use App\ScheduleJobs;
use App\ScheduleJobsDatasource;
use App\Sentry;
use App\UptimeDetail;
use App\UptimeReport;
use App\UptimeSummary;
use Illuminate\Http\Request;

class ScheduleJobsController extends Controller
{
    public function showScheduleJobs()
    {
        return ScheduleJobs::all();
    }

    public function getData(Request $request, ScheduleJobs $scheduleJobs, ScheduleJobsDatasource $scheduleJobsDatasource)
    {
        $start_date = $request->input('date');
        $start_date = substr($start_date, 0, -3); // to cut the milli
        $start_date = date('Y-m-d', $start_date);

        $first = ScheduleJobsDatasource::where(ScheduleJobsDatasource::ATTRIBUTE_START, $start_date)->first();
        if ($first) {
            $first = $first->toArray();
        }

        $id = $first['id'];
        $start = $first['start'];
        $end_date = $first['end'];
        $failed_jobs = $first['failed_jobs'];
        $note = $first['note'];

        $scheduleJobs->setAttribute(ScheduleJobs::ATTRIBUTE_ID, $id);
        $scheduleJobs->setAttribute(ScheduleJobs::ATTRIBUTE_START, $start);
        $scheduleJobs->setAttribute(ScheduleJobs::ATTRIBUTE_END, $end_date);
        $scheduleJobs->setAttribute(ScheduleJobs::ATTRIBUTE_FAILED_JOBS, $failed_jobs);
        $scheduleJobs->setAttribute(ScheduleJobs::ATTRIBUTE_NOTE, $note);
        $scheduleJobs->save();

        $response = [
            'id' => $scheduleJobs->getAttribute(ScheduleJobs::ATTRIBUTE_ID),
            'start_date' => $scheduleJobs->getAttribute(ScheduleJobs::ATTRIBUTE_START),
            'end_date' => $scheduleJobs->getAttribute(ScheduleJobs::ATTRIBUTE_END),
            'failed_jobs' => $scheduleJobs->getAttribute(ScheduleJobs::ATTRIBUTE_FAILED_JOBS),
            'note' => $scheduleJobs->getAttribute(ScheduleJobs::ATTRIBUTE_NOTE)
        ];

        return response()->json($response);
    }

    public function deleteSJ(ScheduleJobs $scheduleJobs, $id)
    {
        $scheduleJobs = ScheduleJobs::findOrFail($id);
        $scheduleJobs->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }

    public function hehe(Sentry $sentry, $id)
    {
        $sentry = Sentry::findOrFail($id);
        $sentry->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }

    public function deleteUptime(UptimeReport $uptimeReport, UptimeSummary $uptimeSummary, UptimeDetail $uptimeDetail, $id)
    {
        $uptimeSummary = UptimeSummary::findOrFail($id);
        $uptimeSummary->delete();
        return response()->json([
            'message' => 'user has been deleted'
        ], 200);
    }

    public function deleteBC(BackendCoverage $backendCoverage, $id)
    {
        $backendCoverage = BackendCoverage::findOrFail($id);
        $backendCoverage->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }
}
