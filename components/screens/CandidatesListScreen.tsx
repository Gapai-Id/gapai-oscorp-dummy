'use client';

import { useState } from 'react';
import { useNavigate } from '@/components/navigation-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, ChevronLeft, ChevronRight, Columns3, LayoutList, Search, X } from 'lucide-react';

function TabBar({ active, onOverviewClick }: { active: 'overview' | 'candidates'; onOverviewClick: () => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
      <span onClick={onOverviewClick} className={`rounded-md px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${active === 'overview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
        Overview
      </span>
      <span className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${active === 'candidates' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground cursor-pointer hover:text-foreground'}`}>
        Candidates
      </span>
    </div>
  );
}

const ALL_JAKERS = [
  'JaKer Hospitality — Bulgaria',
  'JaKer F&B — Japan',
  'JaKer Manufacturing — Poland',
];

const TABLE_MOCK = [
  { id: 'CDT-0021', name: 'Budi Santoso', phone: '+62 812-3456-7890', registeredAt: '15 May 2026', jaker: 'JaKer Hospitality — Bulgaria', onboarding: 'done' },
  { id: 'CDT-0022', name: 'Sari Dewi', phone: '+62 813-9876-5432', registeredAt: '15 May 2026', jaker: 'JaKer Hospitality — Bulgaria', onboarding: 'done' },
  { id: 'CDT-0023', name: 'Ahmad Fauzi', phone: '+62 857-1234-5678', registeredAt: '16 May 2026', jaker: null, onboarding: 'pending' },
  { id: 'CDT-0024', name: 'Rina Marlina', phone: '+62 821-5555-1234', registeredAt: '16 May 2026', jaker: 'JaKer F&B — Japan', onboarding: 'done' },
  { id: 'CDT-0025', name: 'Doni Prasetyo', phone: '+62 878-4444-7890', registeredAt: '17 May 2026', jaker: null, onboarding: 'pending' },
  { id: 'CDT-0026', name: 'Maya Putri', phone: '+62 819-7777-3456', registeredAt: '17 May 2026', jaker: 'JaKer Hospitality — Bulgaria', onboarding: 'done' },
  { id: 'CDT-0027', name: 'Hendra Gunawan', phone: '+62 851-2222-0000', registeredAt: '18 May 2026', jaker: 'JaKer F&B — Japan', onboarding: 'done' },
  { id: 'CDT-0028', name: 'Fitri Rahayu', phone: '+62 895-3333-1111', registeredAt: '18 May 2026', jaker: null, onboarding: 'pending' },
];

