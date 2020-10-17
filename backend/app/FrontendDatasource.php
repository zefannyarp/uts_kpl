<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FrontendDatasource extends Model
{
    public $table = 'frontend_datasource';

    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_DATE = 'date';
    const ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME = 'avgPageLoadTime';

    protected $guarded;

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_DATE,
        self::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME
    ];
}
