<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use Notifiable;

    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_NAME = 'name';
    const ATTRIBUTE_EMAIL = 'email';
    const ATTRIBUTE_PASSWORD = 'password';
    const ATTRIBUTE_API_TOKEN = 'api_token';

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_NAME,
        self::ATTRIBUTE_EMAIL,
        self::ATTRIBUTE_PASSWORD,
        self::ATTRIBUTE_API_TOKEN
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function generateToken(User $user)
    {
        $this->api_token = Str::random(60);
        $this->save();

        return $this->api_token;
    }

    public function Uptime_Summary()
    {
        return $this->hasMany(UptimeReport::class, UptimeSummary::ATTRIBUTE_UPTIME_REPORT_ID);
    }

    public function Frontend_Performance()
    {
        return $this->hasMany(Frontend::class, Frontend::ATTRIBUTE_USER_ID);
    }
}
