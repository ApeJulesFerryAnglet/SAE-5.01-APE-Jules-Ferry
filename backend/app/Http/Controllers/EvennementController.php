<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evenement;
class EvennementController extends Controller
{
    public function index()
    {
        $evennements = Evenement::all();
        if ($evennements) {
            return response()->json($evennements);
        } else {
            return response()->json(['message' => 'Aucun évènement trouvé'], 404);
        }
    }
    public function show($id)
    {
        $evennement = Evenement::find($id);
        if ($evennement) {
            return response()->json($evennement);
        } else {
            return response()->json(['message' => 'Évènement non trouvé'], 404);
        }
    }
    public function store(Request $request)
    {
        $evennement = Evenement::create($request->all());
        if ($evennement) {
            return response()->json($evennement, 201);
        } else {
            return response()->json(['message' => 'Erreur lors de la création de l\'évènement'], 500);
        }
    }
    public function update(Request $request, $id)
    {
        $evennement = Evenement::find($id);
        if ($evennement) {
            $evennement->update($request->all());
            return response()->json($evennement);
        } else {
            return response()->json(['message' => 'Évènement non trouvé'], 404);
        }
    }
    public function destroy($id)
    {
        $evennement = Evenement::find($id);
        if ($evennement) {
            $evennement->delete();
            return response()->json(['message' => 'Évènement supprimé']);
        } else {
            return response()->json(['message' => 'Évènement non trouvé'], 404);
        }
    }
}
