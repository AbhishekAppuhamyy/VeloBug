<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request, Project $project)
    {
        $tasks = Task::where('project_id', $project->id)
            ->whereNull('parent_id')
            ->with(['assignee', 'subtasks', 'subtasks.assignee'])
            ->orderBy('order')
            ->get();

        return response()->json($tasks);
    }

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,in_review,done',
            'priority' => 'in:low,medium,high,critical',
            'due_date' => 'nullable|date',
            'story_points' => 'nullable|integer',
            'assignee_id' => 'nullable|exists:users,id',
            'parent_id' => 'nullable|exists:tasks,id',
        ]);

        $task = Task::create([
            ...$validated,
            'project_id' => $project->id,
            'workspace_id' => $project->workspace_id,
            'created_by' => $request->user()->id,
        ]);

        return response()->json($task->load(['assignee', 'subtasks']), 201);
    }

    public function show(Project $project, Task $task)
    {
        return response()->json($task->load(['assignee', 'subtasks', 'createdBy']));
    }

    public function update(Request $request, Project $project, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,in_review,done',
            'priority' => 'in:low,medium,high,critical',
            'due_date' => 'nullable|date',
            'story_points' => 'nullable|integer',
            'assignee_id' => 'nullable|exists:users,id',
            'order' => 'sometimes|integer',
        ]);

        $task->update($validated);
        return response()->json($task->load(['assignee', 'subtasks']));
    }

    public function destroy(Project $project, Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}