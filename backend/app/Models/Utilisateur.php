<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    protected $primaryKey = 'id_utilisateur';
    public $incrementing = true;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'role',
        'statut_compte'
    ];

    protected $hidden = [
        'mot_de_passe',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'mot_de_passe' => 'hashed',
    ];

    /**
     * Génère une paire de tokens sans expiration pour les parents.
     * Basé sur ton ancienne logique mais simplifié pour ton projet APE.
     */
    public function createTokensWithoutExpiration(): array
    {
        // On définit les "abilities" (capacités) directement en chaînes de caractères
        // pour éviter de devoir créer un fichier Enum.
        $ability = ($this->role === 'admin') ? 'access-admin-api' : 'access-api';

        // Création de l'access_token sans date d'expiration (null)
        $accessToken = $this->createToken('access_token', [$ability], null)->plainTextToken;

        // Création du refresh_token sans date d'expiration (null)
        $refreshToken = $this->createToken('refresh_token', ['refresh-tokens'], null)->plainTextToken;

        return [$accessToken, $refreshToken];
    }

    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    // Relations
    public function actualites()
    {
        return $this->hasMany(Actualite::class, 'id_auteur', 'id_utilisateur');
    }

    public function evenements()
    {
        return $this->hasMany(Evenement::class, 'id_auteur', 'id_utilisateur');
    }

    public function formulaires()
    {
        return $this->hasMany(Formulaire::class, 'id_createur', 'id_utilisateur');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'id_utilisateur', 'id_utilisateur');
    }

    public function creneaux()
    {
        return $this->belongsToMany(
            Creneau::class, 
            'inscriptions', 
            'id_utilisateur', 
            'id_creneau'
        )->withPivot('commentaire')
         ->withTimestamps();
    }
}