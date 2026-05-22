import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const PHASES = [
  { label: 'Onboarding', count: 142, pct: 100, drop: null },
  { label: 'Pre-Assessment', count: 98, pct: 69, drop: 31 },
  { label: 'Jaker Selection', count: 61, pct: 43, drop: 38 },
  { label: 'Assessment', count: 34, pct: 24, drop: 44 },
  { label: 'RTD Proportion', count: 12, pct: 8, drop: 65 },
];

function TabBar({ active }: { active: 'overview' | 'candidates' }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
      <span className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${active === 'overview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground cursor-pointer hover:text-foreground'}`}>
        Overview
      </span>
      <span className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${active === 'candidates' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground cursor-pointer hover:text-foreground'}`}>
        Candidates
      </span>
    </div>
  );
}

export default function CandidatesOverviewScreen() {
  return (
    <div className="mx-10 space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Candidate Management</h2>
        <p className="text-sm text-muted-foreground">Monitor candidates across all pipeline phases.</p>
      </div>

      <div className="space-y-6">
        <TabBar active="overview" />

        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Total registered candidates:</span>
            <span className="font-semibold text-foreground">142</span>
          </div>

          {/* Funnel */}
          <div className="flex items-stretch gap-2">
            {PHASES.map((p, i) => (
              <div key={p.label} className="flex items-center gap-2 flex-1">
                <Card className="flex-1 cursor-pointer hover:border-primary-400 hover:shadow-md transition-all">
                  <CardContent className="pt-5 pb-4 space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide leading-snug">{p.label}</p>
                    <p className="text-3xl font-bold tabular-nums">{p.count}</p>
                    <div className="space-y-1">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${p.pct}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground">{p.pct}% of total</p>
                    </div>
                    {p.drop !== null && (
                      <p className="text-xs text-danger-500">−{p.drop}% from prev</p>
                    )}
                  </CardContent>
                </Card>
                {i < PHASES.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">Click a phase card to jump to the filtered candidate list. See CM-02 for the Candidates tab.</p>
        </div>
      </div>
    </div>
  );
}
