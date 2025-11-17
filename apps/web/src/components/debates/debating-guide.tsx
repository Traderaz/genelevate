'use client';

import { X, BookOpen, Target, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface DebatingGuideProps {
  onClose: () => void;
}

export function DebatingGuide({ onClose }: DebatingGuideProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="teal-card border-2 border-teal-gold/30 rounded-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-gold/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-teal-gold" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-teal-card-text">Debating Guide</h2>
              <p className="text-sm text-teal-card-text-muted">Master the art of effective argumentation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-teal-card-text" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* How to Approach Debate Questions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-teal-gold" />
              <h3 className="text-xl font-bold text-teal-card-text">How to Approach Debate Questions</h3>
            </div>
            <div className="space-y-4 text-teal-card-text-muted">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-teal-card-text mb-2">1. Understand the Motion</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Read the debate question carefully multiple times</li>
                  <li>Identify key terms and define them clearly</li>
                  <li>Determine what the question is really asking</li>
                  <li>Consider different interpretations and perspectives</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-teal-card-text mb-2">2. Research and Prepare</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Gather credible sources and evidence</li>
                  <li>Look at both sides of the argument</li>
                  <li>Note down key statistics, facts, and examples</li>
                  <li>Understand counterarguments you might face</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-teal-card-text mb-2">3. Choose Your Position</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Decide which side you can argue more effectively</li>
                  <li>Consider the strength of available evidence</li>
                  <li>Think about real-world implications</li>
                  <li>Be prepared to defend your position</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Structure Your Debate */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-teal-gold" />
              <h3 className="text-xl font-bold text-teal-card-text">How to Structure Your Debate</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-teal-gold/10 border border-teal-gold/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-gold font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-card-text mb-2">Introduction (15-20%)</h4>
                    <p className="text-sm text-teal-card-text-muted mb-2">
                      Open with a clear statement of your position
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-teal-card-text-muted">
                      <li>State the motion and your stance</li>
                      <li>Define key terms if necessary</li>
                      <li>Preview your main arguments (roadmap)</li>
                      <li>Use a hook to engage your audience</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-teal-primary/10 border border-teal-primary/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-card-text mb-2">Main Arguments (60-70%)</h4>
                    <p className="text-sm text-teal-card-text-muted mb-2">
                      Present 2-3 strong, well-supported arguments
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-teal-card-text-muted">
                      <li><strong>Point:</strong> State your argument clearly</li>
                      <li><strong>Evidence:</strong> Support with facts, statistics, or examples</li>
                      <li><strong>Explanation:</strong> Explain why this matters</li>
                      <li><strong>Link:</strong> Connect back to the motion</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white/5 rounded border border-white/10">
                      <p className="text-xs text-teal-gold font-semibold mb-1">💡 Pro Tip: Use the PEEL Method</p>
                      <p className="text-xs text-teal-card-text-muted">
                        Point → Evidence → Explanation → Link
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-teal-gold/10 border border-teal-gold/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-gold font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-card-text mb-2">Conclusion (10-15%)</h4>
                    <p className="text-sm text-teal-card-text-muted mb-2">
                      Reinforce your position with a strong closing
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-teal-card-text-muted">
                      <li>Summarize your main points</li>
                      <li>Restate your position clearly</li>
                      <li>End with a memorable statement</li>
                      <li>No new information in conclusion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips for Success */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-teal-gold" />
              <h3 className="text-xl font-bold text-teal-card-text">Tips for Success</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Do This
                </h4>
                <ul className="space-y-2 text-sm text-teal-card-text-muted">
                  <li>✓ Use clear, logical arguments</li>
                  <li>✓ Support claims with evidence</li>
                  <li>✓ Speak confidently and clearly</li>
                  <li>✓ Address counterarguments</li>
                  <li>✓ Use appropriate language</li>
                  <li>✓ Stay calm and composed</li>
                  <li>✓ Respect time limits</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Avoid This
                </h4>
                <ul className="space-y-2 text-sm text-teal-card-text-muted">
                  <li>✗ Personal attacks or insults</li>
                  <li>✗ Unsupported opinions</li>
                  <li>✗ Rambling or going off-topic</li>
                  <li>✗ Ignoring the question</li>
                  <li>✗ Using weak or false evidence</li>
                  <li>✗ Speaking too fast or unclearly</li>
                  <li>✗ Contradicting yourself</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Grading Criteria */}
          <section className="bg-teal-primary/10 border-2 border-teal-primary/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-teal-card-text mb-4">How You'll Be Graded</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-teal-gold mb-2">Content (40%)</h4>
                <ul className="text-sm text-teal-card-text-muted space-y-1">
                  <li>• Argument strength</li>
                  <li>• Use of evidence</li>
                  <li>• Relevance to topic</li>
                  <li>• Critical thinking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-teal-gold mb-2">Structure (30%)</h4>
                <ul className="text-sm text-teal-card-text-muted space-y-1">
                  <li>• Clear introduction</li>
                  <li>• Logical flow</li>
                  <li>• Strong conclusion</li>
                  <li>• Time management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-teal-gold mb-2">Delivery (30%)</h4>
                <ul className="text-sm text-teal-card-text-muted space-y-1">
                  <li>• Clarity of speech</li>
                  <li>• Confidence</li>
                  <li>• Engagement</li>
                  <li>• Professionalism</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20">
          <button
            onClick={onClose}
            className="w-full teal-button-primary py-3 rounded-lg font-semibold"
          >
            Got it! Let's Debate
          </button>
        </div>
      </div>
    </div>
  );
}

