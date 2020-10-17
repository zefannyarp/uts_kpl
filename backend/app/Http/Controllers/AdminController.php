<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminController extends Controller
{
    public function addUser(Request $request, User $user)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => 'required|string|min:6|confirmed',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json($validator->errors()->toJson(), 400);
        // }

//        $user = User::create([
//            'name' => $request->get('name'),
//            'email' => $request->get('email'),
//            'password' => Hash::make($request->get('password')),
//        ]);

        // $user->setAttribute(User::ATTRIBUTE_NAME, $request->get('name'));
        // $user->setAttribute(User::ATTRIBUTE_EMAIL, $request->get('email'));
        // $user->setAttribute(User::ATTRIBUTE_PASSWORD, Hash::make($request->get('password')));
        // $user->save();
        $user->setAttribute(User::ATTRIBUTE_NAME, $name);
                $user->setAttribute(User::ATTRIBUTE_EMAIL, $email);
                $user->setAttribute(User::ATTRIBUTE_PASSWORD, Hash::make($password));
                $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    public function deleteUser(User $user, $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'message' => 'user has been deleted'
        ], 200);
    }

    public function updateUser(Request $request, User $user)
    {
        $id = $request->input('id');
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');
     
        $user = User::findOrFail($id);
        $user->update([
                $user->setAttribute(User::ATTRIBUTE_NAME, $name),
                $user->setAttribute(User::ATTRIBUTE_EMAIL, $email),
                $user->setAttribute(User::ATTRIBUTE_PASSWORD, Hash::make($password))
            ]);
        return response()->json([
            'message' => 'user has been updated'
        ], 200);
    }

    public function showUser($id)
    {
        return User::findOrFail($id);
    }
    
    public function getUser()
{
    return User::all();
}
}
