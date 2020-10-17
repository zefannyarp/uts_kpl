<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sentry extends Model
{
    public $table = 'sentry';

    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_DATE = 'date';
    const ATTRIBUTE_TOTAL = 'total';
    const ATTRIBUTE_NEW = 'new';
    const ATTRIBUTE_HIGH = 'high';

    protected $guarded;

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_DATE,
        self::ATTRIBUTE_TOTAL,
        self::ATTRIBUTE_NEW,
        self::ATTRIBUTE_HIGH
    ];
}
