import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  { step: 1, label: 'Basic Information' },
  { step: 2, label: 'Job Details' },
  { step: 3, label: 'Compensation' },
  { step: 4, label: 'Logistics' },
  { step: 5, label: 'Pre-Pipeline Config' },
  { step: 6, label: 'Info Session' },
  { step: 7, label: 'Pipeline Setup' },
  { step: 8, label: 'Review & Publish' },
];

const CURRENT_STEP = 1;
const TOTAL_STEPS = 8;
const PROGRESS = (CURRENT_STEP / TOTAL_STEPS) * 100;

export default function JobsCreateScreen() {
  return (
    <div className="mx-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-xl">Create New Job</CardTitle>
          <CardDescription>Step {CURRENT_STEP} of {TOTAL_STEPS}</CardDescription>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full">
        <div className="h-2 bg-primary-500 rounded-full" style={{ width: `${PROGRESS}%` }} />
      </div>

      <div className="flex justify-between gap-2">
        {STEPS.map(({ step: s, label }) => (
          <div key={`${s}-${label}`} className="flex items-center gap-2">
            <span
              className={`rounded-md px-2 py-1 text-sm font-medium ${
                s === CURRENT_STEP
                  ? 'bg-primary-500 text-primary-foreground'
                  : 'bg-grey-100 text-grey-600'
              }`}
            >
              {s}
            </span>
            <span
              className={`rounded-md px-1 py-1 text-sm font-medium ${
                s === CURRENT_STEP ? 'text-primary-500' : 'text-grey-600'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title *</label>
            <Input placeholder="e.g. Waiter / Waitress" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company *</label>
              <Input placeholder="e.g. Hotel Sofia Grand" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Input placeholder="e.g. Food & Beverage" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <Input placeholder="e.g. Sofia" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Country *</label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bulgaria">Bulgaria</SelectItem>
                  <SelectItem value="romania">Romania</SelectItem>
                  <SelectItem value="poland">Poland</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sector / Industry *</label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Vacancies *</label>
            <Input type="number" placeholder="1" min={1} className="max-w-xs" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Application Deadline *</label>
            <Input type="date" className="max-w-xs" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between border-t pt-6">
        <Button variant="outline">
          Cancel
        </Button>
        <Button>
          Next<ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
