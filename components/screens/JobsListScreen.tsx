import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Plus, RefreshCw, Search } from 'lucide-react';

const MOCK = [
  { id: 'JOB-001', title: 'Waiter / Waitress', department: 'Food & Beverage', company: 'Hotel Sofia Grand', location: 'Sofia', country: 'Bulgaria', status: 'active', candidates: 12, vacancies: 10, deadline: '30 Jun 2026', created: '1 May 2026' },
  { id: 'JOB-002', title: 'Housekeeping Attendant', department: 'Housekeeping', company: 'Bucharest Palace Hotel', location: 'Bucharest', country: 'Romania', status: 'active', candidates: 8, vacancies: 8, deadline: '15 Jun 2026', created: '3 May 2026' },
  { id: 'JOB-003', title: 'Kitchen Assistant', department: 'Food & Beverage', company: 'Black Sea Resort', location: 'Varna', country: 'Bulgaria', status: 'draft', candidates: 2, vacancies: 5, deadline: '31 Jul 2026', created: '10 May 2026' },
  { id: 'JOB-004', title: 'Dishwasher', department: 'Food & Beverage', company: 'Transylvania Inn', location: 'Cluj', country: 'Romania', status: 'active', candidates: 0, vacancies: 6, deadline: '30 Jun 2026', created: '15 May 2026' },
  { id: 'JOB-005', title: 'Room Attendant', department: 'Housekeeping', company: 'Varna Beach Resort', location: 'Varna', country: 'Bulgaria', status: 'closed', candidates: 4, vacancies: 4, deadline: '10 May 2026', created: '1 Apr 2026' },
];

const statusColor: Record<string, string> = {
  active: 'bg-success-100 text-success-700',
  draft: 'bg-gray-100 text-gray-600',
  closed: 'bg-danger-100 text-danger-700',
};

export default function JobsListScreen() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Jobs Management</h2>
          <p className="text-xl text-muted-foreground">Manage candidates across job stages and track recruitment progress.</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />New Job</Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search jobs..." className="pl-9" />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="w-9 h-9">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><input type="checkbox" className="rounded" /></TableHead>
                <TableHead><div className="min-w-[220px]">Job Title</div></TableHead>
                <TableHead><div className="min-w-[220px]">Location</div></TableHead>
                <TableHead><div className="min-w-[120px]">Status</div></TableHead>
                <TableHead><div className="min-w-[90px] text-right">Candidates</div></TableHead>
                <TableHead><div className="min-w-[90px] text-right">Vacancies</div></TableHead>
                <TableHead><div className="min-w-[140px]">Deadline</div></TableHead>
                <TableHead><div className="min-w-[140px]">Created</div></TableHead>
                <TableHead className="text-right"><div className="min-w-[120px]">Actions</div></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK.map((j) => (
                <TableRow key={j.id}>
                  <TableCell><input type="checkbox" className="rounded" /></TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-medium text-sm">{j.title}</p>
                      <p className="text-xs text-muted-foreground">{j.department} · {j.company}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-sm">{j.location}</p>
                      <Badge variant="outline" className="text-xs">{j.country}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColor[j.status]}`}>
                      {j.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">{j.candidates}</TableCell>
                  <TableCell className="text-right text-sm font-medium">{j.vacancies}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{j.deadline}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{j.created}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                      <Eye className="h-3.5 w-3.5 mr-1" />View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
