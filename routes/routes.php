<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LoginController;

//Web Routes

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

// Log-in Routes
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');

Route::post('/logout', [LoginController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

//SIDEBAR NAVIGATION ROUTES
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('registries', function () {
    return Inertia::render('registries');
})->middleware(['auth'])->name('registries');

Route::get('patrecord', function () {
    return Inertia::render('patrecord');
})->middleware(['auth'])->name('patrecord');

//REGISTRIES ROUTES
Route::get('trauma', function () {
    return Inertia::render('trauma');
})->middleware(['auth'])->name('trauma');

Route::get('cancer', function () {
    return Inertia::render('cancer');
})->middleware(['auth'])->name('cancer');

require __DIR__.'/settings.php';
