import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

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

const MOCK = [
  { id: 'CDT-0021', name: 'Budi Santoso', phone: '+62 812-3456-7890', registeredAt: '15 May 2026', jaker: 'JaKer Hospitality — Bulgaria', onboarding: 'done' },
  { id: 'CDT-0022', name: 'Sari Dewi', phone: '+62 813-9876-5432', registeredAt: '15 May 2026', jaker: 'JaKer Hospitality — Bulgaria', onboarding: 'done' },
  { id: 'CDT-0023', name: 'Ahmad Fauzi', phone: '+62 857-1234-5678', registeredAt: '16 May 2026', jaker: null, onboarding: 'pending' },
  { id: 'CDT-0024', name: 'Rina Marlina', phone: '+62 821-5555-1234', registeredAt: '16 May 2026', jaker: 'JaKer F&B — Japan', onboarding: 'done' },
  { id: 'CDT-0025', name: 'Doni Prasetyo', phone: '+62 878-4444-7890', registeredAt: '17 May 2026', jaker: null, onboarding: 'pending' },
  { id: 'CDT-0026', name: 'Maya Putri', phone: '+62 819-7777-3456', registeredAt: '17 May 2026', jaker: 'JaKer Hospitality — Bulgaria', onboarding: 'done' },
  { id: 'CDT-0027', name: 'Hendra Gunawan', phone: '+62 851-2222-0000', registeredAt: '18 May 2026', jaker: 'JaKer F&B — Japan', onboarding: 'done' },
  { id: 'CDT-0028', name: 'Fitri Rahayu', phone: '+62 895-3333-1111', registeredAt: '18 May 2026', jaker: null, onboarding: 'pending' },
];

export default function CandidatesListScreen() {
  return (
    <div className="mx-10 space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Candidate Management</h2>
        <p className="text-sm text-muted-foreground">Monitor candidates across all pipeline phases.</p>
      </div>

      <div className="space-y-6">
        <TabBar active="candidates" />

        <div className="space-y-4">
          {/* Active filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Active filter:</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 border border-primary-200 px-2.5 py-0.5 text-xs font-medium text-primary-700">
              Phase: Pre-Assessment
              <button className="ml-0.5 hover:text-primary-900">
                <X className="h-3 w-3" />
              </button>
            </span>
            <span className="text-xs text-muted-foreground">98 candidates</span>
          </div>

          <Card>
            <CardContent className="pt-5 space-y-4">
              {/* Search + Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name or phone..." className="pl-9" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Onboarding Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Onboarding</SelectItem>
                    <SelectItem value="done">Onboarding Done</SelectItem>
                    <SelectItem value="pending">Pending Onboarding</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="pre_assessment">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pipeline Phase" />
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
              </div>

              {/* Table */}
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
                    {MOCK.map((c) => (
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
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            c.onboarding === 'done'
                              ? 'bg-success-100 text-success-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {c.onboarding === 'done' ? 'Onboarding Done' : 'Pending Onboarding'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center gap-1.5">
                            <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                              View Detail
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Send Reminder">
                              <Bell className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing 8 of 98 candidates</span>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-2 py-1 rounded border bg-primary-500 text-white text-xs min-w-[28px] text-center">1</span>
                  <span className="px-2 py-1 rounded text-xs min-w-[28px] text-center cursor-pointer hover:bg-muted">2</span>
                  <span className="px-2 py-1 rounded text-xs min-w-[28px] text-center cursor-pointer hover:bg-muted">3</span>
                  <span className="text-xs px-1">…</span>
                  <span className="px-2 py-1 rounded text-xs min-w-[28px] text-center cursor-pointer hover:bg-muted">13</span>
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
