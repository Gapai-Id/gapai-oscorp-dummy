'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, BookOpen, CheckCircle2, Edit, Users } from 'lucide-react';
import { useNavigate } from '@/components/navigation-context';

const TRAINING = {
  id: 'trn-1',
  name: 'Bahasa Bulgaria Intensif',
  provider: 'Bina Karya Institut',
  description: 'Program intensif belajar Bahasa Bulgaria untuk persiapan kerja di sektor hospitality. Mencakup percakapan sehari-hari, kosakata hospitality, dan budaya kerja Bulgaria.',
  curriculum: [
    'Pengenalan alfabet dan fonetik Bulgaria',
    'Percakapan dasar sehari-hari',
    'Kosakata hospitality dan layanan',
    'Simulasi situasi kerja',
    'Evaluasi akhir',
  ],
  duration: '4 minggu (20 jam total)',
  format: 'offline',
  schedule: 'Batch Juli 2026 — mulai 14 Jul 2026',
  price: 1500000,
  jakers: ['JaKer Hospitality — Bulgaria', 'JaKer Hospitality — Romania'],
  deliveryInfo: 'Jl. Gatot Subroto No. 12, Lantai 3, Jakarta Selatan 12930',
  mapsUrl: 'https://maps.google.com/?q=-6.2293866,106.8270513',
  status: 'active',
};

type EnrollmentEntry = {
  id: string;
  name: string;
  enrolledAt: string;
  status: 'enrolled' | 'completed';
  completedAt: string | null;
  completedBy: string | null;
};

const INITIAL_ENROLLED: EnrollmentEntry[] = [
  { id: 'cdt-1', name: 'Budi Santoso', enrolledAt: '28 May 2026', status: 'enrolled', completedAt: null, completedBy: null },
  { id: 'cdt-2', name: 'Siti Rahayu', enrolledAt: '29 May 2026', status: 'completed', completedAt: '2 Jun 2026, 10:30', completedBy: 'Admin Agung' },
  { id: 'cdt-3', name: 'Darto Wibowo', enrolledAt: '30 May 2026', status: 'enrolled', completedAt: null, completedBy: null },
  { id: 'cdt-4', name: 'Nurul Fadilah', enrolledAt: '1 Jun 2026', status: 'enrolled', completedAt: null, completedBy: null },
];

type DialogState = { open: boolean; candidateId: string; candidateName: string; action: 'complete' | 'incomplete' };

function FieldRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-2 py-2 border-b last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="text-sm">{value}</div>
    </div>
  );
}

