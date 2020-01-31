<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frontend extends Model
{
    public $table = 'frontend_performance';

    const ATTRIBUTE_ID = 'id';
//    const ATTRIBUTE_USER_ID = 'user_id';
    const ATTRIBUTE_START_DATE = 'start_date';
    const ATTRIBUTE_END_DATE = 'end_date';
    const ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME = 'avgPageLoadTime';

    protected $guarded;

    protected $fillable = [
        self::ATTRIBUTE_ID,
//        self::ATTRIBUTE_USER_ID,
        self::ATTRIBUTE_START_DATE,
        self::ATTRIBUTE_END_DATE,
        self::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME
    ];

//    public function user()
//    {
//        return $this->belongsTo(User::class, self::ATTRIBUTE_USER_ID, User::ATTRIBUTE_ID);
//    }
}
