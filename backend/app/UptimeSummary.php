<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UptimeSummary extends Model
{
    const ATTRIBUTE_ID = 'id';
//    const ATTRIBUTE_USER_ID = 'user_id';
    const ATTRIBUTE_UPTIME_REPORT_ID = 'uptime_report_id';
    const ATTRIBUTE_START_DATE = 'start_date';
    const ATTRIBUTE_END_DATE = 'end_date';
    const ATTRIBUTE_TOTAL_ERROR = 'total_error';
    const ATTRIBUTE_DOWNTIME = 'downtime';

    protected $fillable = [
      self::ATTRIBUTE_ID,
//      self::ATTRIBUTE_USER_ID,
      self::ATTRIBUTE_UPTIME_REPORT_ID,
      self::ATTRIBUTE_START_DATE,
      self::ATTRIBUTE_END_DATE,
      self::ATTRIBUTE_TOTAL_ERROR,
      self::ATTRIBUTE_DOWNTIME
    ];

    public $table = 'uptime_summary';

    protected $guarded;

    public function uptime_report()
    {
        $this->hasOne(UptimeReport::class, UptimeReport::ATTRIBUTE_ID, self::ATTRIBUTE_UPTIME_REPORT_ID);
    }
}
