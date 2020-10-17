<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduleJobs extends Model
{
    public $table = 'schedule_jobs';

    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_START = 'start';
    const ATTRIBUTE_END = 'end';
    const ATTRIBUTE_FAILED_JOBS = 'failed_jobs';
    const ATTRIBUTE_NOTE = 'note';

    protected $guarded;

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_START,
        self::ATTRIBUTE_END,
        self::ATTRIBUTE_FAILED_JOBS,
        self::ATTRIBUTE_NOTE
    ];
}
