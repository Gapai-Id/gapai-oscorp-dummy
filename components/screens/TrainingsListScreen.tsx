'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { useNavigate } from '@/components/navigation-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function JakerBadges({ jakers }: { jakers: string[] }) {
  const overflow = jakers.slice(1);
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1">
        <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 border border-primary-100 px-2 py-0 text-xs">{jakers[0]}</span>
        {overflow.length > 0 && (
          <Tooltip>
            <TooltipTrigger>
              <span className="cursor-default inline-flex items-center rounded-full bg-gray-100 text-gray-600 px-2 py-0 text-xs font-medium">+{overflow.length}</span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="space-y-1">
                {overflow.map(j => <p key={j} className="text-xs">{j}</p>)}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}

const MOCK = [
  { id: 'trn-1', name: 'Bahasa Bulgaria Intensif', provider: 'Bina Karya Institut', jakers: ['JaKer Hospitality — Bulgaria'], format: 'offline', price: 1500000, enrolled: 4, status: 'active' },
  { id: 'trn-2', name: 'Hospitality Service Skills', provider: 'Bina Karya Institut', jakers: ['JaKer Hospitality — Bulgaria', 'JaKer Hospitality — Romania'], format: 'online', price: 800000, enrolled: 7, status: 'active' },
  { id: 'trn-3', name: 'English for Hospitality Workers', provider: 'Global Skills Academy', jakers: ['JaKer Hospitality — Bulgaria'], format: 'online', price: 600000, enrolled: 2, status: 'active' },
  { id: 'trn-4', name: 'Komunikasi Efektif di Tempat Kerja', provider: 'Mandiri Training Center', jakers: ['JaKer Manufacturing — Poland'], format: 'offline', price: 1200000, enrolled: 0, status: 'inactive' },
];

export default function TrainingsListScreen() {
  const navigateTo = useNavigate();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Trainings</h2>
          <p className="text-sm text-muted-foreground">Manage all trainings available to candidates across JaKers.</p>
        </div>
        <Button size="sm" onClick={() => navigateTo('TP-05')}><Plus className="h-4 w-4 mr-1" />Add Training</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search trainings..." className="pl-9 h-9" />
            </div>
            <Select defaultValue="all-jakers">
              <SelectTrigger className="w-52 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all-jakers">All JaKers</SelectItem>
                <SelectItem value="jkr-1">JaKer Hospitality — Bulgaria</SelectItem>
                <SelectItem value="jkr-2">JaKer Hospitality — Romania</SelectItem>
                <SelectItem value="jkr-3">JaKer Manufacturing — Poland</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-providers">
              <SelectTrigger className="w-44 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all-providers">All Providers</SelectItem>
                <SelectItem value="tp-1">Bina Karya Institut</SelectItem>
                <SelectItem value="tp-2">Global Skills Academy</SelectItem>
                <SelectItem value="tp-3">Mandiri Training Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Training Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>JaKer</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK.map((t) => (
                <TableRow key={t.id} className="cursor-pointer" onClick={() => navigateTo('TP-06')}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.provider}</TableCell>
                  <TableCell><JakerBadges jakers={t.jakers} /></TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${t.format === 'online' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                      {t.format === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">Rp {t.price.toLocaleString('id')}</TableCell>
                  <TableCell className="text-sm">{t.enrolled}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${t.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'}`}>
                      {t.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
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
