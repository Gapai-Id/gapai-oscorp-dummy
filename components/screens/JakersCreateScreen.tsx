import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Save, User } from 'lucide-react';

const SECTIONS = [
  { step: 1, label: 'Candidate Basic' },
  { step: 2, label: 'Language' },
  { step: 3, label: 'Skills' },
  { step: 4, label: 'Placement' },
];

const CURRENT_SECTION = 1;
const PROGRESS = ((CURRENT_SECTION - 1) / 4) * 100;

export default function JakersCreateScreen() {
  return (
    <div className="mx-10 space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">New Jaker</h2>
          <p className="text-sm text-muted-foreground">Create a qualification template for a new bench type.</p>
        </div>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to Jaker List
        </Button>
      </div>

      {/* Stepper */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Step {CURRENT_SECTION} of 4 — Candidate Basic</span>
          <span className="text-muted-foreground">{Math.round(PROGRESS)}% complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full">
          <div className="h-2 bg-primary-500 rounded-full" style={{ width: `${PROGRESS}%` }} />
        </div>
        <div className="flex justify-between">
          {SECTIONS.map((s) => (
            <span
              key={s.step}
              className={`text-xs ${s.step < CURRENT_SECTION ? 'text-primary-500' : s.step === CURRENT_SECTION ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Form + Sidebar */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        {/* Form */}
        <div>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <p className="text-xs text-muted-foreground">* Required field</p>

              {/* Section header */}
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold">Candidate Basic Requirements</h2>
              </div>

              {/* Jaker Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Jaker Name *</label>
                <Input placeholder="e.g., Housekeeping" />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender Requirement *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select gender requirement" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="both">Male / Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Age *</label>
                  <Input type="number" placeholder="e.g., 18" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Age *</label>
                  <Input type="number" placeholder="e.g., 45" />
                </div>
              </div>

              {/* Marital Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Marital Status <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
                <Select defaultValue="__none__">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">No requirement</SelectItem>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="single_or_married">Single or Married</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Height range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Height (cm) *</label>
                  <Input type="number" placeholder="e.g., 150" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Height (cm) *</label>
                  <Input type="number" placeholder="e.g., 185" />
                </div>
              </div>

              {/* Weight range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Weight (kg) *</label>
                  <Input type="number" placeholder="e.g., 45" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Weight (kg) *</label>
                  <Input type="number" placeholder="e.g., 90" />
                </div>
              </div>

              {/* Physical Conditions */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Specific Physical Conditions <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
                <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
                  All candidates are already required to be physically and mentally healthy and free from TB and HIV — platform-wide baseline. Only add conditions specific to this bench type.
                </div>
                <Input placeholder="Type a bench-specific condition and press Enter" />
              </div>

              {/* Education Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Education Level *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select education level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below_sma">Below SMA/SMK</SelectItem>
                    <SelectItem value="sma_smk">SMA/SMK & Vocational</SelectItem>
                    <SelectItem value="diploma">Diploma D1–D3</SelectItem>
                    <SelectItem value="bachelor">Bachelor S1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Major / Background */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Major / Background <span className="text-muted-foreground text-xs font-normal">(optional — leave blank to accept all)</span></label>
                <Select defaultValue="__none__">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">Open to all — no restriction</SelectItem>
                    <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
                    <SelectItem value="nursing">Nursing & Healthcare</SelectItem>
                    <SelectItem value="welding">Welding & Metalworking</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="other">Other / General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Required */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Required *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select experience requirement" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0_1_year">0–1 Year</SelectItem>
                    <SelectItem value="1_year">1 Year</SelectItem>
                    <SelectItem value="2_plus_years">2+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Industry Background */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry Background *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select industry backgrounds" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel & Hospitality</SelectItem>
                    <SelectItem value="restaurant">Restaurant & F&B</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Actual: MultiSelect — multiple values allowed</p>
              </div>

              {/* Experience Proof Required */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <p className="text-base font-medium">Experience Proof Required</p>
                  <p className="text-sm text-muted-foreground">Candidate must provide proof of prior work experience.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />Save Draft
              </Button>
              <Button size="sm">
                Next: Language<ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:sticky xl:top-6 self-start">
          <Card>
            <CardContent className="pt-6 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Progress</p>
                <div className="space-y-2">
                  {SECTIONS.map((s) => (
                    <div
                      key={s.step}
                      className={`flex items-center gap-2 text-sm ${s.step < CURRENT_SECTION ? 'text-primary-500' : s.step === CURRENT_SECTION ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
                    >
                      {s.step < CURRENT_SECTION
                        ? <CheckCircle className="h-4 w-4 shrink-0" />
                        : <Circle className="h-4 w-4 shrink-0" />
                      }
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Summary</p>
                <p className="text-xs text-muted-foreground italic">Fill in the form to see a preview here.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
