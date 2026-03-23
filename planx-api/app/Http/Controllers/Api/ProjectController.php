<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request, Workspace $workspace)
    {
        $projects = Project::where('workspace_id', $workspace->id)->get();
        return response()->json($projects);
    }

    public function store(Request $request, Workspace $workspace)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:active,on_hold,completed,archived',
            'deadline' => 'nullable|date',
        ]);

        $project = Project::create([
            ...$validated,
            'workspace_id' => $workspace->id,
            'owner_id' => $request->user()->id,
        ]);

        return response()->json($project, 201);
    }

    public function show(Workspace $workspace, Project $project)
    {
        return response()->json($project);
    }

    public function update(Request $request, Workspace $workspace, Project $project)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:active,on_hold,completed,archived',
            'deadline' => 'nullable|date',
        ]);

        $project->update($validated);
        return response()->json($project);
    }

    public function destroy(Workspace $workspace, Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted']);
    }
}