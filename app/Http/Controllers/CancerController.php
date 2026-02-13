<?php
namespace App\Http\Controllers;

use App\Models\CancerModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CancerController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 25);
        $page = $request->get('page', 1);
        $search = $request->get('search','');

        $query = CancerModel::getPatientsList();

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->whereRaw("(
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
                ) LIKE ?", ["%{$search}%"])
                ->orWhere('hperson.patlast', 'like', "%{$search}%")
                ->orWhere('hperson.patfirst', 'like', "%{$search}%")
                ->orWhere('hperson.patmiddle', 'like', "%{$search}%")
                ->orWhere('hcancer.hpercode', 'like', "%{$search}%")
                ->orWhere('hcancer.enccode', 'like', "%{$search}%");
            });
        }

        $patient = $query->paginate($perPage, ['*'], 'page', $page);

        $baseQuery = CancerModel::getPatientsList();
        
        // $tabCounts = [
        //     'all' => $baseQuery->count(),
        //     'active' => (clone $baseQuery)->where('hcancer.opdstat', 'A')->count(),
        //     'discharged' => (clone $baseQuery)->where('hcancer.opdstat', 'I')->count(),
        // ];

        return response()->json([
            'data' => $patient->items(),
            'current_page' => $patient->currentPage(),
            'last_page' => $patient->lastPage(),
            'per_page' => $patient->perPage(),
            'total' => $patient->total(),
            'from' => $patient->firstItem(),
            'to' => $patient->lastItem(),
            // 'tab_counts' => $tabCounts,
        ]);
    }

    public function show(string $enccode)
    {
        try {
            $patient = CancerModel::getPatientByEnccode($enccode);

            if (!$patient) {
                return redirect()->route('cancer')
                    ->with('error', 'Patient not found.');
            }

            return Inertia::render('cancer/Show', [
                'patient' => CancerModel::getPatientInformation($patient),
            ]);
        } catch (\Exception $e) {
            \Log::error('Outpatient show error: ' . $e->getMessage());
            
            return redirect()->route('cancer')
                ->with('error', 'Failed to load patient details.');
        }
    }

    public function stats(Request $request)
    {
        try {
            $startDate = $request->get('start_date', now()->startOfMonth()->format('Y-m-d'));
            $endDate = $request->get('end_date', now()->format('Y-m-d'));

            $stats = CancerModel::getStatistics($startDate, $endDate);

            return response()->json($stats);
        } catch (\Exception $e) {
            \Log::error('Cancer stats error: ' . $e->getMessage());
            
            return response()->json(['error' => 'Failed to load statistics.'], 500);
        }
    }

    public function create()
    {
        return Inertia::render('cancer/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'enccode' => 'required|string|unique:hcancer,enccode',
                'hpercode' => 'required|string',
                'patsex' => 'required|string',
                'patage' => 'required|integer',
                'tscode' => 'required|string'
            ]);

            CancerModel::create($validated);

            return redirect()->route('cancer')
                ->with('success', 'Patient registered successfully.');
        } catch (\Exception $e) {
            \Log::error('Outpatient store error: ' . $e->getMessage());
            
            return back()
                ->withInput()
                ->withErrors(['error' => 'Failed to register patient.']);
        }
    }

    public function destroy(string $enccode)
    {
        try {
            $patient = CancerModel::where('enccode', $enccode)->firstOrFail();
            
            $patient->update(['opdstat' => 'I']);

            return redirect()->route('cancer')
                ->with('success', 'Patient record deactivated successfully.');
        } catch (\Exception $e) {
            \Log::error('Outpatient destroy error: ' . $e->getMessage());
            
            return back()
                ->with('error', 'Failed to deactivate patient record.');
        }
    }
}