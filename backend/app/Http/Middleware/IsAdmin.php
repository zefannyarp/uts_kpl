<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class IsAdmin
{
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (User::ATTRIBUTE_ROLE == 'admin') {
                return $next($request);
            }
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['status' => 'Token is Invalid']);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['status' => 'Token is Expired']);
            }else{
                return response()->json(['status' => 'Authorization Token not found']);
            }
        }

        return response()->json(['status' => 'You are not an admin']);
    }
}
