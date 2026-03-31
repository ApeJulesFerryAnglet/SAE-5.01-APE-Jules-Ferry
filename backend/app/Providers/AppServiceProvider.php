<?php

/**
 * Fichier : backend/app/Providers/AppServiceProvider.php
 * Auteur : cf ~/docs/general/participants.md
 * Description : Ce provider enregistre des services et comportements globaux du backend.
 * Il prepare certains elements necessaires au demarrage de l'application Laravel.
 */

namespace App\Providers;
use App\Services\NewsletterService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(NewsletterService::class, function ($app) {
            return new NewsletterService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production' || env('FORCE_HTTPS', true)) {
            URL::forceScheme('https');
        }
    }
}