<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BackendResponseTime extends Model
{
    public $table = 'backend_response_time';

    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_DATE = 'date';
    const ATTRIBUTE_VEHICLES_SHORTID = 'vehicles_short_id';
    const ATTRIBUTE_VEHICLES = 'vehicles';
    const ATTRIBUTE_GET = 'get';
    const ATTRIBUTE_POST = 'post';

    protected $guarded;

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_DATE,
        self::ATTRIBUTE_VEHICLES_SHORTID,
        self::ATTRIBUTE_VEHICLES,
        self::ATTRIBUTE_GET,
        self::ATTRIBUTE_POST
    ];
}
