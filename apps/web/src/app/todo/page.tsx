'use client';

import { useState } from 'react';
import { useSimpleTodo } from '@/contexts/simple-firebase-todo';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { Plus, Trash2, Check, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function TodoPage() {
  const { todos, loading, currentWeekInfo, addTodo, toggleTodo, deleteTodo } = useSimpleTodo();
  const [newTodoText, setNewTodoText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    setIsAdding(true);
    try {
      await addTodo(newTodoText);
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodo(id);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <NetflixDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Weekly Tasks</h1>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-5 h-5" />
              <span className="text-lg">
                Week of {currentWeekInfo.displayText} (ID: {currentWeekInfo.weekId})
              </span>
            </div>
            <p className="text-gray-400 mt-2">
              Tasks automatically refresh each Monday. Stay organized and productive!
            </p>
          </div>

          {/* Add Todo Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
            <form onSubmit={handleAddTodo} className="flex gap-4">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Add a new task for this week..."
                className="flex-1 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg px-4 py-3 border border-gray-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                disabled={isAdding}
              />
              <button
                type="submit"
                disabled={isAdding || !newTodoText.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {isAdding ? 'Adding...' : 'Add Task'}
              </button>
            </form>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading your tasks...</p>
            </div>
          )}

          {/* Todo Lists */}
          {!loading && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Pending Tasks */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-yellow-500" />
                  Pending ({pendingTodos.length})
                </h2>
                
                {pendingTodos.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No pending tasks</p>
                    <p className="text-gray-500 text-sm">Add a task above to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingTodos.map((todo) => (
                      <div
                        key={todo.id}
                        className="bg-gray-700/30 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleTodo(todo.id)}
                            className="w-6 h-6 rounded-full border-2 border-gray-400 hover:border-green-500 transition-colors flex items-center justify-center"
                          >
                            {todo.completed && <Check className="w-4 h-4 text-green-500" />}
                          </button>
                          <span className="flex-1 text-white">{todo.text}</span>
                          <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Completed Tasks */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6 text-green-500" />
                  Completed ({completedTodos.length})
                </h2>
                
                {completedTodos.length === 0 ? (
                  <div className="text-center py-8">
                    <Check className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No completed tasks yet</p>
                    <p className="text-gray-500 text-sm">Complete some tasks to see them here!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {completedTodos.map((todo) => (
                      <div
                        key={todo.id}
                        className="bg-green-900/20 rounded-lg p-4 border border-green-800/30"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleTodo(todo.id)}
                            className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <span className="flex-1 text-gray-300 line-through">{todo.text}</span>
                          <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && todos.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-12 border border-gray-700">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">No tasks for this week</h3>
                <p className="text-gray-400 mb-6">
                  Start your productive week by adding your first task above!
                </p>
                <p className="text-gray-500 text-sm">
                  💡 Tasks automatically refresh every Monday to keep you organized
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </NetflixDashboardLayout>
  );
}
