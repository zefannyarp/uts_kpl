<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UptimeReport extends Model
{
    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_START_DATE = 'start_date';
    const ATTRIBUTE_END_DATE = 'end_date';
    const ATTRIBUTE_TOTAL_ERROR = 'total_error';

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_START_DATE,
        self::ATTRIBUTE_END_DATE,
        self::ATTRIBUTE_TOTAL_ERROR,
    ];

    public $table = 'uptime_report';

    protected $guarded;

    public function uptime_detail()
    {
        $this->hasMany(UptimeDetail::class, UptimeDetail::ATTRIBUTE_UPTIME_REPORT_ID, 'id');
    }

    public function uptime_summary()
    {
        $this->hasOne(UptimeSummary::class, UptimeSummary::ATTRIBUTE_UPTIME_REPORT_ID, 'id');
    }
}

