'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, CheckCircle2, Circle, CircleDot, ClipboardList, FileSearch, Globe, User } from 'lucide-react';
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
  { phase: 'Jaker Enrollment', date: 'In progress', status: 'current' },
  { phase: 'Assessment', date: null, status: 'pending' },
  { phase: 'RTD Proportion', date: null, status: 'pending' },
];

const PRE_ASSESSMENT = {
  eligibility: { status: 'passed', submittedAt: '15 May 2026, 09:45' },
  profile: {
    heightCm: 172,
    weightKg: 68,
    bmiStatus: 'normal' as const,
    educationLevel: 'sma_smk',
    experienceYears: '1_to_3',
    industryBackground: ['Hospitality', 'Food & Beverage'],
    languages: [{ language: 'Bulgarian', proficiency: 'basic' }, { language: 'English', proficiency: 'conversational' }],
    countryPreference: ['europe'],
    isComplete: true,
  },
  recommendation: {
    generatedAt: '16 May 2026, 08:00',
    totalEligible: 3,
    eliminatedByHardFilter: 1,
    topResult: {
      rank: 1,
      jakerName: 'JaKer Hospitality — Bulgaria',
      totalScore: 0.82,
      isFloorScoreTrack: false,
      topSignals: ['language_match', 'industry_match', 'destination_match'],
      signalSummary: 'Dipilihkan dari level Bahasa Bulgaria dan latar Hospitality yang kamu ceritakan.',
    },
  },
  enrollment: {
    enrollmentId: 'enroll_mock_001',
    jakerId: 'jaker_mock_001',
    jakerName: 'JaKer Hospitality — Bulgaria',
    phase: 'pre_assessment',
    selectedFromRecommendationRank: 1,
    physicalConditionsAcknowledged: true,
    enrolledAt: '16 May 2026, 14:30',
  },
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

const SIGNAL_LABELS: Record<string, string> = {
  language_match: 'Language',
  destination_match: 'Destination',
  industry_match: 'Industry',
  capability_match: 'Capability',
  experience_match: 'Experience',
  education_match: 'Education',
  floor_score: 'Floor score',
};

const BMI_LABEL: Record<string, string> = {
  underweight: 'Underweight',
  normal: 'Normal',
  overweight: 'Overweight',
  obese: 'Obese',
};

const BMI_COLOR: Record<string, string> = {
  underweight: 'text-blue-600 bg-blue-50',
  normal: 'text-success-700 bg-success-100',
  overweight: 'text-warning-700 bg-warning-100',
  obese: 'text-danger-700 bg-danger-100',
};

const REGION_LABEL: Record<string, string> = {
  southeast_asia: 'Southeast Asia',
  middle_east: 'Middle East',
  east_asia: 'East Asia',
  europe: 'Europe',
  other: 'Other',
};

const EDUCATION_LABEL: Record<string, string> = {
  below_sma: 'Below SMA',
  sma_smk: 'SMA / SMK',
  diploma: 'Diploma (D1–D3)',
  bachelor: 'Bachelor (S1)',
};

const EXPERIENCE_LABEL: Record<string, string> = {
  none: 'No experience',
  less_than_1: '< 1 year',
  '1_to_3': '1–3 years',
  '3_to_5': '3–5 years',
  more_than_5: '> 5 years',
};

const PROFICIENCY_LABEL: Record<string, string> = {
  none: 'None',
  basic: 'Basic',
  conversational: 'Conversational',
  b1: 'B1',
  b2: 'B2',
  c1: 'C1',
  jlpt_n4: 'JLPT N4',
  jlpt_n3: 'JLPT N3',
  professional: 'Professional',
  native: 'Native',
};

function FieldRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-2 py-2 border-b last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="text-sm">{value}</div>
    </div>
  );
}

