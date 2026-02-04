<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginModel;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Features;

class LoginController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:15',
            'password' => 'required|string|max:15',
        ]);

        $user = LoginModel::where('user_name', $request->username)->first();

        if (!$user || !$user->checkPassword($request->password)) {
            return back()->withErrors([
                'username' => 'Invalid username or password',
            ])->withInput($request->only('username'));
        }

        Auth::login($user);

        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}