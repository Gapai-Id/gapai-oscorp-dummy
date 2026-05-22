import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, CheckCircle, Globe, Save } from 'lucide-react';

const SECTIONS = [
  { step: 1, label: 'Candidate Basic' },
  { step: 2, label: 'Language' },
  { step: 3, label: 'Skills' },
  { step: 4, label: 'Placement' },
];

const CURRENT_SECTION = 4;
const PROGRESS = ((CURRENT_SECTION - 1) / 4) * 100;

export default function JakersCreatePlacementScreen() {
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
          <span className="font-medium text-foreground">Step {CURRENT_SECTION} of 4 — Placement</span>
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
                <Globe className="h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold">Placement & Destination</h2>
              </div>

              {/* Destination Countries */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination Countries *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select destination countries" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bulgaria">Bulgaria</SelectItem>
                    <SelectItem value="romania">Romania</SelectItem>
                    <SelectItem value="poland">Poland</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="south_korea">South Korea</SelectItem>
                    <SelectItem value="saudi_arabia">Saudi Arabia</SelectItem>
                    <SelectItem value="uae">United Arab Emirates</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Actual: MultiSelect — multiple countries allowed</p>
              </div>

              {/* Floor Score Track */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <p className="text-base font-medium">Floor Score Track</p>
                  <p className="text-sm text-muted-foreground">
                    When on, this Jaker always appears in candidate results if it passes hard filters (minimum recommendation score: 0.40). Use for highly accessible bench types.
                  </p>
                </div>
                <Switch />
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
