<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdmissionController;

// PUBLIC ROUTES
Route::inertia('/', 'auth/login', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::post('/login', [LoginController::class, 'login'])->name('login.submit');

// AUTH ONLY ROUTES
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('registries', 'registries')->name('registries');
    Route::inertia('patrecord', 'patrecord')->name('patrecord');
});

// AUTH + VERIFIED ROUTES
Route::middleware(['auth', 'verified'])->group(function () {
    // Registries
    Route::inertia('trauma', 'trauma')->name('trauma');
    Route::inertia('cancer', 'registries/Cancer/cancerRegistry')->name('cancer');
    Route::inertia('cancer/cancer-form', 'registries/Cancer/cancerForm')->name('cancer.form1');
    Route::inertia('geria', 'registries/Geria/geriaRegistry')->name('geria');
    Route::inertia('skin', 'registries/Skin/skinRegistry')->name('skin');
    
    // Admission
    Route::inertia('admission', 'admission/index')->name('admission');
    Route::get('admission/index', [AdmissionController::class, 'index'])->name('admission.index');
    Route::post('admissions', [AdmissionController::class, 'store'])->name('admissions.store');
    Route::get('admissions/{enccode}', [AdmissionController::class, 'show'])->name('admissions.show');
    Route::put('admissions/{enccode}', [AdmissionController::class, 'update'])->name('admissions.update');
    Route::delete('admissions/{enccode}', [AdmissionController::class, 'destroy'])->name('admissions.destroy');
    
    // Emergency
    Route::inertia('emergency', 'emergency/emergencyDatatable')->name('emergency');
    
    // Outpatient
    Route::inertia('outpatient', 'outpatient/outpatientDatatable')->name('outpatient');
});

require __DIR__.'/settings.php';