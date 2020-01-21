<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Uptime extends Model
{
    protected $guarded;

    public $table = 'uptime_summary';

    public function Details()
    {
        return $this->hasMany(UptimeDetail::class);
    }

}

