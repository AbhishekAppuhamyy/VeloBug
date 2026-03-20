<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WorkspaceController;
use App\Http\Controllers\Api\ProjectController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Workspaces
    Route::apiResource('workspaces', WorkspaceController::class);

    // Projects (nested under workspaces)
    Route::apiResource('workspaces.projects', ProjectController::class);
});