<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Utilisateur;
use App\Models\Evenement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UtilisateurControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_users()
    {
        $admin = Utilisateur::factory()->create(['role' => 'administrateur']);
        Utilisateur::factory()->count(3)->create();

        $this->actingAs($admin, 'sanctum');

        $response = $this->getJson('/api/utilisateurs');

        $response->assertStatus(200)
                 ->assertJsonCount(4); // 3 created + 1 admin
    }

    public function test_show_returns_user()
    {
        $admin = Utilisateur::factory()->create(['role' => 'administrateur']);
        $user = Utilisateur::factory()->create();

        $this->actingAs($admin, 'sanctum');

        $response = $this->getJson("/api/utilisateurs/{$user->id_utilisateur}");

        $response->assertStatus(200)
                 ->assertJson(['id_utilisateur' => $user->id_utilisateur]);
    }

    public function test_update_updates_user_profile()
    {
        $user = Utilisateur::factory()->create();
        $this->actingAs($user, 'sanctum');

        $data = [
            'nom' => 'NouveauNom',
            'prenom' => 'NouveauPrenom',
            'email' => $user->email, // Keep same email
            'role' => 'parent',
        ];

        $response = $this->putJson("/api/utilisateurs/{$user->id_utilisateur}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('utilisateurs', ['nom' => 'NouveauNom', 'prenom' => 'NouveauPrenom']);
    }

    public function test_update_password_changes_password()
    {
        $user = Utilisateur::factory()->create();
        $this->actingAs($user, 'sanctum');

        $data = ['mot_de_passe' => 'nouveauMotDePasse123'];

        $response = $this->patchJson("/api/utilisateurs/{$user->id_utilisateur}/mot-de-passe", $data);

        $response->assertStatus(204);
        
        $updatedUser = $user->fresh();
        $this->assertTrue(Hash::check('nouveauMotDePasse123', $updatedUser->mot_de_passe));
    }

    public function test_destroy_deletes_user_reliably()
    {
        // Setup admin (ID 1 for replacement)
        // Ensure ID 1 exists or fake it. Since we use auto-increment/factory, we might not get ID 1 easily.
        // We might need to manually force ID 1 if not exists, or adjust logic.
        // Actually factory might not give ID 1.
        // Let's rely on DB state or just create users. 
        
        // For testing, we can force creating an admin with ID 1 if possible, or Mocking isn't easy for ID.
        // Let's try to just create a user, and check deletion. Dependencies reassignment logic checks for ID 1.
        // If ID 1 doesn't exist, logic does nothing or fails? Controller says "if (!Utilisateur::where('id_utilisateur', $adminId)->exists()) { }" empty block.
        // Then it reassigns: "if ($utilisateur->id_utilisateur !== $adminId) {...}"
        
        // So we need an admin to be the receiver.
        $admin = Utilisateur::factory()->create(); // ID likely 1 if first test, but not guaranteed with refreshDB? SQLite reset -> yes 1.
        
        $userToDelete = Utilisateur::factory()->create();
        $password = 'password';
        $userToDelete->update(['mot_de_passe' => Hash::make($password)]);
        
        // Create dependency
        Evenement::factory()->create(['id_auteur' => $userToDelete->id_utilisateur]);

        $this->actingAs($admin, 'sanctum');

        $data = ['password' => $password]; // Current password required for deletion

        $response = $this->deleteJson("/api/utilisateurs/{$userToDelete->id_utilisateur}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('utilisateurs', ['id_utilisateur' => $userToDelete->id_utilisateur]);
        
        // Verify reassignment if admin ID was 1 (standard in fresh test DB)
        // If admin ID != 1, reassignment to 1 would fail foreign key if 1 doesn't exist?
        // SQLite doesn't enforce FK unless enabled.
        // Let's check if event author changed to 1.
        $this->assertDatabaseHas('evenements', ['id_auteur' => 1]);
    }
}
