import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle, Save, Trash2 } from 'lucide-react';

const SECTIONS = [
  { step: 1, label: 'Candidate Basic' },
  { step: 2, label: 'Language' },
  { step: 3, label: 'Skills' },
  { step: 4, label: 'Placement' },
];

const CURRENT_SECTION = 4;
const PROGRESS = ((CURRENT_SECTION - 1) / 4) * 100;

export default function JakersEditScreen() {
  return (
    <div className="mx-10 space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Edit Jaker</h2>
          <p className="text-sm text-muted-foreground">Editing: <span className="font-medium text-foreground">JaKer Hospitality — Bulgaria</span></p>
        </div>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to Detail
        </Button>
      </div>

      {/* Stepper */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Step {CURRENT_SECTION} of 4 — Placement</span>
          <span className="text-muted-foreground">{Math.round(PROGRESS)}% complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full">
          <div className="h-2 bg-primary-500 rounded-full" style={{ width: `${PROGRESS}%` }} />
        </div>
        <div className="flex justify-between">
          {SECTIONS.map((s) => (
            <span
              key={s.step}
              className={`text-xs ${s.step < CURRENT_SECTION ? 'text-primary-500 hover:underline cursor-pointer' : s.step === CURRENT_SECTION ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Form + Sidebar */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        {/* Form — Section 4: Placement */}
        <div>
          <Card>
            <CardContent className="pt-6 space-y-5">
              <p className="text-xs text-muted-foreground">* Required field</p>

              <div className="space-y-2">
                <label className="text-sm font-medium">Destination Countries *</label>
                <p className="text-xs text-muted-foreground">Select all countries where this Jaker can be deployed.</p>
                <div className="flex flex-wrap gap-2">
                  {['Bulgaria', 'Romania'].map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      {c}
                      <button type="button" className="ml-1 text-primary-500 hover:text-primary-700">×</button>
                    </span>
                  ))}
                  <Input placeholder="Add country..." className="h-7 w-36 text-xs" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Floor Score Track *</label>
                <Select defaultValue="hospitality">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospitality">Hospitality Track — Score ≥ 70</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing Track — Score ≥ 65</SelectItem>
                    <SelectItem value="healthcare">Healthcare Track — Score ≥ 75</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Employer (Optional)</label>
                <Input defaultValue="Hotel Sofia Grand" placeholder="Specific employer or leave blank for open placement" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deployment Notes</label>
                <Input placeholder="Any additional placement instructions..." />
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />Back
              </Button>
              <Button variant="outline" size="sm" className="text-danger-600 border-danger-200 hover:bg-danger-50">
                <Trash2 className="h-4 w-4 mr-1" />Archive Jaker
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />Save Draft
              </Button>
              <Button size="sm">
                <CheckCircle className="h-4 w-4 mr-1" />Publish Jaker
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
                    <div key={s.step} className="flex items-center gap-2 text-sm text-primary-500">
                      <CheckCircle className="h-4 w-4 shrink-0" />
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
                  <p className="text-sm">Both</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Language</p>
                  <p className="text-sm">Bulgarian + English</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Destinations</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Bulgaria</Badge>
                    <Badge variant="secondary" className="text-xs">Romania</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
