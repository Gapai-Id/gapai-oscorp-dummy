import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, FileText, Search, Upload, Video } from 'lucide-react';

const MOCK_CV = [
  { id: 'REG-001', name: 'Budi Santoso', phone: '+62 812-3456-7890', registeredAt: '20 May 2026', daysWaiting: 2, reminders: { count: 1, lastDate: '21 May 2026' }, status: 'pending', overdue: false, recommendedPosition: 'Waiter' },
  { id: 'REG-002', name: 'Sari Dewi', phone: '+62 813-9876-5432', registeredAt: '18 May 2026', daysWaiting: 4, reminders: { count: 2, lastDate: '20 May 2026' }, status: 'completed', overdue: false, recommendedPosition: 'Housekeeping' },
  { id: 'REG-003', name: 'Ahmad Fauzi', phone: '+62 857-1234-5678', registeredAt: '20 Apr 2026', daysWaiting: 32, reminders: { count: 5, lastDate: '15 May 2026' }, status: 'pending', overdue: true, recommendedPosition: null },
  { id: 'REG-004', name: 'Rina Marlina', phone: '+62 821-5555-1234', registeredAt: '21 May 2026', daysWaiting: 1, reminders: { count: 0, lastDate: null }, status: 'pending', overdue: false, recommendedPosition: null },
  { id: 'REG-005', name: 'Doni Prasetyo', phone: '+62 878-4444-7890', registeredAt: '15 Apr 2026', daysWaiting: 37, reminders: { count: 6, lastDate: '10 May 2026' }, status: 'failed', overdue: true, recommendedPosition: null },
];

const statusColor: Record<string, string> = {
  pending: 'bg-warning-100 text-warning-700',
  completed: 'bg-success-100 text-success-700',
  failed: 'bg-danger-100 text-danger-700',
};

const statusLabel: Record<string, string> = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
};

export default function ScreeningListScreen() {
  const activeTab: string = 'cv';

  return (
    <div className="space-y-4">
      <div>
        <h2>Screening</h2>
        <p className="text-muted-foreground">Manage candidate CV uploads and Gapai Interview assessments with automated reminders</p>
      </div>

      <Card>
        <CardHeader className="pb-0">
          {/* Tabs */}
          <div className="grid w-full max-w-md grid-cols-2 bg-muted rounded-lg p-1 gap-1">
            <button
              type="button"
              className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeTab === 'cv' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <FileText className="w-4 h-4" />CV Upload Management
            </button>
            <button
              type="button"
              className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeTab === 'video' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Video className="w-4 h-4" />Gapai Interview Management
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          {/* Filters */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search candidates..." className="pl-9" />
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"><input type="checkbox" className="rounded" /></TableHead>
                  <TableHead><div className="min-w-[150px]">Candidate</div></TableHead>
                  <TableHead><div className="min-w-[150px]">Contact</div></TableHead>
                  <TableHead><div className="min-w-[150px]">Registration Date</div></TableHead>
                  <TableHead><div className="min-w-[120px]">Days Waiting</div></TableHead>
                  <TableHead><div className="min-w-[150px]">Reminders Sent</div></TableHead>
                  <TableHead><div className="min-w-[120px]">Status</div></TableHead>
                  <TableHead><div className="min-w-[100px]">Overdue</div></TableHead>
                  <TableHead><div className="min-w-[200px]">Recommended Position</div></TableHead>
                  <TableHead className="text-right"><div className="min-w-[150px]">Actions</div></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_CV.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell><input type="checkbox" className="rounded" /></TableCell>
                    <TableCell className="font-medium text-sm">{r.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.phone}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.registeredAt}</TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${r.daysWaiting > 30 ? 'text-danger-600' : 'text-foreground'}`}>
                        {r.daysWaiting}d
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p className="font-medium">{r.reminders.count}×</p>
                        {r.reminders.lastDate && (
                          <p className="text-muted-foreground">Last: {r.reminders.lastDate}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[r.status]}`}>
                        {statusLabel[r.status]}
                      </span>
                    </TableCell>
                    <TableCell>
                      {r.overdue
                        ? <Badge variant="destructive" className="text-xs">Overdue</Badge>
                        : <span className="text-sm text-muted-foreground">No</span>
                      }
                    </TableCell>
                    <TableCell>
                      {r.recommendedPosition
                        ? <span className="text-sm">{r.recommendedPosition}</span>
                        : <span className="text-sm text-muted-foreground">-</span>
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
