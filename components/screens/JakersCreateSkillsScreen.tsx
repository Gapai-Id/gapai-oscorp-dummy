import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, ArrowRight, CheckCircle, Info, Plus, Save, Wrench } from 'lucide-react';

const SECTIONS = [
  { step: 1, label: 'Candidate Basic' },
  { step: 2, label: 'Language' },
  { step: 3, label: 'Skills' },
  { step: 4, label: 'Placement' },
];

const CURRENT_SECTION = 3;
const PROGRESS = ((CURRENT_SECTION - 1) / 4) * 100;

const MOCK_TASKS = [
  'Serve food & beverages to guests according to hospitality standards',
  'Maintain cleanliness and readiness of table settings',
  'Handle guest requests and resolve complaints professionally',
];

export default function JakersCreateSkillsScreen() {
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
          <span className="font-medium text-foreground">Step {CURRENT_SECTION} of 4 — Skills</span>
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
                <Wrench className="h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold">Skills Requirements</h2>
              </div>

              {/* Skill Certification Required */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <p className="text-base font-medium">Skill Certification Required</p>
                  <p className="text-sm text-muted-foreground">Candidate must hold a recognized skill certification for this bench.</p>
                </div>
                <Switch />
              </div>

              {/* Main Job Tasks */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Main Job Tasks * <span className="text-muted-foreground text-xs font-normal">(minimum 3)</span></label>
                {MOCK_TASKS.map((task, i) => (
                  <div key={i} className="flex gap-2">
                    <Textarea
                      className="resize-none flex-1"
                      rows={2}
                      defaultValue={task}
                      placeholder={`Task ${i + 1} — describe what the candidate will do`}
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />Add task
                </Button>
              </div>

              {/* Tools / Machines */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tools / Machines Used *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select tools / machines" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pos">POS Terminal</SelectItem>
                    <SelectItem value="dishwasher">Commercial Dishwasher</SelectItem>
                    <SelectItem value="coffee">Coffee Machine</SelectItem>
                    <SelectItem value="laundry">Industrial Laundry Machine</SelectItem>
                    <SelectItem value="vacuum">Industrial Vacuum Cleaner</SelectItem>
                    <SelectItem value="forklift">Forklift</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Actual: MultiSelect — multiple values allowed</p>
              </div>

              {/* Mandatory Skill */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Mandatory Skill *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select mandatory skills" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table_service">Table service</SelectItem>
                    <SelectItem value="food_handling">Food handling</SelectItem>
                    <SelectItem value="guest_comm">Guest communication</SelectItem>
                    <SelectItem value="room_cleaning">Room cleaning & turndown</SelectItem>
                    <SelectItem value="linen">Linen & laundry handling</SelectItem>
                    <SelectItem value="welding">Welding (basic)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Actual: MultiSelect — multiple values allowed</p>
              </div>

              {/* Skill Competency Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Skill Competency Description <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
                <p className="text-xs text-muted-foreground">For internal assessor reference only — not used by the scoring engine.</p>
                <Textarea
                  className="resize-none"
                  rows={3}
                  placeholder="Describe what competency looks like for this bench type…"
                />
              </div>

              {/* System info */}
              <div className="flex items-start gap-2 rounded-lg border border-muted bg-muted/40 px-4 py-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Skill pass score: 70% (system default, difficulty-weighted)</span> — Easy questions = 1pt, Medium = 2pt, Hard = 3pt. This standard is maintained by authoring questions at the right difficulty distribution.
                </p>
              </div>

              {/* Assessment time estimates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language Assessment Time (mins) *</label>
                  <Input type="number" placeholder="e.g., 20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skill Assessment Time (mins) *</label>
                  <Input type="number" placeholder="e.g., 15" />
                </div>
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
                Next: Placement<ArrowRight className="h-4 w-4 ml-1" />
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
                        : <div className="h-4 w-4 shrink-0 rounded-full border-2 border-current" />
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
                <div>
                  <p className="text-xs text-muted-foreground">Language</p>
                  <p className="text-sm">English</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
