<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WorkspaceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Workspaces
    Route::apiResource('workspaces', WorkspaceController::class);

    // Projects
    Route::apiResource('workspaces.projects', ProjectController::class);

    // Tasks
    Route::apiResource('projects.tasks', TaskController::class);
});