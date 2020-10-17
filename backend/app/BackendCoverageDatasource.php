<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BackendCoverageDatasource extends Model
{
    public $table = 'backend_datasource';

    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_TEST_FINISHED = 'test_finished';
    const ATTRIBUTE_TOTAL_COVERAGE = 'total_coverage';
    const ATTRIBUTE_LOC = 'loc';
    const ATTRIBUTE_NCLOC = 'ncloc';
    const ATTRIBUTE_CLASSES = 'classes';
    const ATTRIBUTE_METHOD = 'method';
    const ATTRIBUTE_STATEMENTS = 'statements';
    const ATTRIBUTE_NAMESPACE = 'namespace';
    const ATTRIBUTE_IGNORED_NAMESPACE = 'ignored_namespace';
    const ATTRIBUTE_TARGET_NAMESPACE = 'target_namespace';
    const ATTRIBUTE_TARGET_BELOW_90PERCENT = 'target_below_90pct';
    const ATTRIBUTE_TARGET_COVERAGE = 'target_coverage';
    const ATTRIBUTE_TARGET_BELOW_95PERCENT = 'target_below_95pct';
    const ATTRIBUTE_TARGET_COVERAGE_95PLUS = 'target_coverage_95pctplus';


    protected $guarded;

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_TEST_FINISHED,
        self::ATTRIBUTE_TOTAL_COVERAGE,
        self::ATTRIBUTE_LOC,
        self::ATTRIBUTE_NCLOC,
        self::ATTRIBUTE_CLASSES,
        self::ATTRIBUTE_METHOD,
        self::ATTRIBUTE_STATEMENTS,
        self::ATTRIBUTE_NAMESPACE,
        self::ATTRIBUTE_IGNORED_NAMESPACE,
        self::ATTRIBUTE_TARGET_NAMESPACE,
        self::ATTRIBUTE_TARGET_BELOW_90PERCENT,
        self::ATTRIBUTE_TARGET_COVERAGE,
        self::ATTRIBUTE_TARGET_BELOW_95PERCENT,
        self::ATTRIBUTE_TARGET_COVERAGE_95PLUS
    ];
}
