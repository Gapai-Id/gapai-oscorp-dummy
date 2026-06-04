'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Bell, BookOpen, CheckCircle2, Circle, CircleDot, ClipboardList, FileSearch, Globe, Lock, LockOpen, User, XCircle } from 'lucide-react';
import { useNavigate } from '@/components/navigation-context';

const CANDIDATE = {
  id: 'CDT-0021',
  name: 'Budi Santoso',
  phone: '+62 812-3456-7890',
  dob: '15 March 1995',
  gender: 'Male',
  domisiliCity: 'Surabaya',
  domisiliProvince: 'Jawa Timur',
  ktpAddress: 'Jl. Pahlawan No. 45, RT 03/RW 02, Surabaya, Jawa Timur 60271',
  status: 'active',
};

const TIMELINE = [
  { phase: 'Onboarding', date: '15 May 2026, 09:12', status: 'done' },
  { phase: 'Pre-Assessment', date: '16 May 2026, 14:30', status: 'done' },
  { phase: 'Jaker Enrollment', date: '17 May 2026, 10:00', status: 'done' },
  { phase: 'Assessment', date: '20 May 2026 — Result: Fail', status: 'done' },
  { phase: 'In Training', date: 'In progress', status: 'current' },
  { phase: 'RTD Proportion', date: null, status: 'pending' },
];

type TrainingStatus = 'enrolled' | 'completed';
type RetakeStatus = 'locked' | 'unlocked';

const INITIAL_TRAINING = {
  name: 'Bahasa Bulgaria Intensif',
  provider: 'Bina Karya Institut',
  format: 'offline',
  enrolledAt: '28 May 2026, 14:00',
  status: 'enrolled' as TrainingStatus,
  completedAt: null as string | null,
  completedBy: null as string | null,
  retakeStatus: 'locked' as RetakeStatus,
  retakeUnlockedAt: null as string | null,
  retakeUnlockedBy: null as string | null,
};

const ASSESSMENTS = [
  {
    jaker: 'JaKer Hospitality — Bulgaria',
    languageScore: 52,
    skillScore: 48,
    result: 'fail',
    takenAt: '20 May 2026',
  },
];

type DialogType = 'complete' | 'incomplete' | 'unlock' | 'relock' | null;

function FieldRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-2 py-2 border-b last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="text-sm">{value}</div>
    </div>
  );
}

