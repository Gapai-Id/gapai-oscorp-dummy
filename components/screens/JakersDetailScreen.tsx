import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Globe, Languages, Pencil, User, Wrench } from 'lucide-react';

const MOCK = {
  id: 'jkr-1',
  name: 'JaKer Hospitality — Bulgaria',
  status: 'published' as const,
  hasDraftChanges: false,
  updatedAt: '22 May 2026',
  candidateBasic: {
    gender: 'Both',
    ageRange: '20–35 years',
    maritalStatus: 'Single / Married',
    heightCm: '155–175 cm',
    weightKg: '45–80 kg',
    physicalConditions: null as string | null,
    educationLevel: 'SMA/SMK & Vocational',
    majorBackground: 'Hospitality & Tourism',
    experience: '0–1 Year',
    industryBackground: 'Hotel & Restaurant',
    experienceProof: 'Required',
  },
  language: {
    requiredLanguages: [
      { lang: 'Bulgarian', level: 'Basic' },
      { lang: 'English', level: 'Conversational' },
    ],
    certFramework: 'CEFR (A1–C2)',
    passThreshold: 65,
    focusArea: 'Daily + Technical',
    formalCert: false,
  },
  skills: {
    certification: 'Not required',
    mandatorySkills: ['Table service', 'Food handling', 'POS system', 'Guest communication'],
    toolsMachines: ['POS terminal', 'Commercial dishwasher', 'Coffee machine'],
    competencyDesc: 'Candidate must demonstrate professional table service, handle common F&B equipment, and maintain guest satisfaction standards.',
    languageTime: '30 mins',
    skillTime: '60 mins',
    mainJobTasks: ['Serve food & beverages', 'Maintain table cleanliness', 'Handle guest requests', 'Assist kitchen team'],
  },
  placement: {
    destinationCountries: ['Bulgaria', 'Romania'],
    floorScoreTrack: 'Yes',
  },
};

function FieldRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-2 border-b py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm">{value ?? <span className="text-muted-foreground">—</span>}</span>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  if (!items?.length) return <span className="text-muted-foreground">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Badge key={item} variant="secondary" className="text-xs">{item}</Badge>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items?.length) return <span className="text-muted-foreground">—</span>;
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm">
          <span className="shrink-0 text-muted-foreground">{i + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const StatusBadge = ({ status, hasDraftChanges }: { status: typeof MOCK.status; hasDraftChanges?: boolean }) => {
  if (status === 'published') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center rounded-full bg-success-100 text-success-700 px-2 py-0 text-xs font-medium">Published</span>
        {hasDraftChanges && (
          <Badge variant="outline" className="border-dashed border-orange-400 px-2 py-0 text-xs text-orange-600">Unsaved changes</Badge>
        )}
      </div>
    );
  }
  if (status === 'archived') {
    return <Badge variant="outline" className="px-2 py-0 text-xs">Archived</Badge>;
  }
  return <Badge variant="outline" className="border-dashed border-orange-500 px-2 py-0 text-xs text-orange-600">Draft</Badge>;
};

export default function JakersDetailScreen() {
  return (
    <div className="mx-10 space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">{MOCK.name}</h2>
            <StatusBadge status={MOCK.status} hasDraftChanges={MOCK.hasDraftChanges} />
          </div>
          <p className="text-sm text-muted-foreground">Last updated {MOCK.updatedAt}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />Back to Jaker List
          </Button>
          <Button size="sm">
            <Pencil className="h-4 w-4 mr-1" />Edit
          </Button>
        </div>
      </div>

      {/* 2-column section grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Candidate Basic */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <User className="h-4 w-4 text-primary-500" />
              Candidate Basic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldRow label="Name" value={MOCK.name} />
            <FieldRow label="Gender" value={MOCK.candidateBasic.gender} />
            <FieldRow label="Age Range" value={MOCK.candidateBasic.ageRange} />
            <FieldRow label="Marital Status" value={MOCK.candidateBasic.maritalStatus} />
            <FieldRow label="Height Range" value={MOCK.candidateBasic.heightCm} />
            <FieldRow label="Weight Range" value={MOCK.candidateBasic.weightKg} />
            <FieldRow
              label="Physical Conditions"
              value={MOCK.candidateBasic.physicalConditions ?? (
                <span className="text-muted-foreground text-xs italic">
                  None specified — system baseline applies (physically &amp; mentally healthy, free from TB and HIV)
                </span>
              )}
            />
            <FieldRow label="Education Level" value={MOCK.candidateBasic.educationLevel} />
            <FieldRow label="Major Background" value={MOCK.candidateBasic.majorBackground} />
            <FieldRow label="Experience" value={MOCK.candidateBasic.experience} />
            <FieldRow label="Industry Background" value={MOCK.candidateBasic.industryBackground} />
            <FieldRow label="Experience Proof" value={MOCK.candidateBasic.experienceProof} />
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Languages className="h-4 w-4 text-primary-500" />
              Language Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldRow
              label="Required Languages"
              value={
                <div className="space-y-1">
                  {MOCK.language.requiredLanguages.map((l) => (
                    <div key={l.lang} className="text-sm">
                      <span className="font-medium">{l.lang}</span> — {l.level}
                    </div>
                  ))}
                </div>
              }
            />
            <FieldRow label="Certification Framework" value={MOCK.language.certFramework} />
            <FieldRow label="Pass Threshold" value={MOCK.language.passThreshold} />
            <FieldRow label="Focus Area" value={MOCK.language.focusArea} />
            <FieldRow label="Formal Certificate" value={MOCK.language.formalCert ? 'Required' : 'Not required'} />
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Wrench className="h-4 w-4 text-primary-500" />
              Skills Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldRow label="Skill Certification" value={MOCK.skills.certification} />
            <FieldRow label="Mandatory Skills" value={<TagList items={MOCK.skills.mandatorySkills} />} />
            <FieldRow label="Tools / Machines" value={<TagList items={MOCK.skills.toolsMachines} />} />
            <FieldRow label="Competency Description" value={MOCK.skills.competencyDesc} />
            <FieldRow label="Language Assessment" value={MOCK.skills.languageTime} />
            <FieldRow label="Skill Assessment" value={MOCK.skills.skillTime} />
            <FieldRow label="Main Job Tasks" value={<BulletList items={MOCK.skills.mainJobTasks} />} />
          </CardContent>
        </Card>

        {/* Placement */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Globe className="h-4 w-4 text-primary-500" />
              Placement & Destination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldRow label="Destination Countries" value={<TagList items={MOCK.placement.destinationCountries} />} />
            <FieldRow label="Floor Score Track" value={MOCK.placement.floorScoreTrack} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
