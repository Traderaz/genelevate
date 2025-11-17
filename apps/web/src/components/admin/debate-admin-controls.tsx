'use client';

import { useState } from 'react';
import { Play, Square, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface DebateAdminControlsProps {
  debateId: string;
  currentStatus: 'scheduled' | 'live' | 'completed' | 'cancelled';
  onStatusChange: () => void;
}

export function DebateAdminControls({
  debateId,
  currentStatus,
  onStatusChange,
}: DebateAdminControlsProps) {
  const [updating, setUpdating] = useState(false);

  const handleStartDebate = async () => {
    if (!confirm('Start this debate and make it live for all participants?')) return;

    setUpdating(true);
    try {
      // Update Firestore status to 'live'
      const debateRef = doc(db, 'virtualDebates', debateId);
      await updateDoc(debateRef, {
        status: 'live',
        updatedAt: new Date(),
      });
      
      toast.success('Debate is now LIVE! Participants can join the Daily.co room.');
      onStatusChange();
    } catch (error) {
      console.error('Error starting debate:', error);
      toast.error('Failed to start debate');
    } finally {
      setUpdating(false);
    }
  };

  const handleEndDebate = async () => {
    if (!confirm('End this debate? This will close the Daily.co room and remove all participants.')) return;

    setUpdating(true);
    try {
      // Call API to delete the Daily.co room (this kicks everyone out)
      const response = await fetch('/api/debates/end-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ debateId }),
      });

      if (!response.ok) {
        throw new Error('Failed to end Daily.co room');
      }

      // Update Firestore status to 'completed'
      const debateRef = doc(db, 'virtualDebates', debateId);
      await updateDoc(debateRef, {
        status: 'completed',
        updatedAt: new Date(),
      });
      
      toast.success('Debate ended! Daily.co room closed and all participants removed.');
      onStatusChange();
    } catch (error) {
      console.error('Error ending debate:', error);
      toast.error('Failed to end debate. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="teal-card border-2 border-teal-gold/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-teal-card-text flex items-center gap-2">
            🎛️ Admin Controls
          </h3>
          <p className="text-sm text-teal-card-text-muted mt-1">
            Manually control the debate status
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-teal-card-text-muted">Current Status:</p>
          <p className="text-sm font-bold text-teal-card-text uppercase">{currentStatus}</p>
        </div>
      </div>

      <div className="flex gap-3">
        {(currentStatus === 'scheduled' || currentStatus === 'cancelled') && (
          <button
            onClick={handleStartDebate}
            disabled={updating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start Debate (Go Live)
              </>
            )}
          </button>
        )}

        {currentStatus === 'live' && (
          <button
            onClick={handleEndDebate}
            disabled={updating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Ending...
              </>
            ) : (
              <>
                <Square className="w-5 h-5" />
                End Debate
              </>
            )}
          </button>
        )}

        {currentStatus === 'completed' && (
          <div className="flex-1 text-center py-3 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-500/30">
            <span className="font-semibold">Debate Completed</span>
          </div>
        )}
      </div>

      <div className="mt-4 bg-teal-primary/10 border border-teal-primary/30 rounded-lg p-3">
        <p className="text-xs text-teal-card-text">
          <strong>💡 Tip:</strong> Click "Start Debate" to make it live immediately, regardless of
          scheduled time. Click "End Debate" to close the room manually.
        </p>
      </div>
    </div>
  );
}

