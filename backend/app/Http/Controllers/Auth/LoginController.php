<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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

    public function action(Request $request)
    {
        try {
            $this->validate($request, [
                'email' => 'required|email',
                'password' => 'required|min:8',
            ]);
        } catch (ValidationException $e) {
        }

        if(auth()->attempt($request->only('email', 'password'))) {
            $currentUser = auth()->user();
            return (new UserResource($currentUser))->additional([
                'meta' => [
                    'token' => $currentUser->api_token
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
}
