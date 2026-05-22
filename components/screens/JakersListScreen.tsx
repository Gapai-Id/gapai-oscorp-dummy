import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Plus, RefreshCw, Search } from 'lucide-react';

const MOCK = [
  {
    id: 'jkr-1',
    name: 'JaKer Hospitality — Bulgaria',
    status: 'published',
    unsavedChanges: false,
    countries: ['Bulgaria', 'Romania'],
    updatedAt: '22 May 2026, 09:14',
  },
  {
    id: 'jkr-2',
    name: 'JaKer Hospitality — Romania',
    status: 'published',
    unsavedChanges: true,
    countries: ['Romania'],
    updatedAt: '21 May 2026, 16:30',
  },
  {
    id: 'jkr-3',
    name: 'JaKer Manufacturing — Poland',
    status: 'draft',
    unsavedChanges: false,
    countries: ['Poland', 'Czech Republic', 'Slovakia'],
    updatedAt: '20 May 2026, 11:00',
  },
  {
    id: 'jkr-4',
    name: 'JaKer Healthcare — Germany',
    status: 'draft',
    unsavedChanges: false,
    countries: ['Germany'],
    updatedAt: '18 May 2026, 14:45',
  },
  {
    id: 'jkr-5',
    name: 'JaKer Construction — Qatar',
    status: 'archived',
    unsavedChanges: false,
    countries: ['Qatar', 'UAE', 'Saudi Arabia', 'Kuwait'],
    updatedAt: '10 May 2026, 08:20',
  },
];

const statusVariant: Record<string, string> = {
  published: 'bg-success-100 text-success-700',
  draft: 'bg-gray-100 text-gray-600',
  archived: 'bg-orange-100 text-orange-700',
};

export default function JakersListScreen() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Jaker Management</h2>
          <p className="text-sm text-muted-foreground">Manage qualification templates for each job bench type.</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Jaker</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search jakers..." className="pl-9 h-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-36 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jaker Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destination Countries</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK.map((j) => {
                const visible = j.countries.slice(0, 3);
                const overflow = j.countries.length - 3;
                return (
                  <TableRow key={j.id} className="cursor-pointer">
                    <TableCell className="font-medium">{j.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className={`inline-flex w-fit text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusVariant[j.status]}`}>
                          {j.status}
                        </span>
                        {j.unsavedChanges && (
                          <span className="text-[10px] text-warning-600 font-medium">Unsaved changes</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {visible.map((c) => (
                          <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                        ))}
                        {overflow > 0 && (
                          <Badge variant="secondary" className="text-xs">+{overflow} more</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{j.updatedAt}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
