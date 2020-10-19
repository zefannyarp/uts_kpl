<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    protected $auth;

    public function __construct(Factory $auth)
    {
        $this->auth = $auth;
    }

    public function handle($request, Closure $next)
    {
        if (!Auth::check()){
        return redirect(route('login'));
    }
        return $next($request);
    }
}
