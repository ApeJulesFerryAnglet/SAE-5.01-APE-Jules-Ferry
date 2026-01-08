<?php

namespace App\Services;

use App\Models\AbonneNewsletter;

class NewsletterService
{
    public function inscrire(string $email)
    {
        $abonne = AbonneNewsletter::where('email', $email)->first();

        if ($abonne) {
            if ($abonne->statut !== 'actif') {
                $abonne->update(['statut' => 'actif']);
            }
            return $abonne;
        }

        return AbonneNewsletter::create([
            'email' => $email,
            'statut' => 'actif'
        ]);
    }
}