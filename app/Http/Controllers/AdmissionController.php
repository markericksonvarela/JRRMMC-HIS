<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdmissionModel;

class AdmissionController extends Controller
{
    // GET /admissions - GET ALL

    public function index(Request $request)
{
    $perPage = $request->get('per_page', 25);
    $page = $request->get('page', 1);
    $search = $request->get('search', '');

    $query = AdmissionModel::select('enccode', 'hpercode');

    // Apply search filter if provided
    if ($search) {
        $query->where(function($q) use ($search) {
            $q->where('enccode', 'like', "%{$search}%")
              ->orWhere('hpercode', 'like', "%{$search}%");
        });
    }

    $admissions = $query->paginate($perPage, ['*'], 'page', $page);

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

    // GET /admissions/create - Show form to create new admission
    public function create()
    {
        return view('admissions.create');
    }

    // POST /admissions - Store new admission
    public function store(Request $request)
    {
        $admission = AdmissionModel::create($request->validated());
        return redirect()->route('admissions.show', $admission);
    }

    // GET /admissions/{enccode} - Show single admission
    public function show($enccode)
    {
        $admission = AdmissionModel::where('enccode', $enccode)->firstOrFail();
        return view('admissions.show', compact('admission'));
    }

    // GET /admissions/{enccode}/edit - Show form to edit
    public function edit($enccode)
    {
        $admission = AdmissionModel::where('enccode', $enccode)->firstOrFail();
        return view('admissions.edit', compact('admission'));
    }

    // PUT/PATCH /admissions/{enccode} - Update admission
    public function update(Request $request, $enccode)
    {
        $admission = AdmissionModel::where('enccode', $enccode)->firstOrFail();
        $admission->update($request->validated());
        return redirect()->route('admissions.show', $admission);
    }

    // DELETE /admissions/{enccode} - Delete admission
    public function destroy($enccode)
    {
        AdmissionModel::where('enccode', $enccode)->firstOrFail()->delete();
        return redirect()->route('admissions.index');
    }
}