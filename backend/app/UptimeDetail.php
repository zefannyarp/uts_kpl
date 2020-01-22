<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UptimeDetail extends Model
{
    protected $guarded;

    protected $fillable = ['date_time', 'request'];

    public $table = 'uptime_details';

    public function Summary()
    {
        return $this->belongsTo(Uptime::class);
    }
}