export default function TrainingDetailScreen() {
  const navigateTo = useNavigate();
  const [enrollments, setEnrollments] = useState<EnrollmentEntry[]>(INITIAL_ENROLLED);
  const [dialog, setDialog] = useState<DialogState>({ open: false, candidateId: '', candidateName: '', action: 'complete' });

  const openDialog = (c: EnrollmentEntry, action: 'complete' | 'incomplete') => {
    setDialog({ open: true, candidateId: c.id, candidateName: c.name, action });
  };

  const confirm = () => {
    setEnrollments(prev => prev.map(e =>
      e.id === dialog.candidateId
        ? {
            ...e,
            status: dialog.action === 'complete' ? 'completed' : 'enrolled',
            completedAt: dialog.action === 'complete' ? '4 Jun 2026, 09:00' : null,
            completedBy: dialog.action === 'complete' ? 'Admin User' : null,
          }
        : e
    ));
    setDialog(d => ({ ...d, open: false }));
  };

  return (
    <div className="mx-10 space-y-6 pb-12">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-semibold tracking-tight">{TRAINING.name}</h2>
            <span className="inline-flex items-center rounded-full bg-success-100 text-success-700 px-2.5 py-0.5 text-xs font-medium">Active</span>
          </div>
          <p className="text-sm text-muted-foreground">{TRAINING.provider} · {TRAINING.id}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={() => navigateTo('TP-00')}>
            <ArrowLeft className="h-4 w-4 mr-1" />Back
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateTo('TP-05')}>
            <Edit className="h-4 w-4 mr-1" />Edit
          </Button>
          <Button variant="outline" size="sm" className="text-danger-600 border-danger-200 hover:bg-danger-50">
            Deactivate
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Training Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-primary-500" />
              Training Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-6">
              <FieldRow label="Provider" value={TRAINING.provider} />
              <FieldRow label="Format" value={
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TRAINING.format === 'online' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                  {TRAINING.format === 'online' ? 'Online' : 'Offline'}
                </span>
              } />
              <FieldRow label="Duration" value={TRAINING.duration} />
              <FieldRow label="Schedule" value={TRAINING.schedule} />
              <FieldRow label="Price" value={`Rp ${TRAINING.price.toLocaleString('id')}`} />
              <FieldRow label="JaKer Assignment" value={
                <div className="flex flex-wrap gap-1">
                  {TRAINING.jakers.map(j => (
                    <span key={j} className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 border border-primary-100 px-2 py-0.5 text-xs">{j}</span>
                  ))}
                </div>
              } />
            </div>
            <div className="border-t pt-4 mt-2 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm leading-relaxed">{TRAINING.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Curriculum / Learning Outcomes</p>
                <div className="space-y-1.5 mt-2">
                  {TRAINING.curriculum.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" />
                      <p className="text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Delivery Info
              <span className="text-xs font-normal text-muted-foreground ml-2">Visible to enrolled candidates only</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {TRAINING.format === 'online' ? (
              <FieldRow label="Platform Link" value={TRAINING.deliveryInfo} />
            ) : (
              <>
                <FieldRow label="Location Address" value={TRAINING.deliveryInfo} />
                <FieldRow
                  label="Google Maps"
                  value={
                    TRAINING.mapsUrl ? (
                      <a
                        href={TRAINING.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-600 hover:underline text-sm break-all"
                      >
                        {TRAINING.mapsUrl}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )
                  }
                />
              </>
            )}
          </CardContent>
        </Card>

        {/* Enrolled Candidates */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-primary-500" />
              Enrolled Candidates
              <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-600 px-2 py-0.5 text-xs font-medium">{enrollments.length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Completed By</TableHead>
                  <TableHead className="w-36" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.enrolledAt}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === 'completed' ? 'bg-success-100 text-success-700' : 'bg-blue-50 text-blue-700'}`}>
                        {c.status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                        {c.status === 'completed' ? 'Completed' : 'Enrolled'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {c.completedAt ? `${c.completedBy} · ${c.completedAt}` : '—'}
                    </TableCell>
                    <TableCell>
                      {c.status === 'enrolled' ? (
                        <Button size="sm" variant="outline" className="h-7 text-xs text-success-700 border-success-200 hover:bg-success-50" onClick={() => openDialog(c, 'complete')}>
                          Mark Complete
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground" onClick={() => openDialog(c, 'incomplete')}>
                          Mark Incomplete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialog.open} onOpenChange={(open) => setDialog(d => ({ ...d, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialog.action === 'complete' ? 'Mark Training as Completed?' : 'Mark Training as Incomplete?'}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-2 py-1">
            {dialog.action === 'complete' ? (
              <>
                <p>You are marking <strong className="text-foreground">{dialog.candidateName}</strong>&apos;s training as <strong className="text-foreground">Completed</strong>.</p>
                <p>After this, you can unlock their assessment retake from the candidate&apos;s detail page.</p>
              </>
            ) : (
              <>
                <p>You are marking <strong className="text-foreground">{dialog.candidateName}</strong>&apos;s training as <strong className="text-foreground">Incomplete</strong>.</p>
                <p className="text-warning-700 font-medium">If retake has been unlocked, it will be automatically revoked. The candidate cannot retake until re-marked complete and re-unlocked.</p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialog(d => ({ ...d, open: false }))}>Cancel</Button>
            <Button
              variant={dialog.action === 'complete' ? 'default' : 'destructive'}
              onClick={confirm}
            >
              {dialog.action === 'complete' ? 'Mark Complete' : 'Mark Incomplete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
