import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Plus, Search } from 'lucide-react';

const MOCK = [
  {
    id: 'STG-001',
    name: 'Pre-Assessment',
    description: 'Initial eligibility check: identity verification, basic health screening, and mandatory document submission before proceeding to assessment.',
    type: 'Candidate Info',
    status: 'Active',
    fields: 8,
    updated: '20 May 2026',
    created: '1 Mar 2026',
  },
  {
    id: 'STG-002',
    name: 'Language Assessment',
    description: 'Standardized language proficiency test aligned to the destination country requirements and employer certification framework.',
    type: 'Candidate Action',
    status: 'Active',
    fields: 5,
    updated: '18 May 2026',
    created: '1 Mar 2026',
  },
  {
    id: 'STG-003',
    name: 'Skills Assessment',
    description: 'Practical skills evaluation: hands-on test, competency demonstration, and tool familiarity check for the target job role.',
    type: 'Candidate Action',
    status: 'Active',
    fields: 12,
    updated: '15 May 2026',
    created: '5 Mar 2026',
  },
  {
    id: 'STG-004',
    name: 'Training',
    description: 'Job-specific training module with partner institutions. Covers safety, hospitality standards, and destination country culture.',
    type: 'Admin',
    status: 'Draft',
    fields: 4,
    updated: '10 May 2026',
    created: '10 Mar 2026',
  },
  {
    id: 'STG-005',
    name: 'Departure Preparation',
    description: 'Final document processing, visa handling, and pre-departure briefing. Candidate must clear all checklist items.',
    type: 'Candidate Info',
    status: 'Draft',
    fields: 6,
    updated: '5 May 2026',
    created: '15 Mar 2026',
  },
];

const typeColor: Record<string, string> = {
  'Candidate Action': 'bg-blue-100 text-blue-700',
  'Candidate Info': 'bg-purple-100 text-purple-700',
  Admin: 'bg-gray-100 text-gray-600',
};

export default function StagesListScreen() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Stages Management</h2>
          <p className="text-muted-foreground">Create and manage pipeline stages for recruitment process</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Stage</Button>
      </div>

      <Card className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="relative w-full">
            <Search className="z-10 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search stages..." className="pl-9" />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[160px]">
              <SelectValue placeholder="All Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Type</SelectItem>
              <SelectItem value="candidate_action">Candidate Action</SelectItem>
              <SelectItem value="candidate_information">Candidate Information</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stage</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Fields</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="max-w-xs">
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{s.description}</p>
                </TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[s.type]}`}>
                    {s.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status === 'Active' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'}`}>
                    {s.status}
                  </span>
                </TableCell>
                <TableCell className="text-center text-sm font-medium">{s.fields}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.updated}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.created}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
