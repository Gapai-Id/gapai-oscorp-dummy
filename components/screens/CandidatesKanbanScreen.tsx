import { Button } from '@/components/ui/button';
import { Bell, LayoutList, Columns3 } from 'lucide-react';

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

const COLUMNS = [
  {
    phase: 'Onboarding',
    color: 'bg-gray-400',
    candidates: [
      { id: 'CDT-0031', name: 'Fitri Rahayu', phone: '+62 895-3333-1111', jaker: null },
      { id: 'CDT-0032', name: 'Agus Salim', phone: '+62 812-7788-9900', jaker: null },
      { id: 'CDT-0033', name: 'Wulan Sari', phone: '+62 877-2244-6600', jaker: null },
    ],
  },
  {
    phase: 'Pre-Assessment',
    color: 'bg-blue-400',
    candidates: [
      { id: 'CDT-0021', name: 'Budi Santoso', phone: '+62 812-3456-7890', jaker: null },
      { id: 'CDT-0022', name: 'Sari Dewi', phone: '+62 813-9876-5432', jaker: null },
      { id: 'CDT-0023', name: 'Ahmad Fauzi', phone: '+62 857-1234-5678', jaker: null },
      { id: 'CDT-0024', name: 'Rina Marlina', phone: '+62 821-5555-1234', jaker: null },
    ],
  },
  {
    phase: 'Jaker Selection',
    color: 'bg-secondary-400',
    candidates: [
      { id: 'CDT-0011', name: 'Doni Prasetyo', phone: '+62 878-4444-7890', jaker: 'JaKer Hospitality — Bulgaria' },
      { id: 'CDT-0012', name: 'Maya Putri', phone: '+62 819-7777-3456', jaker: 'JaKer F&B — Japan' },
      { id: 'CDT-0013', name: 'Hendra Gunawan', phone: '+62 851-2222-0000', jaker: 'JaKer Hospitality — Bulgaria' },
    ],
  },
  {
    phase: 'Assessment',
    color: 'bg-primary-400',
    candidates: [
      { id: 'CDT-0004', name: 'Andi Wijaya', phone: '+62 856-9900-1122', jaker: 'JaKer Hospitality — Bulgaria' },
      { id: 'CDT-0005', name: 'Dewi Lestari', phone: '+62 822-1100-3344', jaker: 'JaKer F&B — Japan' },
    ],
  },
  {
    phase: 'RTD Proportion',
    color: 'bg-success-500',
    candidates: [
      { id: 'CDT-0001', name: 'Raka Pratama', phone: '+62 811-5566-7788', jaker: 'JaKer Hospitality — Bulgaria' },
    ],
  },
];

export default function CandidatesKanbanScreen() {
  return (
    <div className="mx-10 space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Candidate Management</h2>
        <p className="text-sm text-muted-foreground">Monitor candidates across all pipeline phases.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <TabBar active="candidates" />

          {/* View toggle */}
          <div className="inline-flex items-center gap-1 rounded-lg border bg-background p-1">
            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground">
              <LayoutList className="h-3.5 w-3.5" />Table
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
              <Columns3 className="h-3.5 w-3.5" />Kanban
            </span>
          </div>
        </div>

        {/* Kanban board */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <div key={col.phase} className="flex-none w-[260px] flex flex-col gap-2">
              {/* Column header */}
              <div className="flex items-center gap-2 px-1">
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${col.color}`} />
                <span className="text-sm font-semibold text-foreground">{col.phase}</span>
                <span className="ml-auto inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {col.candidates.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2">
                {col.candidates.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl border bg-card p-3.5 shadow-sm cursor-pointer hover:shadow-md hover:border-primary-300 transition-all space-y-3"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold leading-tight">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.phone}</p>
                    </div>

                    {c.jaker && (
                      <div className="rounded-md bg-primary-50 border border-primary-100 px-2.5 py-1.5">
                        <p className="text-xs text-primary-700 font-medium leading-snug">{c.jaker}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground">
                        <Bell className="h-3 w-3" />Remind
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Empty column placeholder */}
                {col.candidates.length === 0 && (
                  <div className="rounded-xl border border-dashed bg-muted/30 p-4 text-center">
                    <p className="text-xs text-muted-foreground">No candidates</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
