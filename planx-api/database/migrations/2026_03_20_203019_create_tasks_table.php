<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->foreignId('project_id')->constrained()->cascadeOnDelete();
        $table->foreignId('workspace_id')->constrained()->cascadeOnDelete();
        $table->foreignId('assignee_id')->nullable()->constrained('users')->nullOnDelete();
        $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
        $table->foreignId('parent_id')->nullable()->constrained('tasks')->cascadeOnDelete();
        $table->string('title');
        $table->text('description')->nullable();
        $table->enum('status', ['todo', 'in_progress', 'in_review', 'done'])->default('todo');
        $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium');
        $table->date('due_date')->nullable();
        $table->integer('story_points')->nullable();
        $table->integer('order')->default(0);
        $table->timestamps();
    });
}
};