export default function CandidatesDetailScreen() {
  const navigateTo = useNavigate();
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

        {/* Pre-Assessment */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-primary-500" />
                Pre-Assessment
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-success-100 text-success-700 px-2.5 py-0.5 text-xs font-medium">
                <CheckCircle2 className="h-3 w-3" />Eligible
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {/* Profile */}
            <div className="pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Profile</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-0">
                <FieldRow label="Education" value={EDUCATION_LABEL[PRE_ASSESSMENT.profile.educationLevel] ?? PRE_ASSESSMENT.profile.educationLevel} />
                <FieldRow label="Experience" value={EXPERIENCE_LABEL[PRE_ASSESSMENT.profile.experienceYears] ?? PRE_ASSESSMENT.profile.experienceYears} />
                <FieldRow
                  label="Height / Weight"
                  value={
                    <span className="flex items-center gap-1.5 flex-wrap">
                      <span>{PRE_ASSESSMENT.profile.heightCm} cm, {PRE_ASSESSMENT.profile.weightKg} kg</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0 text-xs font-medium ${BMI_COLOR[PRE_ASSESSMENT.profile.bmiStatus]}`}>
                        {BMI_LABEL[PRE_ASSESSMENT.profile.bmiStatus]}
                      </span>
                    </span>
                  }
                />
                <FieldRow
                  label="Destination"
                  value={
                    <div className="flex flex-wrap gap-1">
                      {PRE_ASSESSMENT.profile.countryPreference.map(r => (
                        <span key={r} className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 border border-primary-100 px-2 py-0 text-xs font-medium">
                          {REGION_LABEL[r] ?? r}
                        </span>
                      ))}
                    </div>
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-y-0">
                <FieldRow
                  label="Industry"
                  value={
                    <div className="flex flex-wrap gap-1">
                      {PRE_ASSESSMENT.profile.industryBackground.map(i => (
                        <span key={i} className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">{i}</span>
                      ))}
                    </div>
                  }
                />
                <FieldRow
                  label="Languages"
                  value={
                    <div className="flex flex-wrap gap-1.5">
                      {PRE_ASSESSMENT.profile.languages.map(l => (
                        <span key={l.language} className="inline-flex items-center gap-1.5 rounded-lg border bg-muted/50 px-2.5 py-1 text-xs">
                          <span className="font-medium">{l.language}</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{PROFICIENCY_LABEL[l.proficiency] ?? l.proficiency}</span>
                        </span>
                      ))}
                    </div>
                  }
                />
              </div>
            </div>

            {/* Recommendation */}
            <div className="border-t py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Top Match</p>
                <span className="text-xs text-muted-foreground">{PRE_ASSESSMENT.recommendation.generatedAt} · {PRE_ASSESSMENT.recommendation.totalEligible} Jakerss ranked</span>
              </div>
              <div className="rounded-xl border bg-primary-50/40 p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-semibold truncate">{PRE_ASSESSMENT.recommendation.topResult.jakerName}</p>
                    <p className="text-xs text-muted-foreground">Ranked #1 of {PRE_ASSESSMENT.recommendation.totalEligible}</p>
                  </div>
                  <div className="shrink-0 text-center">
                    <div className="text-2xl font-bold text-primary-600 leading-none">
                      {Math.round(PRE_ASSESSMENT.recommendation.topResult.totalScore * 100)}%
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">match score</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PRE_ASSESSMENT.recommendation.topResult.topSignals.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 rounded-full bg-primary-100 text-primary-700 px-2 py-0.5 text-xs font-medium">
                      <CheckCircle2 className="h-3 w-3 shrink-0" />{SIGNAL_LABELS[s] ?? s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed border-t border-primary-100 pt-2">
                  {PRE_ASSESSMENT.recommendation.topResult.signalSummary}
                </p>
              </div>
              {PRE_ASSESSMENT.recommendation.eliminatedByHardFilter > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  +{PRE_ASSESSMENT.recommendation.eliminatedByHardFilter} Jaker did not pass hard filter.
                </p>
              )}
            </div>

            {/* Enrollment */}
            <div className="border-t pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Enrollment</p>
              <FieldRow label="Jaker" value={<span className="font-medium">{PRE_ASSESSMENT.enrollment.jakerName}</span>} />
              <FieldRow label="From rank" value={`#${PRE_ASSESSMENT.enrollment.selectedFromRecommendationRank}`} />
              <FieldRow
                label="Physical conditions"
                value={
                  PRE_ASSESSMENT.enrollment.physicalConditionsAcknowledged
                    ? <span className="inline-flex items-center gap-1 text-success-700 text-xs font-medium"><CheckCircle2 className="h-3.5 w-3.5" />Acknowledged</span>
                    : <span className="inline-flex items-center gap-1 text-danger-600 text-xs font-medium">Declined</span>
                }
              />
              <FieldRow label="Enrolled" value={PRE_ASSESSMENT.enrollment.enrolledAt} />
            </div>
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
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${a.result === 'pass' ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'}`}>
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
