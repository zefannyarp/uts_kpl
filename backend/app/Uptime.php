<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Uptime extends Model
{
    const ATTRIBUTE_START_DATE = 'start_date';
    const ATTRIBUTE_END_DATE = 'end_date';
    const ATTRIBUTE_TOTAL_ERROR = 'total_error';
//    const ATTRIBUTE_DOWNTIME = 'downtime';
    public $table = 'uptime_summary';
    protected $guarded;

    public function uptime()
    {
        $this->hasMany(UptimeDetail::class, UptimeDetail::ATTRIBUTE_SUMMARY_ID, 'id');
    }

}