const KANBAN_COLUMNS = [
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

export default function CandidatesListScreen() {
  const navigateTo = useNavigate();
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [jakerFilter, setJakerFilter] = useState<string>('all');

  const filteredRows = jakerFilter === 'all'
    ? TABLE_MOCK
    : jakerFilter === 'not_assigned'
      ? TABLE_MOCK.filter(c => !c.jaker)
      : TABLE_MOCK.filter(c => c.jaker === jakerFilter);

  const handleJakerBadgeClick = (e: React.MouseEvent, jakerName: string) => {
    e.stopPropagation();
    setJakerFilter(jakerName);
    setView('table');
  };

  return (
    <div className="mx-10 space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Candidate Management</h2>
        <p className="text-sm text-muted-foreground">Monitor candidates across all pipeline phases.</p>
      </div>

      <div className="space-y-4">
        {/* TabBar + View Toggle */}
        <div className="flex items-center justify-between">
          <TabBar active="candidates" onOverviewClick={() => navigateTo('CM-01')} />
          <div className="inline-flex items-center gap-1 rounded-lg border bg-background p-1">
            <button
              onClick={() => setView('table')}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${view === 'table' ? 'bg-muted text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutList className="h-3.5 w-3.5" />Table
            </button>
            <button
              onClick={() => setView('kanban')}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${view === 'kanban' ? 'bg-muted text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Columns3 className="h-3.5 w-3.5" />Kanban
            </button>
          </div>
        </div>

        {/* Table view */}
        {view === 'table' && (
          <div className="space-y-4">
            {/* Active filter pills */}
            {jakerFilter !== 'all' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Active filter:</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 border border-primary-200 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                  Jaker: {jakerFilter === 'not_assigned' ? 'Not Assigned' : jakerFilter}
                  <button className="ml-0.5 hover:text-primary-900" onClick={() => setJakerFilter('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
                <span className="text-xs text-muted-foreground">{filteredRows.length} candidates</span>
              </div>
            )}

            <Card>
              <CardContent className="pt-5 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name or phone..." className="pl-9" />
                  </div>
                  <Select defaultValue="All Onboarding">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Onboarding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Onboarding</SelectItem>
                      <SelectItem value="done">Onboarding Done</SelectItem>
                      <SelectItem value="pending">Pending Onboarding</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="All Phases">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Phases" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Phases</SelectItem>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="pre_assessment">Pre-Assessment</SelectItem>
                      <SelectItem value="jaker_selection">Jaker Selection</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="rtd">RTD Proportion</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="All Jakers" value={jakerFilter} onValueChange={(v) => setJakerFilter(v ?? 'all')}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Jaker Enrollment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jakers</SelectItem>
                      {ALL_JAKERS.map(j => (
                        <SelectItem key={j} value={j}>{j}</SelectItem>
                      ))}
                      <SelectItem value="not_assigned">Not Assigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Jaker</TableHead>
                        <TableHead>Onboarding</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRows.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-sm text-muted-foreground">
                            No candidates match this filter.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRows.map((c) => (
                          <TableRow key={c.id}>
                            <TableCell className="font-mono text-xs text-muted-foreground">{c.id}</TableCell>
                            <TableCell className="font-medium text-sm">{c.name}</TableCell>
                            <TableCell className="text-sm">{c.phone}</TableCell>
                            <TableCell className="text-sm">{c.registeredAt}</TableCell>
                            <TableCell className="text-sm">
                              {c.jaker
                                ? <span>{c.jaker}</span>
                                : <span className="text-muted-foreground italic text-xs">Not assigned</span>
                              }
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${c.onboarding === 'done' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'}`}>
                                {c.onboarding === 'done' ? 'Onboarding Done' : 'Pending Onboarding'}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end items-center gap-1.5">
                                <Button variant="outline" size="sm" className="h-7 text-xs px-2" onClick={() => navigateTo('CM-03')}>View Detail</Button>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Send Reminder">
                                  <Bell className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Showing {filteredRows.length} of {TABLE_MOCK.length} candidates</span>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="px-2 py-1 rounded border bg-primary-500 text-white text-xs min-w-[28px] text-center">1</span>
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Kanban view */}
        {view === 'kanban' && (
          <div className="flex gap-3 overflow-x-auto pb-4">
            {KANBAN_COLUMNS.map((col) => (
              <div key={col.phase} className="flex-none w-[260px] flex flex-col gap-2">
                <div className="flex items-center gap-2 px-1">
                  <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${col.color}`} />
                  <span className="text-sm font-semibold text-foreground">{col.phase}</span>
                  <span className="ml-auto inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {col.candidates.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {col.candidates.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => navigateTo('CM-03')}
                      className="rounded-xl border bg-card p-3.5 shadow-sm cursor-pointer hover:shadow-md hover:border-primary-300 transition-all space-y-3"
                    >
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold leading-tight">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.phone}</p>
                      </div>
                      {c.jaker && (
                        <button
                          type="button"
                          onClick={(e) => handleJakerBadgeClick(e, c.jaker!)}
                          className="w-full text-left rounded-md bg-primary-50 border border-primary-100 px-2.5 py-1.5 hover:bg-primary-100 hover:border-primary-300 transition-colors group"
                        >
                          <p className="text-xs text-primary-700 font-medium leading-snug group-hover:text-primary-900">
                            {c.jaker}
                          </p>
                          <p className="text-[10px] text-primary-400 mt-0.5">Click to filter by this Jaker →</p>
                        </button>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Bell className="h-3 w-3" />Remind
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
