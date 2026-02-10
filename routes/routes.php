<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\OutpatientController;
use App\Http\Controllers\WardController;

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
    Route::inertia('cancer', 'registries/Cancer/cancerRegistry')->name('cancer');
    Route::inertia('cancer/cancer-form', 'registries/Cancer/cancerForm')->name('cancer.form1');
    Route::inertia('geria', 'registries/Geria/geriaRegistry')->name('geria');
    Route::inertia('skin', 'registries/Skin/skinRegistry')->name('skin');
    
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
    Route::inertia('emergency', 'emergency/emergencyDatatable')->name('emergency');
    
    // Outpatient
    Route::inertia('outpatient', 'outpatient/outpatientDatatable')->name('outpatient');
    Route::get('api/outpatient/datatable', [OutpatientController::class, 'index'])->name('outpatient.datatable');
    Route::get('api/outpatient/stats', [OutpatientController::class, 'stats'])->name('outpatient.stats');
    Route::get('api/outpatient/create', [OutpatientController::class, 'create'])->name('outpatient.create');
    Route::post('api/outpatient', [OutpatientController::class, 'store'])->name('outpatient.store');
    Route::get('api/outpatient/{hpercode}', [OutpatientController::class, 'show'])->name('outpatient.show');

    // Ward
    Route::get('api/wards', [WardController::class, 'index'])->name('wards.index');
});

require __DIR__.'/settings.php';