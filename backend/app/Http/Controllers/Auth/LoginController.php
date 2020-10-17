<?php

namespace App\Http\Controllers\Auth;

use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Session;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {

        $credentials = request(['email', 'password']);

        if (Auth::attempt($credentials)) {
            $currentUser = auth()->user();
            Auth::login($currentUser);
            $token = auth()->attempt($credentials);
            $role = $currentUser['role'];
            $response = [
                'token' => $token,
                'role' => $role
            ];

            return response()->json($response, 201);
//            return (new UserResource($currentUser))->additional([
//                'meta' => [
//                    'token' => $currentUser->api_token,
//                    'status' => 200,
//                    'current user' => Auth::user()
//                ]
//            ]);
//        }
//
//        return response()->json([
//            'error' => 'Your credentials does not match',
//        ], 401);
        }

//    public function logout() {
//        JWTAuth::invalidate($token);
//
//        return response()->json([
//            'status' => 'success',
//            'message' => 'logout'
//        ], 200);
//    }
    }}

