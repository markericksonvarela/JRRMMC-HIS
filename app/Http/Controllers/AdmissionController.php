<?php
namespace App\Http\Controllers;

use App\Models\AdmissionModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB; // Add this import

class AdmissionController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 100);
        $page = $request->get('page', 1);
        $ward = $request->get('ward', '');
        $status = $request->get('status', '');
        $search = $request->get('search', ''); // Add search parameter

        $query = AdmissionModel::getPatientsList();

        if ($ward) {
            $query->where('hward.wardcode', $ward);
        }

        if ($status && in_array($status, ['A', 'I'])) {
            $query->where('hadmlog.admstat', $status);
        }

        // Add global search filter
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('hadmlog.hpercode', 'LIKE', "%{$search}%")
                  ->orWhere(DB::raw("(
                      RTRIM(LTRIM(hperson.patlast)) + ', ' +
                      RTRIM(LTRIM(hperson.patfirst)) +
                      CASE 
                          WHEN hperson.patsuffix IS NULL OR hperson.patsuffix = 'NOTAP' OR RTRIM(LTRIM(hperson.patsuffix)) = ''
                          THEN ''
                          ELSE ' ' + RTRIM(LTRIM(hperson.patsuffix))
                      END +
                      CASE 
                          WHEN hperson.patmiddle IS NULL OR RTRIM(LTRIM(hperson.patmiddle)) = ''
                          THEN ''
                          ELSE ', ' + RTRIM(LTRIM(hperson.patmiddle))
                      END
                  )"), 'LIKE', "%{$search}%")
                  ->orWhere('hperson.patfirst', 'LIKE', "%{$search}%")
                  ->orWhere('hperson.patlast', 'LIKE', "%{$search}%");
            });
        }

        $patient = $query->paginate($perPage, ['*'], 'page', $page);

        $baseQuery = AdmissionModel::getPatientsList();

        if ($ward) {
            $baseQuery->where('hward.wardcode', $ward);
        }

        if ($search) {
            $baseQuery->where(function($q) use ($search) {
                $q->where('hadmlog.hpercode', 'LIKE', "%{$search}%")
                  ->orWhere(DB::raw("(
                      RTRIM(LTRIM(hperson.patlast)) + ', ' +
                      RTRIM(LTRIM(hperson.patfirst)) +
                      CASE 
                          WHEN hperson.patsuffix IS NULL OR hperson.patsuffix = 'NOTAP' OR RTRIM(LTRIM(hperson.patsuffix)) = ''
                          THEN ''
                          ELSE ' ' + RTRIM(LTRIM(hperson.patsuffix))
                      END +
                      CASE 
                          WHEN hperson.patmiddle IS NULL OR RTRIM(LTRIM(hperson.patmiddle)) = ''
                          THEN ''
                          ELSE ', ' + RTRIM(LTRIM(hperson.patmiddle))
                      END
                  )"), 'LIKE', "%{$search}%")
                  ->orWhere('hperson.patfirst', 'LIKE', "%{$search}%")
                  ->orWhere('hperson.patlast', 'LIKE', "%{$search}%");
            });
        }
        
        $tabCounts = [
            'all' => (clone $baseQuery)->count(),
            'active' => (clone $baseQuery)->where('hadmlog.admstat', 'A')->count(),
            'discharged' => (clone $baseQuery)->where('hadmlog.admstat', 'I')->count(),
        ];

        return response()->json([
            'data' => $patient->items(),
            'current_page' => $patient->currentPage(),
            'last_page' => $patient->lastPage(),
            'per_page' => $patient->perPage(),
            'total' => $patient->total(),
            'from' => $patient->firstItem(),
            'to' => $patient->lastItem(),
            'tab_counts' => $tabCounts,
        ]);
    }

    public function show(string $enccode)
    {
        try {
            $patient = AdmissionModel::getPatientByEnccode($enccode);

            if (!$patient) {
                return redirect()->route('admission')
                    ->with('error', 'Patient not found.');
            }

            return Inertia::render('admission/Show', [
                'patient' => AdmissionModel::getPatientInformation($patient),
            ]);
        } catch (\Exception $e) {
            \Log::error('admission show error: ' . $e->getMessage());
            
            return redirect()->route('admission')
                ->with('error', 'Failed to load patient details.');
        }
    }

    // public function store(Request $request)
    // {
    //     try {
    //         $validated = $request->validate([
    //             'enccode' => 'required|string|unique:hadmlog,enccode',
    //             'hpercode' => 'required|string',
    //             'patsex' => 'required|string',
    //             'patage' => 'required|integer',
    //             'tscode' => 'required|string',
    //             'opddate' => 'required|date',
    //             'opdtime' => 'required',
    //         ]);

    //         AdmissionModel::create($validated);

    //         return redirect()->route('admission')
    //             ->with('success', 'Patient registered successfully.');
    //     } catch (\Exception $e) {
    //         \Log::error('admission store error: ' . $e->getMessage());
            
    //         return back()
    //             ->withInput()
    //             ->withErrors(['error' => 'Failed to register patient.']);
    //     }
    // }

    // public function update(Request $request, string $enccode)
    // {
    //     try {
    //         $patient = AdmissionModel::where('enccode', $enccode)->firstOrFail();

    //         $validated = $request->validate([
    //             'tscode' => 'required|string',
    //             'opddate' => 'required|date',
    //             'opdtime' => 'required',
    //             'opdstat' => 'sometimes|string',
    //         ]);

    //         $patient->update($validated);

    //         return redirect()->route('admission')
    //             ->with('success', 'Patient updated successfully.');
    //     } catch (\Exception $e) {
    //         \Log::error('admission update error: ' . $e->getMessage());
            
    //         return back()
    //             ->withInput()
    //             ->withErrors(['error' => 'Failed to update patient.']);
    //     }
    // }

    // public function destroy(string $enccode)
    // {
    //     try {
    //         $patient = AdmissionModel::where('enccode', $enccode)->firstOrFail();
            
    //         $patient->update(['opdstat' => 'I']);

    //         return redirect()->route('admission')
    //             ->with('success', 'Patient record deactivated successfully.');
    //     } catch (\Exception $e) {
    //         \Log::error('admission destroy error: ' . $e->getMessage());
            
    //         return back()
    //             ->with('error', 'Failed to deactivate patient record.');
    //     }
    // }
}