<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

//Web Routes

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

//SIDEBAR NAVIGATION ROUTES
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('registries', function () {
    return Inertia::render('registries');
})->middleware(['auth', 'verified'])->name('registries');

Route::get('patrecord', function () {
    return Inertia::render('patrecord');
})->middleware(['auth', 'verified'])->name('patrecord');

//REGISTRIES ROUTES
Route::get('trauma', function () {
    return Inertia::render('trauma');
})->middleware(['auth', 'verified'])->name('trauma');

Route::get('cancer', function () {
    return Inertia::render('cancer');
})->middleware(['auth', 'verified'])->name('cancer');

require __DIR__.'/settings.php';
