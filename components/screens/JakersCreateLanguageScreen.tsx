import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Info, Languages, Plus, Save } from 'lucide-react';

const SECTIONS = [
  { step: 1, label: 'Candidate Basic' },
  { step: 2, label: 'Language' },
  { step: 3, label: 'Skills' },
  { step: 4, label: 'Placement' },
];

const CURRENT_SECTION = 2;
const PROGRESS = ((CURRENT_SECTION - 1) / 4) * 100;

const MOCK_LANGUAGES = [
  { id: 'l1', language: 'english', level: 'conversational', weight: '1.0' },
];

export default function JakersCreateLanguageScreen() {
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
          <span className="font-medium text-foreground">Step {CURRENT_SECTION} of 4 — Language</span>
          <span className="text-muted-foreground">{Math.round(PROGRESS)}% complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full">
          <div className="h-2 bg-primary-500 rounded-full" style={{ width: `${PROGRESS}%` }} />
        </div>
        <div className="flex justify-between">
          {SECTIONS.map((s) => (
            <span
              key={s.step}
              className={`text-xs ${s.step < CURRENT_SECTION ? 'text-primary-500 cursor-pointer hover:underline' : s.step === CURRENT_SECTION ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Form + Sidebar */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <p className="text-xs text-muted-foreground">* Required field</p>

              {/* Section header */}
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold">Language Requirements</h2>
              </div>

              {/* Required Languages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Required Languages * <span className="text-muted-foreground text-xs font-normal">(minimum 1)</span></label>
                </div>

                {MOCK_LANGUAGES.map((lang) => (
                  <div key={lang.id} className="rounded-lg border p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Language *</label>
                        <Select defaultValue={lang.language}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                            <SelectItem value="korean">Korean</SelectItem>
                            <SelectItem value="arabic">Arabic</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="bulgarian">Bulgarian</SelectItem>
                            <SelectItem value="romanian">Romanian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Minimum Level *</label>
                        <Select defaultValue={lang.level}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="conversational">Conversational</SelectItem>
                            <SelectItem value="b1">B1</SelectItem>
                            <SelectItem value="b2">B2</SelectItem>
                            <SelectItem value="c1">C1</SelectItem>
                            <SelectItem value="jlpt_n4">JLPT N4</SelectItem>
                            <SelectItem value="jlpt_n3">JLPT N3</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="native">Native</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Weight <span className="text-muted-foreground text-xs font-normal">(auto-set to 1.0 for single-language Jakers)</span></label>
                      <Input type="number" step="0.1" min={0} max={1} defaultValue={lang.weight} className="bg-muted text-muted-foreground" readOnly />
                    </div>
                  </div>
                ))}

                <Button variant="outline" size="sm">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />Add language
                </Button>
              </div>

              {/* Certification Framework */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Certification Framework *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select framework" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CEFR">CEFR (A1–C2)</SelectItem>
                    <SelectItem value="JLPT">JLPT (N1–N5)</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pass Threshold */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Pass Threshold *</label>
                <p className="text-xs text-muted-foreground">Display label shown on the candidate's RTD profile for employers.</p>
                <Input placeholder="e.g., Conversational, Professional" />
                <p className="text-xs text-muted-foreground">Changes to a select (A1–C2 / N5–N1) when CEFR or JLPT framework is selected.</p>
              </div>

              {/* Focus Area */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Focus Area *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select focus area" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="daily_technical">Daily + Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Formal Language Certificate Required */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <p className="text-base font-medium">Formal Language Certificate Required</p>
                  <p className="text-sm text-muted-foreground">Candidate must provide a recognized language certificate (e.g., JLPT card, CEFR certificate).</p>
                </div>
                <Switch />
              </div>

              {/* System info */}
              <div className="flex items-start gap-2 rounded-lg border border-muted bg-muted/40 px-4 py-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Language pass score: 70% (system default)</span> — this standard is maintained by authoring questions at the correct level for this Jaker, not by changing this number.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />Save Draft
              </Button>
              <Button size="sm">
                Next: Skills<ArrowRight className="h-4 w-4 ml-1" />
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

              <div className="border-t pt-4 space-y-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Summary</p>
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm font-medium truncate">JaKer Hospitality — Bulgaria</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p className="text-sm">Male / Female</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
