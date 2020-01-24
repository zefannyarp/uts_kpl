<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UptimeReport extends Model
{
    const ATTRIBUTE_UPTIME_SUMMARY_ID = 'uptime_summary_id';
    const ATTRIBUTE_START_DATE = 'start_date';
    const ATTRIBUTE_END_DATE = 'end_date';
    const ATTRIBUTE_TOTAL_ERROR = 'total_error';
    const ATTRIBUTE_DOWNTIME = 'downtime';

    public $table = 'uptime_report';

    protected $guarded;

    public function uptime()
    {
        $this->hasOne(Uptime::class, Uptime::ATTRIBUTE_ID, self::ATTRIBUTE_UPTIME_SUMMARY_ID);
    }
}
