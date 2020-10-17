<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UptimeDetail extends Model
{
    protected $guarded;

    const ATTRIBUTE_UPTIME_REPORT_ID = 'uptime_summary_id';
    const ATTRIBUTE_DATE_TIME = 'date_time';
    const ATTRIBUTE_REQUEST_NAME = 'request_name';

    protected $fillable = [
        self::ATTRIBUTE_DATE_TIME,
        self::ATTRIBUTE_REQUEST_NAME,
        self::ATTRIBUTE_UPTIME_REPORT_ID,
    ];

    public $table = 'uptime_detail';

    public function uptime_report()
    {
        return $this->belongsTo(UptimeReport::class, self::ATTRIBUTE_UPTIME_REPORT_ID, 'id');
    }
}
