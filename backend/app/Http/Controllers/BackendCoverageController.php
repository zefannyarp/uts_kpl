<?php

namespace App\Http\Controllers;

use App\BackendCoverage;
use App\BackendCoverageDatasource;
use App\ScheduleJobs;
use Illuminate\Http\Request;

class BackendCoverageController extends Controller
{
    public function showBackendCoverage()
    {
        return BackendCoverageDatasource::all();
    }

    public function getDaasdta(Request $request)
    {
        $date = $request->input('date');

        BackendCoverageDatasource::where(BackendCoverageDatasource::ATTRIBUTE_TEST_FINISHED, $date)([
            BackendCoverage::ATTRIBUTE_ID => BackendCoverageDatasource::ATTRIBUTE_ID,
            BackendCoverage::ATTRIBUTE_TEST_FINISHED => BackendCoverageDatasource::ATTRIBUTE_TEST_FINISHED,
            BackendCoverage::ATTRIBUTE_TOTAL_COVERAGE => BackendCoverageDatasource::ATTRIBUTE_TOTAL_COVERAGE,
            BackendCoverage::ATTRIBUTE_LOC => BackendCoverageDatasource::ATTRIBUTE_LOC,
            BackendCoverage::ATTRIBUTE_NLOC => BackendCoverageDatasource::ATTRIBUTE_NLOC,
            BackendCoverage::ATTRIBUTE_CLASSES => BackendCoverageDatasource::ATTRIBUTE_CLASSES,
            BackendCoverage::ATTRIBUTE_METHOD => BackendCoverageDatasource::ATTRIBUTE_METHOD,
            BackendCoverage::ATTRIBUTE_STATEMENTS => BackendCoverageDatasource::ATTRIBUTE_STATEMENTS,
            BackendCoverage::ATTRIBUTE_NAMESPACE => BackendCoverageDatasource::ATTRIBUTE_NAMESPACE,
            BackendCoverage::ATTRIBUTE_IGNORED_NAMESPACE => BackendCoverageDatasource::ATTRIBUTE_IGNORED_NAMESPACE,
            BackendCoverage::ATTRIBUTE_TARGET_NAMESPACE => BackendCoverageDatasource::ATTRIBUTE_TARGET_NAMESPACE,
            BackendCoverage::ATTRIBUTE_TARGET_BELOW_90percent => BackendCoverageDatasource::ATTRIBUTE_TARGET_BELOW_90percent,
            BackendCoverage::ATTRIBUTE_TARGET_COVERAGE => BackendCoverageDatasource::ATTRIBUTE_TARGET_COVERAGE,
            BackendCoverage::ATTRIBUTE_TARGET_BELOW_95percent => BackendCoverageDatasource::ATTRIBUTE_TARGET_BELOW_95percent,
            BackendCoverage::ATTRIBUTE_TARGET_COVERAGE_95plus => BackendCoverageDatasource::ATTRIBUTE_TARGET_COVERAGE_95plus
        ]);
    }

    public function getData(Request $request, BackendCoverage $backendCoverage)
    {
        $date = $request->input('date');
        $date = substr($date, 0, -3); // to cut the milli
        $date = date('Y-m-d', $date);

        $backendCoverageDatasource = BackendCoverageDatasource::where(BackendCoverageDatasource::ATTRIBUTE_TEST_FINISHED, $date)->first();
        if ($backendCoverageDatasource) {
            $backendCoverageDatasource = $backendCoverageDatasource->toArray();
        }

        $id = $backendCoverageDatasource['id'];
        $total_coverage = $backendCoverageDatasource['total_coverage'];
        $loc = $backendCoverageDatasource['loc'];
        $ncloc = $backendCoverageDatasource['ncloc'];
        $classes = $backendCoverageDatasource['classes'];
        $method = $backendCoverageDatasource['method'];
        $statements = $backendCoverageDatasource['statements'];
        $namespace = $backendCoverageDatasource['namespace'];
        $ignored_namespace = $backendCoverageDatasource['ignored_namespace'];
        $target_namespace = $backendCoverageDatasource['target_namespace'];
        $target_below_90pct = $backendCoverageDatasource['target_below_90pct'];
        $target_coverage = $backendCoverageDatasource['target_coverage'];
        $target_below_95pct = $backendCoverageDatasource['target_below_95pct'];
        $target_coverage_95pctplus = $backendCoverageDatasource['target_coverage_95pctplus'];

        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_ID, $id);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_TEST_FINISHED, $date);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_TOTAL_COVERAGE, $total_coverage);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_LOC, $loc);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_NCLOC, $ncloc);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_CLASSES, $classes);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_METHOD, $method);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_STATEMENTS, $statements);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_NAMESPACE, $namespace);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_IGNORED_NAMESPACE, $ignored_namespace);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_TARGET_NAMESPACE, $target_namespace);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_TARGET_BELOW_90percent, $target_below_90pct);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_TARGET_COVERAGE, $target_coverage);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_TARGET_BELOW_95percent, $target_below_95pct);
        $backendCoverage->setAttribute(BackendCoverage::ATTRIBUTE_TARGET_COVERAGE_95plus, $target_coverage_95pctplus);
        $backendCoverage->save();

        $response = [
            'id' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_ID),
            'test_finished' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_TEST_FINISHED),
            'total_coverage' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_TOTAL_COVERAGE),
            'loc' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_LOC),
            'ncloc' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_NCLOC),
            'classes' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_CLASSES),
            'method' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_METHOD),
            'statements' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_STATEMENTS),
            'namespace' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_NAMESPACE),
            'ignored_namespace' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_IGNORED_NAMESPACE),
            'target_namespace' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_TARGET_NAMESPACE),
            'target_below_90pct' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_TARGET_BELOW_90percent),
            'target_coverage' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_TARGET_COVERAGE),
            'target_below_95pct' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_TARGET_BELOW_95percent),
            'target_coverage_95pctplus' => $backendCoverage->getAttribute(BackendCoverage::ATTRIBUTE_TARGET_COVERAGE_95plus)
        ];
        return response()->json($response);
    }

    public function deleteBackendCoverage($id)
    {
        $backendCoverage = BackendCoverage::findOrFail($id);
        $backendCoverage->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }

    public function bodo($id)
    {
        $backendCoverage = BackendCoverage::findOrFail($id);
        $backendCoverage->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }

    public function deleteSJ($id)
    {
        $scheduleJobs = ScheduleJobs::findOrFail($id);
        $scheduleJobs->delete();
        return response()->json([
            'message' => 'data has been deleted'
        ], 200);
    }
}
