'use client';

import { useState } from 'react';
import { useSimpleTodo } from '@/contexts/simple-firebase-todo';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { Plus, Trash2, Check, Clock, CheckCircle, Calendar, Target, ChevronDown, ChevronUp, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default function TodoPage() {
  const { todos, loading, currentWeekInfo, addTodo, toggleTodo, deleteTodo, updateTodo } = useSimpleTodo();
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [expandedTodos, setExpandedTodos] = useState<Set<string>>(new Set());
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    setIsAdding(true);
    try {
      await addTodo(newTodoText, newTodoDescription);
      setNewTodoText('');
      setNewTodoDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const toggleExpanded = (todoId: string) => {
    const newExpanded = new Set(expandedTodos);
    if (newExpanded.has(todoId)) {
      newExpanded.delete(todoId);
    } else {
      newExpanded.add(todoId);
    }
    setExpandedTodos(newExpanded);
  };

  const startEditing = (todo: any) => {
    setEditingTodo(todo.id);
    setEditText(todo.text);
    setEditDescription(todo.description || '');
    // Expand the todo to show description field
    const newExpanded = new Set(expandedTodos);
    newExpanded.add(todo.id);
    setExpandedTodos(newExpanded);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setEditText('');
    setEditDescription('');
  };

  const saveEdit = async (todoId: string) => {
    if (!editText.trim()) return;
    
    try {
      await updateTodo(todoId, editText, editDescription);
      setEditingTodo(null);
      setEditText('');
      setEditDescription('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Header with Progress Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Weekly Tasks</h1>
            <p className="text-muted-foreground">
              Plan your week, track your progress, achieve your goals
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-card border border-border rounded-lg text-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Week of {currentWeekInfo.displayText}</span>
              </div>
            </div>
            {totalCount > 0 && (
              <div className="px-4 py-2 bg-card border border-border rounded-lg text-foreground">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{completedCount}/{totalCount} completed</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add New Task Card */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Add New Task</h2>
          </div>
          <form onSubmit={handleAddTodo} className="space-y-4">
            <div>
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="What do you want to accomplish this week?"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isAdding}
              />
            </div>
            <div>
              <textarea
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                placeholder="Add more details about this task (optional)..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-20"
                disabled={isAdding}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isAdding || !newTodoText.trim()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {isAdding ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your tasks...</p>
          </div>
        )}

        {/* Tasks Section */}
        {!loading && (
          <>
            {todos.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Target className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to conquer this week?</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Add your first task above and start building momentum for an amazing week ahead.
                </p>
                <div className="inline-block bg-muted/50 rounded-lg px-4 py-2">
                  <p className="text-muted-foreground text-sm">
                    💡 <span className="font-medium">Pro tip:</span> Tasks automatically reset every Monday for a fresh start
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Your Tasks</h2>
                  </div>
                </div>
                
                <div className="divide-y divide-border">
                  {todos.map((todo) => (
                    <div key={todo.id} className="p-6 hover:bg-muted/50 transition-colors group">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            todo.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-muted-foreground hover:border-primary hover:bg-primary/10'
                          }`}
                        >
                          {todo.completed && <Check className="w-4 h-4" />}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          {editingTodo === todo.id ? (
                            // Edit Mode
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Task title"
                                autoFocus
                              />
                              <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-20"
                                placeholder="Description (optional)"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveEdit(todo.id)}
                                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                                  disabled={!editText.trim()}
                                >
                                  <Save className="w-4 h-4" />
                                  Save
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors flex items-center gap-2"
                                >
                                  <X className="w-4 h-4" />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            // View Mode
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 
                                  className={`text-lg font-medium transition-all duration-200 ${
                                    todo.completed 
                                      ? 'text-muted-foreground line-through' 
                                      : 'text-foreground'
                                  }`}
                                >
                                  {todo.text}
                                </h3>
                                {todo.description && (
                                  <div className="mt-2">
                                    <button
                                      onClick={() => toggleExpanded(todo.id)}
                                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                                    >
                                      {expandedTodos.has(todo.id) ? (
                                        <>
                                          <ChevronUp className="w-4 h-4" />
                                          Hide details
                                        </>
                                      ) : (
                                        <>
                                          <ChevronDown className="w-4 h-4" />
                                          Show details
                                        </>
                                      )}
                                    </button>
                                    {expandedTodos.has(todo.id) && (
                                      <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border">
                                        <p className={`text-sm leading-relaxed ${
                                          todo.completed ? 'text-muted-foreground' : 'text-foreground'
                                        }`}>
                                          {todo.description}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => startEditing(todo)}
                                  className="text-muted-foreground hover:text-primary transition-colors p-1 rounded"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteTodo(todo.id)}
                                  className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Section */}
            {totalCount > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Weekly Progress</h2>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-foreground">
                      {Math.round((completedCount / totalCount) * 100)}%
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {completedCount} of {totalCount} tasks completed
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-700"
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  ></div>
                </div>
                
                <div className="text-center">
                  {completedCount === totalCount ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <p className="text-green-600 font-semibold mb-1">
                        🎉 Outstanding! You've conquered this week!
                      </p>
                      <p className="text-green-600/80 text-sm">
                        All tasks completed - you're unstoppable!
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-semibold">{totalCount - completedCount}</span> task{totalCount - completedCount !== 1 ? 's' : ''} remaining
                      <span className="block text-sm mt-1">Keep going, you've got this!</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </NetflixDashboardLayout>
  );
}
