<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    protected $table = "taches";

    protected $primaryKey = "id_tache";

    protected $fillable = [
        'nom_tache',
        'description',
        'heure_debut_globale',
        'heure_fin_globale'
    ] ;

    public function creneaux(){
        return $this->hasMany(Creneau::class, 'id_tache');
    }
    public function formulaires(){
        return $this->belongsTo(Formulaire::class,'id_tache');
    }
}
