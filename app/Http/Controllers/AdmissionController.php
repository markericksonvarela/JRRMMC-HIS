<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdmissionModel;
use App\Models\HpersonModel;
use Illuminate\Support\Facades\DB;

class AdmissionController extends Controller
{
    /**
     * GET /admissions - GET ALL
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        $page = $request->get('page', 1);
        $search = $request->get('search', '');

        // Use the query scopes from the model
        $admissions = AdmissionModel::withPatientData()
            ->latestYear()
            ->search($search)
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $admissions->items(),
            'current_page' => $admissions->currentPage(),
            'last_page' => $admissions->lastPage(),
            'per_page' => $admissions->perPage(),
            'total' => $admissions->total(),
            'from' => $admissions->firstItem(),
            'to' => $admissions->lastItem(),
        ]);
    }

    /**
     * GET /admissions/create - Show form to create new admission
     * 
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('admissions.create');
    }

    /**
     * POST /admissions - Store new admission
     * 
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'enccode' => 'required|string|unique:hadmlog,enccode',
            'hpercode' => 'required|string|exists:hperson,hpercode',
            'admdate' => 'required|date',
            // add other validation rules here
        ]);

        $admission = AdmissionModel::create($validated);
        
        return redirect()->route('admissions.show', $admission->enccode)
            ->with('success', 'Admission created successfully.');
    }

    /**
     * GET /admissions/{enccode} - Show single admission
     * 
     * @param string $enccode
     * @return \Illuminate\View\View
     */
    public function show($enccode)
    {
        $admission = AdmissionModel::where('enccode', $enccode)->firstOrFail();
        
        return view('admissions.show', compact('admission'));
    }

    /**
     * GET /admissions/{enccode}/edit - Show form to edit
     * 
     * @param string $enccode
     * @return \Illuminate\View\View
     */
    public function edit($enccode)
    {
        $admission = AdmissionModel::where('enccode', $enccode)->firstOrFail();
        
        return view('admissions.edit', compact('admission'));
    }

    /**
     * PUT/PATCH /admissions/{enccode} - Update admission
     * 
     * @param Request $request
     * @param string $enccode
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $enccode)
    {
        $admission = AdmissionModel::where('enccode', $enccode)->firstOrFail();
        
        $validated = $request->validate([
            'hpercode' => 'sometimes|required|string|exists:hperson,hpercode',
            'admdate' => 'sometimes|required|date',
            // add other validation rules here
        ]);
        
        $admission->update($validated);
        
        return redirect()->route('admissions.show', $admission->enccode)
            ->with('success', 'Admission updated successfully.');
    }

    /**
     * DELETE /admissions/{enccode} - Delete admission
     * 
     * @param string $enccode
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($enccode)
    {
        $admission = AdmissionModel::where('enccode', $enccode)->firstOrFail();
        $admission->delete();
        
        return redirect()->route('admissions.index')
            ->with('success', 'Admission deleted successfully.');
    }
}