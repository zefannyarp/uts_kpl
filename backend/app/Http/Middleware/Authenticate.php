<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    protected function redirect($request, Closure $next, $role)
    {
        if (! Auth::check()) {
            return route('login');
        }

        return $next($request);
    }
}
