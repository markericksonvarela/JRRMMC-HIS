<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\OutpatientController;
use App\Http\Controllers\EmergencyController;
use App\Http\Controllers\WardController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\CancerController;

// ROOT ROUTE
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('home');

// PUBLIC ROUTES
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');

// AUTH ONLY ROUTES
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('registries', 'registries')->name('registries');
    Route::inertia('patrecord', 'patientRecords/patientRec')->name('patrecord');
});

// AUTH + VERIFIED ROUTES
Route::middleware(['auth', 'verified'])->group(function () {
    // Registries
    Route::inertia('trauma', 'trauma')->name('trauma');

    Route::inertia('cancer', 'registries/Cancer/index')->name('cancer');
    Route::inertia('cancer/cancer-form', 'registries/Cancer/cancerForm')->name('cancer.form1');
    Route::get('api/cancer/datatable', [CancerController::class, 'index'])->name('cancer.index');
    Route::post('api/cancer', [CancerController::class, 'store'])->name('cancer.store');

    Route::inertia('geria', 'registries/Geria/index')->name('geria');

    Route::inertia('skin', 'registries/Skin/index')->name('skin');
    
    // Admission
    Route::inertia('admission', 'admission/index')->name('admission');
    Route::get('admission', function (Request $request) { return Inertia::render('admission/index', [
            'ward' => $request->get('ward'),
            'wardname' => $request->get('wardname'),
        ]);
    })->name('admission');
    Route::get('api/admission/datatable', [AdmissionController::class, 'index'])->name('admission.index');
    Route::post('api/admissions', [AdmissionController::class, 'store'])->name('admissions.store');
    Route::get('api/admissions/{enccode}', [AdmissionController::class, 'show'])->name('admissions.show');
    Route::put('api/admissions/{enccode}', [AdmissionController::class, 'update'])->name('admissions.update');
    Route::delete('api/admissions/{enccode}', [AdmissionController::class, 'destroy'])->name('admissions.destroy');
    
    // Emergency
    Route::get('emergency', function (Request $request) { return Inertia::render('emergency/index', [
            'services' => $request->get('services'),
            'tsdesc' => $request->get('tsdesc'),
        ]);
    })->name('emergency');
    Route::get('api/emergency/datatable', [EmergencyController::class, 'index'])->name('emergency.datatable');
    Route::get('api/emergency/stats', [EmergencyController::class, 'stats'])->name('emergency.stats');
    Route::get('api/emergency/create', [EmergencyController::class, 'create'])->name('emergency.create');
    Route::post('api/emergency', [EmergencyController::class, 'store'])->name('emergency.store');
    Route::get('api/emergency/{hpercode}', [EmergencyController::class, 'show'])->name('emergency.show');
    
    // Outpatient
    Route::get('outpatient', function (Request $request) { return Inertia::render('outpatient/index', [
            'services' => $request->get('services'),
            'tsdesc' => $request->get('tsdesc'),
        ]);
    })->name('outpatient');
    Route::get('api/outpatient/datatable', [OutpatientController::class, 'index'])->name('outpatient.datatable');
    Route::get('api/outpatient/stats', [OutpatientController::class, 'stats'])->name('outpatient.stats');
    Route::get('api/outpatient/create', [OutpatientController::class, 'create'])->name('outpatient.create');
    Route::post('api/outpatient', [OutpatientController::class, 'store'])->name('outpatient.store');
    Route::get('api/outpatient/{hpercode}', [OutpatientController::class, 'show'])->name('outpatient.show');

    // Utilities
    Route::get('api/wards', [WardController::class, 'index'])->name('wards.index');
    Route::get('api/services', [ServicesController::class, 'index'])->name('services.index');

Route::get('/settings/esignature', function () {
    return Inertia::render('settings/esignature');
})->middleware(['auth'])->name('settings.esignature');
});

require __DIR__.'/settings.php';