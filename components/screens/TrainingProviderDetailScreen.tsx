'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Building2, Edit, Plus } from 'lucide-react';
import { useNavigate } from '@/components/navigation-context';

const PROVIDER = {
  id: 'tp-1',
  name: 'Bina Karya Institut',
  description: 'Pelatihan kerja mandiri untuk TKI yang ingin meningkatkan kompetensi sesuai kebutuhan pasar kerja internasional. Berpengalaman sejak 2018 dengan ribuan alumni yang telah bekerja di luar negeri.',
  status: 'active',
  createdAt: '15 May 2026',
};

const TRAININGS = [
  { id: 'trn-1', name: 'Bahasa Bulgaria Intensif', jakers: ['JaKer Hospitality — Bulgaria'], format: 'offline', price: 1500000, status: 'active' },
  { id: 'trn-2', name: 'Hospitality Service Skills', jakers: ['JaKer Hospitality — Bulgaria', 'JaKer Hospitality — Romania'], format: 'online', price: 800000, status: 'active' },
  { id: 'trn-3', name: 'Komunikasi Efektif di Tempat Kerja', jakers: ['JaKer Manufacturing — Poland'], format: 'offline', price: 1200000, status: 'inactive' },
];

export default function TrainingProviderDetailScreen() {
  const navigateTo = useNavigate();
  return (
    <div className="mx-10 space-y-6 pb-12">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-semibold tracking-tight">{PROVIDER.name}</h2>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${PROVIDER.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'}`}>
              {PROVIDER.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{PROVIDER.id} · Added {PROVIDER.createdAt}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={() => navigateTo('TP-00')}>
            <ArrowLeft className="h-4 w-4 mr-1" />Back
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateTo('TP-03')}>
            <Edit className="h-4 w-4 mr-1" />Edit
          </Button>
          <Button variant="outline" size="sm" className="text-danger-600 border-danger-200 hover:bg-danger-50">
            Deactivate
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary-500" />
              Provider Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <Building2 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{PROVIDER.name}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{PROVIDER.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Trainings</CardTitle>
              <Button size="sm" onClick={() => navigateTo('TP-05')}><Plus className="h-4 w-4 mr-1" />Add Training</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Training Name</TableHead>
                  <TableHead>JaKer Assignment</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRAININGS.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer" onClick={() => navigateTo('TP-06')}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {t.jakers.slice(0, 1).map(j => (
                          <span key={j} className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 border border-primary-100 px-2 py-0 text-xs">{j}</span>
                        ))}
                        {t.jakers.length > 1 && <span className="text-xs text-muted-foreground">+{t.jakers.length - 1} more</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${t.format === 'online' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                        {t.format === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">Rp {t.price.toLocaleString('id')}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${t.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'}`}>
                        {t.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
