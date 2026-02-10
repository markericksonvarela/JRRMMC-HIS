<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServicesModel;

class ServicesController extends Controller
    {
        // GET /services - GET ALL

        public function index(Request $request)
    {
        $services = ServicesModel::where('tscode', '!=', '')
            ->select('tscode', 'tsdesc')
            ->orderBy('tsdesc', 'asc')
            ->get();

        return response()->json([
            'data' => $services
        ]);
    }
}