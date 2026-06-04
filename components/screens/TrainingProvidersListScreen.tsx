'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { useNavigate } from '@/components/navigation-context';

const MOCK = [
  { id: 'tp-1', name: 'Bina Karya Institut', description: 'Pelatihan kerja mandiri untuk TKI', trainingsCount: 3, status: 'active', updatedAt: '1 Jun 2026, 10:00' },
  { id: 'tp-2', name: 'Global Skills Academy', description: 'English proficiency and soft skills', trainingsCount: 2, status: 'active', updatedAt: '30 May 2026, 14:30' },
  { id: 'tp-3', name: 'Mandiri Training Center', description: 'Technical skills for manufacturing', trainingsCount: 1, status: 'inactive', updatedAt: '20 May 2026, 09:00' },
];

export default function TrainingProvidersListScreen() {
  const navigateTo = useNavigate();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Training Providers</h2>
          <p className="text-sm text-muted-foreground">Manage external training providers available for candidates.</p>
        </div>
        <Button size="sm" onClick={() => navigateTo('TP-03')}><Plus className="h-4 w-4 mr-1" />Add Provider</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search providers..." className="pl-9 h-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider Name</TableHead>
                <TableHead>Trainings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                    No providers yet. Add a provider to get started.
                  </TableCell>
                </TableRow>
              ) : MOCK.map((p) => (
                <TableRow key={p.id} className="cursor-pointer" onClick={() => navigateTo('TP-02')}>
                  <TableCell>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </TableCell>
                  <TableCell className="text-sm">{p.trainingsCount} trainings</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'}`}>
                      {p.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.updatedAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
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
