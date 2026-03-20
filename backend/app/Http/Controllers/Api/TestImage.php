<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestImage extends Controller
{
    public function index()
    {
        try {
            return response()->file(storage_path('app/public/actualites/Reunion_69b70e252555c.webp'));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }
}
