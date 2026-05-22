import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, GripVertical, NotepadTextDashed, Plus, Save, Trash2, X } from 'lucide-react';

const MOCK_FIELDS = [
  { id: 'f1', label: 'Full Name', type: 'text', required: true },
  { id: 'f2', label: 'Date of Birth', type: 'date', required: true },
  { id: 'f3', label: 'Height (cm)', type: 'number', required: false },
  { id: 'f4', label: 'Education Level', type: 'select', required: true },
  { id: 'f5', label: 'KTP Number', type: 'text', required: true },
  { id: 'f6', label: 'SKCK Upload', type: 'file', required: true },
  { id: 'f7', label: 'Health Statement', type: 'select', required: false },
  { id: 'f8', label: 'Emergency Contact', type: 'text', required: false },
];

const MOCK_PREVIEW_FIELDS = MOCK_FIELDS.slice(0, 4);

const fieldTypeColor: Record<string, string> = {
  text: 'bg-blue-100 text-blue-700',
  date: 'bg-purple-100 text-purple-700',
  number: 'bg-warning-100 text-warning-700',
  select: 'bg-primary-100 text-primary-700',
  file: 'bg-gray-100 text-gray-600',
};

export default function StagesEditScreen() {
  return (
    <div className="mx-10 space-y-6">
      {/* Header */}
      <div className="space-y-1 flex flex-row justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Edit Stage</h1>
          <p className="text-sm text-muted-foreground">Configure stage properties, fields, and workflow conditions</p>
        </div>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to Stages
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_460px]">
        {/* Left: Form */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Stage Name *</label>
              <Input defaultValue="Pre-Assessment" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type *</label>
              <Select defaultValue="candidate_information">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candidate_action">Candidate Action</SelectItem>
                  <SelectItem value="candidate_information">Candidate Information</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                defaultValue="Initial eligibility check: identity verification, basic health screening, and mandatory document submission before proceeding to assessment."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fields Configuration */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Form Fields</p>
                <p className="text-xs text-muted-foreground">Drag to reorder. These fields will be shown to candidates.</p>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />Add Field
              </Button>
            </div>

            <div className="space-y-2">
              {MOCK_FIELDS.map((f) => (
                <div key={f.id} className="flex items-center gap-3 rounded-lg border bg-background py-3 px-4">
                  <GripVertical className="h-4 w-4 text-muted-foreground shrink-0 cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{f.label}</span>
                      {f.required && <span className="text-xs text-danger-500">*</span>}
                    </div>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium mt-0.5 inline-block ${fieldTypeColor[f.type]}`}>{f.type}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-danger-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed py-4 text-muted-foreground">
              <Plus className="h-4 w-4" />
              <span className="text-sm">Add a new field</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-row justify-between border-t border-border pt-4">
            <Button variant="outline">
              <X className="h-4 w-4 mr-1" />Cancel
            </Button>
            <div className="flex flex-row gap-2">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-1" />Save and Publish
              </Button>
              <Button>
                <NotepadTextDashed className="h-4 w-4 mr-1" />Save as Draft
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="xl:sticky xl:top-6 self-start rounded-2xl border border-border bg-card p-5 space-y-4">
          <p className="text-sm font-semibold">Preview</p>
          <p className="text-xs text-muted-foreground">This is how candidates will see this stage form.</p>
          <div className="space-y-3">
            {MOCK_PREVIEW_FIELDS.map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="text-sm font-medium">
                  {f.label}{f.required && <span className="text-danger-500 ml-0.5">*</span>}
                </label>
                {f.type === 'text' && <Input className="h-8 text-sm pointer-events-none" placeholder={`Enter ${f.label.toLowerCase()}`} />}
                {f.type === 'date' && <Input type="date" className="h-8 text-sm pointer-events-none" />}
                {f.type === 'number' && <Input type="number" className="h-8 text-sm pointer-events-none" placeholder="0" />}
                {f.type === 'select' && (
                  <Select>
                    <SelectTrigger className="h-8 text-sm pointer-events-none">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
