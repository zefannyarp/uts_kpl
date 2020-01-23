<?php

namespace App;

use GuzzleHttp\Client;
use http\Env\Request;
use Illuminate\Database\Eloquent\Model;

class Uptime extends Model
{
    protected $guarded;
    const ATTRIBUTE_START_DATE = 'start_date';
    const ATTRIBUTE_END_DATE = 'end_date';
    const ATTRIBUTE_TOTAL_ERROR = 'total_error';

    public $table = 'uptime_summary';

    public function uptime()
    {
        $this->hasMany(UptimeDetail::class, UptimeDetail::ATTRIBUTE_SUMMARY_ID, 'id');
    }

}

