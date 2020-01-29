<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frontend extends Model
{
    public $table = 'frontend_performance';

    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_DATE_TIME = 'date_time';
    const ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME = 'avgPageLoadTime';

    protected $guarded;

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_DATE_TIME,
        self::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME
    ];
}
