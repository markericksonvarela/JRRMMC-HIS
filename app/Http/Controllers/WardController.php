<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WardModel;

class WardController extends Controller
    {
        // GET /wards - GET ALL

        public function index(Request $request)
    {
        $wards = WardModel::where('wardcode', '!=', '')
            ->select('wardcode', 'wardname')
            ->orderBy('wardname', 'asc')
            ->get();

        return response()->json([
            'data' => $wards
        ]);
    }
}