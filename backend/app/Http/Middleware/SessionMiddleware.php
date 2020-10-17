<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SessionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->session()->has('users')) {
            return $next($request);
        }
        return response()->json(['status' => 'unauthorized'], 401);

    }
}
