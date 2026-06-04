'use client';
import { useState } from 'react';
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

const PROVIDERS = [
  { id: 'tp-1', name: 'Bina Karya Institut', description: 'Pelatihan kerja mandiri untuk TKI', trainingsCount: 3, status: 'active', updatedAt: '1 Jun 2026, 10:00' },
  { id: 'tp-2', name: 'Global Skills Academy', description: 'English proficiency and soft skills', trainingsCount: 2, status: 'active', updatedAt: '30 May 2026, 14:30' },
  { id: 'tp-3', name: 'Mandiri Training Center', description: 'Technical skills for manufacturing', trainingsCount: 1, status: 'inactive', updatedAt: '20 May 2026, 09:00' },
];

const TRAININGS = [
  { id: 'trn-1', name: 'Bahasa Bulgaria Intensif', provider: 'Bina Karya Institut', jakers: ['JaKer Hospitality — Bulgaria'], format: 'offline', price: 1500000, enrolled: 4, status: 'active' },
  { id: 'trn-2', name: 'Hospitality Service Skills', provider: 'Bina Karya Institut', jakers: ['JaKer Hospitality — Bulgaria', 'JaKer Hospitality — Romania'], format: 'online', price: 800000, enrolled: 7, status: 'active' },
  { id: 'trn-3', name: 'English for Hospitality Workers', provider: 'Global Skills Academy', jakers: ['JaKer Hospitality — Bulgaria'], format: 'online', price: 600000, enrolled: 2, status: 'active' },
  { id: 'trn-4', name: 'Komunikasi Efektif di Tempat Kerja', provider: 'Mandiri Training Center', jakers: ['JaKer Manufacturing — Poland'], format: 'offline', price: 1200000, enrolled: 0, status: 'inactive' },
];

type Tab = 'providers' | 'trainings';

export default function TrainingHubScreen() {
  const navigateTo = useNavigate();
  const [tab, setTab] = useState<Tab>('providers');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Training</h2>
          <p className="text-sm text-muted-foreground">Manage training providers and available trainings for candidates.</p>
        </div>
        {tab === 'providers' ? (
          <Button size="sm" onClick={() => navigateTo('TP-03')}>
            <Plus className="h-4 w-4 mr-1" />Add Provider
          </Button>
        ) : (
          <Button size="sm" onClick={() => navigateTo('TP-05')}>
            <Plus className="h-4 w-4 mr-1" />Add Training
          </Button>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200">
        <button
          onClick={() => setTab('providers')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === 'providers' ? 'border-primary-600 text-primary-700' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          Providers
        </button>
        <button
          onClick={() => setTab('trainings')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === 'trainings' ? 'border-primary-600 text-primary-700' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          Trainings
        </button>
      </div>

      {/* Providers */}
      {tab === 'providers' && (
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
                {PROVIDERS.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                      No providers yet. Add a provider to get started.
                    </TableCell>
                  </TableRow>
                ) : PROVIDERS.map((p) => (
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
      )}

      {/* Trainings */}
      {tab === 'trainings' && (
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
                {TRAININGS.map((t) => (
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
      )}
    </div>
  );
}
