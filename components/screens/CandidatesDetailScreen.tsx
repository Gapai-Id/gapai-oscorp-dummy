import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, BriefcaseBusiness, CheckCircle2, Circle, CircleDot, ClipboardList, Globe, User } from 'lucide-react';

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
  { phase: 'Jaker Selection', date: 'In progress', status: 'current' },
  { phase: 'Assessment', date: null, status: 'pending' },
  { phase: 'RTD Proportion', date: null, status: 'pending' },
];

const JAKER = {
  name: 'JaKer Hospitality — Bulgaria',
  assessmentStatus: 'Awaiting Assessment',
};

const ASSESSMENTS = [
  {
    jaker: 'JaKer Hospitality — Bulgaria',
    languageScore: 78,
    skillScore: 82,
    result: 'pass',
    takenAt: '16 May 2026',
  },
];

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-2 py-2 border-b last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

export default function CandidatesDetailScreen() {
  return (
    <div className="mx-10 space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-semibold tracking-tight">{CANDIDATE.name}</h2>
            <span className="inline-flex items-center rounded-full bg-success-100 text-success-700 px-2.5 py-0.5 text-xs font-medium">
              Active
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{CANDIDATE.id} · Registered 15 May 2026</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm">
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
              <User className="h-4 w-4 text-primary-500" />
              Personal Info
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
              <Globe className="h-4 w-4 text-primary-500" />
              Pipeline Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              {TIMELINE.map((t, i) => (
                <div key={t.phase} className="relative pb-5 last:pb-0">
                  {/* Connecting line */}
                  {i < TIMELINE.length - 1 && (
                    <div className={`absolute left-[-13px] top-5 w-0.5 h-full ${t.status === 'done' ? 'bg-success-400' : 'bg-gray-200'}`} />
                  )}
                  {/* Icon */}
                  <div className="absolute left-[-21px] top-0.5">
                    {t.status === 'done' && <CheckCircle2 className="h-4 w-4 text-success-500" />}
                    {t.status === 'current' && <CircleDot className="h-4 w-4 text-primary-500" />}
                    {t.status === 'pending' && <Circle className="h-4 w-4 text-gray-300" />}
                  </div>
                  <div className="space-y-0.5">
                    <p className={`text-sm font-medium ${
                      t.status === 'done' ? 'text-success-700'
                      : t.status === 'current' ? 'text-foreground'
                      : 'text-muted-foreground'
                    }`}>
                      {t.phase}
                      {t.status === 'current' && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-primary-50 border border-primary-200 px-2 py-0 text-xs font-medium text-primary-700">In progress</span>
                      )}
                    </p>
                    {t.date && (
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Jaker */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BriefcaseBusiness className="h-4 w-4 text-primary-500" />
              Jaker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldRow label="Jaker" value={JAKER.name} />
            <FieldRow label="Assessment Status" value={JAKER.assessmentStatus} />
          </CardContent>
        </Card>

        {/* Assessment Results */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="h-4 w-4 text-primary-500" />
              Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ASSESSMENTS.map((a) => (
              <div key={a.jaker} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{a.jaker}</p>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    a.result === 'pass'
                      ? 'bg-success-100 text-success-700'
                      : 'bg-danger-100 text-danger-700'
                  }`}>
                    {a.result === 'pass' ? 'Pass' : 'Fail'}
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
      </div>
    </div>
  );
}
