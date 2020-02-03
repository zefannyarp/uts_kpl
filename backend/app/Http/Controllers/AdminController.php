<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function addUser(Request $request, User $user)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        $user->setAttribute(User::ATTRIBUTE_NAME, $name);
        $user->setAttribute(User::ATTRIBUTE_EMAIL, $email);
        $user->setAttribute(User::ATTRIBUTE_PASSWORD, bcrypt($password));
        $user->setAttribute(User::ATTRIBUTE_API_TOKEN, Str::random(60));
        $user->save();

        return response()->json($user, 201);
    }

    public function deleteUser($id)
    {
        User::destroy(User::ATTRIBUTE_ID);
        return response()->json([
            'user has been deleted'
        ], 200);
    }

    public function editUser(Request $request, User $user, $id)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        User::where(User::ATTRIBUTE_ID, $id)
            ->update([
                $user->setAttribute(User::ATTRIBUTE_NAME, $name),
                $user->setAttribute(User::ATTRIBUTE_EMAIL, $email),
                $user->setAttribute(User::ATTRIBUTE_PASSWORD, $password)
            ]);

        return response()->json([
            'user has been updated'
        ], 200);
    }
    public function showUser()
{
    return User::all();
}
}
