<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UptimeDetail extends Model
{
    protected $primaryKey = 'summary_id';
    protected $guarded;
    const ATTRIBUTE_UPTIME_SUMMARY_ID = 'uptime_summary_id';
    const ATTRIBUTE_DATE_TIME = 'date_time';
    const ATTRIBUTE_REQUEST = 'request_name';


    protected $fillable = [
        self::ATTRIBUTE_DATE_TIME,
        self::ATTRIBUTE_REQUEST,
        self::ATTRIBUTE_UPTIME_SUMMARY_ID,
    ];

    public $table = 'uptime_details';

    public function uptime()
    {
        return $this->belongsTo(Uptime::class, self::ATTRIBUTE_UPTIME_SUMMARY_ID, 'id');
    }
}
