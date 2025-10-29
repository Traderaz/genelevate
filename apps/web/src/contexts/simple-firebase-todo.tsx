'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/auth-context';

interface SimpleTodo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: any;
  weekId: string;
  userId: string;
}

interface WeekInfo {
  weekId: string;
  startDate: Date;
  endDate: Date;
  displayText: string;
}

interface SimpleTodoContextType {
  todos: SimpleTodo[];
  loading: boolean;
  currentWeekInfo: WeekInfo;
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const SimpleTodoContext = createContext<SimpleTodoContextType | undefined>(undefined);

// Helper function to get the start of the week (Monday)
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
}

// Helper function to get week ID (YYYY-MM-DD format of Monday)
function getWeekId(date: Date): string {
  const weekStart = getWeekStart(date);
  return weekStart.toISOString().split('T')[0];
}

// Helper function to get week info
function getCurrentWeekInfo(): WeekInfo {
  const now = new Date();
  const weekStart = getWeekStart(now);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  const weekId = getWeekId(now);
  const displayText = `${weekStart.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short' 
  })} - ${weekEnd.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short' 
  })}`;

  return {
    weekId,
    startDate: weekStart,
    endDate: weekEnd,
    displayText
  };
}

export function SimpleTodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<SimpleTodo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const currentWeekInfo = getCurrentWeekInfo();

  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const todosRef = collection(db, 'todos');
    const q = query(
      todosRef,
      where('userId', '==', user.uid),
      where('weekId', '==', currentWeekInfo.weekId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SimpleTodo[];
      
      setTodos(todosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, currentWeekInfo.weekId]);

  const addTodo = async (text: string) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'todos'), {
        text: text.trim(),
        completed: false,
        createdAt: serverTimestamp(),
        weekId: currentWeekInfo.weekId,
        userId: user.uid
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      await updateDoc(doc(db, 'todos', id), {
        completed: !todo.completed
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const value = {
    todos,
    loading,
    currentWeekInfo,
    addTodo,
    toggleTodo,
    deleteTodo
  };

  return (
    <SimpleTodoContext.Provider value={value}>
      {children}
    </SimpleTodoContext.Provider>
  );
}

export function useSimpleTodo() {
  const context = useContext(SimpleTodoContext);
  if (context === undefined) {
    throw new Error('useSimpleTodo must be used within a SimpleTodoProvider');
  }
  return context;
}
