<?php
namespace App\Http\Controllers;

use App\Models\EmergencyModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmergencyController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 25);
        $page = $request->get('page', 1);
        $status = $request->get('status','');
        $services = $request->get('services', '');
        $search = $request->get('search','');

        $query = EmergencyModel::getPatientsList();

        if ($services) {
            $query->where('htypser.tscode', $services);
        }

        if ($status && in_array($status, ['A', 'I'])) {
            $query->where('herlog.erstat', $status);
        }

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
                ->orWhere('herlog.hpercode', 'like', "%{$search}%")
                ->orWhere('herlog.enccode', 'like', "%{$search}%");
            });
        }

        $patient = $query->paginate($perPage, ['*'], 'page', $page);

        $baseQuery = EmergencyModel::getPatientsList();

        if ($services) {
            $baseQuery->where('htypser.tscode', $services);
        }
        
        $tabCounts = [
            'all' => $baseQuery->count(),
            'active' => (clone $baseQuery)->where('herlog.erstat', 'A')->count(),
            'discharged' => (clone $baseQuery)->where('herlog.erstat', 'I')->count(),
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
            $patient = EmergencyModel::getPatientByEnccode($enccode);

            if (!$patient) {
                return redirect()->route('emergency')
                    ->with('error', 'Patient not found.');
            }

            return Inertia::render('emergency/Show', [
                'patient' => EmergencyModel::getPatientInformation($patient),
            ]);
        } catch (\Exception $e) {
            \Log::error('Emergency show error: ' . $e->getMessage());
            
            return redirect()->route('emergency')
                ->with('error', 'Failed to load patient details.');
        }
    }

    public function stats(Request $request)
    {
        try {
            $startDate = $request->get('start_date', now()->startOfMonth()->format('Y-m-d'));
            $endDate = $request->get('end_date', now()->format('Y-m-d'));

            $stats = EmergencyModel::getStatistics($startDate, $endDate);

            return response()->json($stats);
        } catch (\Exception $e) {
            \Log::error('Emergency stats error: ' . $e->getMessage());
            
            return response()->json(['error' => 'Failed to load statistics.'], 500);
        }
    }

    public function create()
    {
        return Inertia::render('emergency/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'enccode' => 'required|string|unique:herlog,enccode',
                'hpercode' => 'required|string',
                'patsex' => 'required|string',
                'patage' => 'required|integer',
                'tscode' => 'required|string',
                'erdate' => 'required|date',
                'ertime' => 'required',
            ]);

            EmergencyModel::create($validated);

            return redirect()->route('emergency')
                ->with('success', 'Patient registered successfully.');
        } catch (\Exception $e) {
            \Log::error('Emergency store error: ' . $e->getMessage());
            
            return back()
                ->withInput()
                ->withErrors(['error' => 'Failed to register patient.']);
        }
    }

    public function destroy(string $enccode)
    {
        try {
            $patient = EmergencyModel::where('enccode', $enccode)->firstOrFail();
            
            $patient->update(['erstat' => 'I']);

            return redirect()->route('emergency')
                ->with('success', 'Patient record deactivated successfully.');
        } catch (\Exception $e) {
            \Log::error('Emergency destroy error: ' . $e->getMessage());
            
            return back()
                ->with('error', 'Failed to deactivate patient record.');
        }
    }
}