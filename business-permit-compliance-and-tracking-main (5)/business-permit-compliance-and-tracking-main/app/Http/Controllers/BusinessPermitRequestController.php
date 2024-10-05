<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BusinessPermitRequest;
use App\Models\PermitRequirement;

class BusinessPermitRequestController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $business_request = BusinessPermitRequest::with([
            'business' => function($business) use($request) {
                $business->where('user_id', $request->user_id);
            }
        ])
        ->whereHas('business', function($b) use($request) {
            $b->where('user_id', $request->user_id);
        })
        ->orderByRaw("FIELD(status, 'incomplete', 'pending', 'verified')")
        ->orderByDesc('created_at')
        ->get();

        return response()->json([
            'request' => $business_request,
        ]);
    }

    public function admin(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $business_request = BusinessPermitRequest::with('business')
        ->orderByRaw("FIELD(status, 'incomplete', 'pending', 'verified')")
        ->orderByDesc('created_at')
        ->get();

        return response()->json([
            'request' => $business_request
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'business_id' => 'required|exists:businesses,id',
            'request_type' => 'required',
        ]);

        $business_request = BusinessPermitRequest::create($validated);
        $permit_requirements = PermitRequirement::create([
            'request_id' => $business_request->id,
        ]);

        if ($business_request) {
            return response()->json([
                'message' => 'Request created successfully',
                'id' => $permit_requirements->id,
            ]);
        }

        return response()->json(['message' => 'Failed to create request'], 400);
    }
}
