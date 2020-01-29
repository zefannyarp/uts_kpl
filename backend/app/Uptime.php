<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Uptime extends Model
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

    public $table = 'uptime_summary';

    protected $guarded;

    public function uptime()
    {
        $this->hasMany(UptimeDetail::class, UptimeDetail::ATTRIBUTE_UPTIME_SUMMARY_ID, 'id');
    }

    public function uptime_report()
    {
        $this->hasOne(UptimeReport::class, UptimeReport::ATTRIBUTE_UPTIME_SUMMARY_ID, 'id');
    }

}

