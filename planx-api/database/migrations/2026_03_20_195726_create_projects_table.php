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
    Schema::create('projects', function (Blueprint $table) {
        $table->id();
        $table->foreignId('workspace_id')->constrained()->cascadeOnDelete();
        $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
        $table->string('name');
        $table->text('description')->nullable();
        $table->enum('status', ['active', 'on_hold', 'completed', 'archived'])->default('active');
        $table->date('deadline')->nullable();
        $table->timestamps();
    });
}
};