export default function CandidatesDetailTrainingScreen() {
  const navigateTo = useNavigate();
  const [training, setTraining] = useState(INITIAL_TRAINING);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  const handleConfirm = () => {
    if (dialogType === 'complete') {
      setTraining(t => ({ ...t, status: 'completed', completedAt: '4 Jun 2026, 09:15', completedBy: 'Admin User' }));
    } else if (dialogType === 'incomplete') {
      setTraining(t => ({ ...t, status: 'enrolled', completedAt: null, completedBy: null, retakeStatus: 'locked', retakeUnlockedAt: null, retakeUnlockedBy: null }));
    } else if (dialogType === 'unlock') {
      setTraining(t => ({ ...t, retakeStatus: 'unlocked', retakeUnlockedAt: '4 Jun 2026, 09:30', retakeUnlockedBy: 'Admin User' }));
    } else if (dialogType === 'relock') {
      setTraining(t => ({ ...t, retakeStatus: 'locked', retakeUnlockedAt: null, retakeUnlockedBy: null }));
    }
    setDialogType(null);
  };

  const dialogMeta: Record<NonNullable<DialogType>, { title: string; body: React.ReactNode; confirmLabel: string; destructive?: boolean }> = {
    complete: {
      title: 'Mark Training as Completed?',
      body: (
        <div className="space-y-2">
          <p>Mark <strong className="text-foreground">Budi Santoso</strong>&apos;s training as <strong className="text-foreground">Completed</strong>.</p>
          <p>After this, you can unlock their assessment retake.</p>
        </div>
      ),
      confirmLabel: 'Mark Complete',
    },
    incomplete: {
      title: 'Mark Training as Incomplete?',
      body: (
        <div className="space-y-2">
          <p>Mark <strong className="text-foreground">Budi Santoso</strong>&apos;s training as <strong className="text-foreground">Incomplete</strong>.</p>
          <p className="text-warning-700 font-medium">If retake has been unlocked, it will be automatically revoked.</p>
        </div>
      ),
      confirmLabel: 'Mark Incomplete',
      destructive: true,
    },
    unlock: {
      title: 'Unlock Assessment Retake?',
      body: (
        <div className="space-y-2">
          <p>Unlock assessment retake for <strong className="text-foreground">Budi Santoso</strong>.</p>
          <p>The candidate will receive a WhatsApp notification and can retake the assessment from their dashboard.</p>
        </div>
      ),
      confirmLabel: 'Unlock Retake',
    },
    relock: {
      title: 'Re-lock Assessment Retake?',
      body: (
        <div className="space-y-2">
          <p>Re-lock assessment retake for <strong className="text-foreground">Budi Santoso</strong>.</p>
          <p>The candidate will no longer be able to retake until you unlock again.</p>
        </div>
      ),
      confirmLabel: 'Re-lock Retake',
      destructive: true,
    },
  };

  const active = dialogType ? dialogMeta[dialogType] : null;

  return (
    <div className="mx-10 space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-semibold tracking-tight">{CANDIDATE.name}</h2>
            <span className="inline-flex items-center rounded-full bg-success-100 text-success-700 px-2.5 py-0.5 text-xs font-medium">Active</span>
          </div>
          <p className="text-sm text-muted-foreground">{CANDIDATE.id} · Registered 15 May 2026</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={() => navigateTo('CM-02')}>
            <ArrowLeft className="h-4 w-4 mr-1" />Back to Candidates
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-1" />Send Reminder
          </Button>
          <Button variant="outline" size="sm" className="text-danger-600 border-danger-200 hover:bg-danger-50">
            Deactivate Account
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Personal Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary-500" />Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldRow label="Phone" value={CANDIDATE.phone} />
            <FieldRow label="Date of Birth" value={CANDIDATE.dob} />
            <FieldRow label="Gender" value={CANDIDATE.gender} />
            <FieldRow label="Domicile" value={`${CANDIDATE.domisiliCity}, ${CANDIDATE.domisiliProvince}`} />
            <FieldRow label="KTP Address" value={CANDIDATE.ktpAddress} />
          </CardContent>
        </Card>

        {/* Pipeline Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4 text-primary-500" />Pipeline Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              {TIMELINE.map((t, i) => (
                <div key={t.phase} className="relative pb-5 last:pb-0">
                  {i < TIMELINE.length - 1 && (
                    <div className={`absolute left-[-13px] top-5 w-0.5 h-full ${t.status === 'done' ? 'bg-success-400' : 'bg-gray-200'}`} />
                  )}
                  <div className="absolute left-[-21px] top-0.5">
                    {t.status === 'done' && <CheckCircle2 className="h-4 w-4 text-success-500" />}
                    {t.status === 'current' && <CircleDot className="h-4 w-4 text-primary-500" />}
                    {t.status === 'pending' && <Circle className="h-4 w-4 text-gray-300" />}
                  </div>
                  <div className="space-y-0.5">
                    <p className={`text-sm font-medium ${t.status === 'done' ? 'text-success-700' : t.status === 'current' ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {t.phase}
                      {t.status === 'current' && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-primary-50 border border-primary-200 px-2 py-0 text-xs font-medium text-primary-700">In progress</span>
                      )}
                    </p>
                    {t.date && <p className="text-xs text-muted-foreground">{t.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Results */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="h-4 w-4 text-primary-500" />Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ASSESSMENTS.map((a) => (
              <div key={a.jaker} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{a.jaker}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-danger-100 text-danger-700 px-2.5 py-0.5 text-xs font-medium">
                    <XCircle className="h-3 w-3" />Fail
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Language Score</p>
                    <p className="text-lg font-semibold">{a.languageScore}<span className="text-xs text-muted-foreground font-normal">/100</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Skill Score</p>
                    <p className="text-lg font-semibold">{a.skillScore}<span className="text-xs text-muted-foreground font-normal">/100</span></p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Taken on {a.takenAt}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Training */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-primary-500" />Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium">{training.name}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${training.status === 'completed' ? 'bg-success-100 text-success-700' : 'bg-blue-50 text-blue-700'}`}>
                    {training.status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                    {training.status === 'completed' ? 'Completed' : 'Enrolled'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{training.provider} · {training.format === 'online' ? 'Online' : 'Offline'}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {training.status === 'enrolled' ? (
                  <Button size="sm" variant="outline" className="text-success-700 border-success-200 hover:bg-success-50" onClick={() => setDialogType('complete')}>
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />Mark Complete
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => setDialogType('incomplete')}>
                    Mark Incomplete
                  </Button>
                )}
              </div>
            </div>

            <FieldRow label="Enrolled" value={training.enrolledAt} />
            {training.completedAt && (
              <FieldRow
                label="Completed"
                value={<span>{training.completedAt} <span className="text-muted-foreground">by {training.completedBy}</span></span>}
              />
            )}

            {/* Retake unlock section */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    Assessment Retake
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${training.retakeStatus === 'unlocked' ? 'bg-primary-50 text-primary-700 border border-primary-200' : 'bg-gray-100 text-gray-600'}`}>
                      {training.retakeStatus === 'unlocked' ? <LockOpen className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                      {training.retakeStatus === 'unlocked' ? 'Unlocked' : 'Locked'}
                    </span>
                  </p>
                  {training.retakeUnlockedAt && (
                    <p className="text-xs text-muted-foreground mt-0.5">Unlocked {training.retakeUnlockedAt} by {training.retakeUnlockedBy}</p>
                  )}
                  {training.status !== 'completed' && training.retakeStatus === 'locked' && (
                    <p className="text-xs text-muted-foreground mt-0.5">Mark training as complete first to unlock retake.</p>
                  )}
                </div>
                <div>
                  {training.retakeStatus === 'locked' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={training.status !== 'completed'}
                      onClick={() => setDialogType('unlock')}
                    >
                      <LockOpen className="h-4 w-4 mr-1.5" />Unlock Retake
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => setDialogType('relock')}>
                      <Lock className="h-4 w-4 mr-1.5" />Re-lock Retake
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pre-Assessment (collapsed for brevity) */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-primary-500" />Pre-Assessment
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-success-100 text-success-700 px-2.5 py-0.5 text-xs font-medium">
                <CheckCircle2 className="h-3 w-3" />Eligible
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldRow label="Jaker" value={<span className="font-medium">JaKer Hospitality — Bulgaria</span>} />
            <FieldRow label="Enrolled" value="16 May 2026, 14:30" />
            <FieldRow label="Education" value="SMA / SMK" />
            <FieldRow label="Experience" value="1–3 years" />
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={dialogType !== null} onOpenChange={(open) => { if (!open) setDialogType(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{active?.title}</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground py-1">{active?.body}</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogType(null)}>Cancel</Button>
            <Button variant={active?.destructive ? 'destructive' : 'default'} onClick={handleConfirm}>
              {active?.confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
