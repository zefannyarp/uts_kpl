<?php

namespace App;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    const ATTRIBUTE_ROLE = 'role';
    const ATTRIBUTE_ID = 'id';
    const ATTRIBUTE_NAME = 'name';
    const ATTRIBUTE_EMAIL = 'email';
    const ATTRIBUTE_PASSWORD = 'password';
    const ATTRIBUTE_API_TOKEN = 'api_token';

    protected $fillable = [
        self::ATTRIBUTE_ROLE,
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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
