<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('taches', function (Blueprint $table) {
            $table->unsignedBigInteger('id_tache')->autoIncrement();
            $table->string('nom_tache');
            $table->text('description')->nullable();
            $table->dateTime('heure_debut_globale')->nullable();
            $table->dateTime('heure_fin_globale')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taches');
    }
};
