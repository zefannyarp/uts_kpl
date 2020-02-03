<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if(Auth::attempt($request->only('email', 'password'))) {
            $currentUser = auth()->user();
            Auth::login($currentUser);
            return (new UserResource($currentUser))->additional([
                'meta' => [
                    'token' => $currentUser->api_token,
                    'status' => 200,
                    'current user' => Auth::user()
                ]
            ]);
        }

        return response()->json([
            'error' => 'Your credentials does not match',
        ], 401);
    }

    public function logout(Request $request) {
        Auth::logout();
        return response()->json([
           'logout' => 'User has logged out'
        ]);
    }

    public function redirectTo()
    {
        return response()->json([
           'unauthorized' => 'you have no rights to access this page'
        ], 401);
    }
}
