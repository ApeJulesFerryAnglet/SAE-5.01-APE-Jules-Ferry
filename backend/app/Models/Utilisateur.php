<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{

    protected $table = 'utilisateurs';
    protected $primaryKey = 'id_utilisateur';
    public $incrementing = true;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'role',
        'date_inscription',
        'statut_compte'
    ];
    public function actualites()
    {
        return $this->hasMany(Actualite::class, 'id_utilisateur');
    }
    public function formulaires()
    {
        return $this->hasMany(Formulaire::class, 'id_utilisateur');
    }
    public function creneaux()
    {
        return $this->belongsToMany(Creneau::class, 'inscription', 'id_utilisateur', 'id_creneau')->withPivot('date_inscription', 'commentaire');
    }
}
