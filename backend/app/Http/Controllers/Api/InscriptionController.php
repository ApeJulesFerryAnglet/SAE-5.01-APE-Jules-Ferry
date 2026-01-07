<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
use App\Models\Creneau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InscriptionController extends Controller
{
    public function store(Request $request) 
    {
        $request->validate([
            'id_creneau' => 'required|exists:creneaux,id_creneau',
            'commentaire' => 'nullable|string|max:255',
        ]);

        $user = $request->user(); 
        $creneauId = $request->id_creneau;

        return DB::transaction(function () use ($user, $creneauId, $request) { //gestion du simultané (eviter conflits)
            
            $creneau = Creneau::lockForUpdate()->find($creneauId);

            $existe = Inscription::where('id_utilisateur', $user->id_utilisateur)
                                 ->where('id_creneau', $creneauId)
                                 ->exists();
            //gestion des erreurs possibles (déja inscrit, créneau complet)
            if ($existe) {
                return response()->json(['message' => 'Vous êtes déjà inscrit à ce créneau.'], 409);
            }

            if ($creneau->inscriptions()->count() >= $creneau->quota) {
                return response()->json(['message' => 'Ce créneau est complet.'], 422);
            }

            Inscription::create([
                'id_utilisateur' => $user->id_utilisateur,
                'id_creneau' => $creneauId,
                'commentaire' => $request->commentaire
            ]);

            return response()->json(['message' => 'Inscription validée !'], 201);
        });
    }

    public function mesInscriptions(Request $request)
    {
        $user = $request->user();

        $inscriptions = Inscription::with(['creneau.tache.formulaire.evenement'])
            ->where('id_utilisateur', $user->id_utilisateur)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($inscriptions);
    }

    //desinscription
    public function destroy(Request $request, $id_creneau)
    {
        $user = $request->user();

        $deleted = Inscription::where('id_utilisateur', $user->id_utilisateur)
                              ->where('id_creneau', $id_creneau)
                              ->delete();

        if ($deleted) {
            return response()->json(['message' => 'Inscription annulée.']);
        }

        return response()->json(['message' => 'Inscription introuvable.'], 404);
    }

    //ajout de modif d'inscription eventuellement après pmv? ou direct a voir
}