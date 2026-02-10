<?php
namespace App\Http\Controllers;

use App\Models\OutpatientModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutpatientController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 25);
        $page = $request->get('page', 1);
        $status = $request->get('status','');
        // $ward = $request->get('ward', '');

        $query = OutpatientModel::getPatientsList();

        if ($status && in_array($status, ['A', 'I'])) {
            $query->where('hopdlog.opdstat', $status);
        }

        // if ($ward) {
        //     $query->where('hward.wardcode', $ward);
        // }

        $patient = $query->paginate($perPage, ['*'], 'page', $page);

        $baseQuery = OutpatientModel::getPatientsList();
        
        $tabCounts = [
            'all' => $baseQuery->count(),
            'active' => (clone $baseQuery)->where('hopdlog.opdstat', 'A')->count(),
            'discharged' => (clone $baseQuery)->where('hopdlog.opdstat', 'I')->count(),
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
            $patient = OutpatientModel::getPatientByEnccode($enccode);

            if (!$patient) {
                return redirect()->route('outpatient')
                    ->with('error', 'Patient not found.');
            }

            return Inertia::render('outpatient/Show', [
                'patient' => OutpatientModel::getPatientInformation($patient),
            ]);
        } catch (\Exception $e) {
            \Log::error('Outpatient show error: ' . $e->getMessage());
            
            return redirect()->route('outpatient')
                ->with('error', 'Failed to load patient details.');
        }
    }

    public function stats(Request $request)
    {
        try {
            $startDate = $request->get('start_date', now()->startOfMonth()->format('Y-m-d'));
            $endDate = $request->get('end_date', now()->format('Y-m-d'));

            $stats = OutpatientModel::getStatistics($startDate, $endDate);

            return response()->json($stats);
        } catch (\Exception $e) {
            \Log::error('Outpatient stats error: ' . $e->getMessage());
            
            return response()->json(['error' => 'Failed to load statistics.'], 500);
        }
    }

    public function create()
    {
        return Inertia::render('outpatient/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'enccode' => 'required|string|unique:hopdlog,enccode',
                'hpercode' => 'required|string',
                'patsex' => 'required|string',
                'patage' => 'required|integer',
                'tscode' => 'required|string',
                'opddate' => 'required|date',
                'opdtime' => 'required',
            ]);

            OutpatientModel::create($validated);

            return redirect()->route('outpatient')
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
            $patient = OutpatientModel::where('enccode', $enccode)->firstOrFail();
            
            $patient->update(['opdstat' => 'I']);

            return redirect()->route('outpatient')
                ->with('success', 'Patient record deactivated successfully.');
        } catch (\Exception $e) {
            \Log::error('Outpatient destroy error: ' . $e->getMessage());
            
            return back()
                ->with('error', 'Failed to deactivate patient record.');
        }
    }
}