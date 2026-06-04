'use client';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BookOpen, CheckCircle2, Plus, X } from 'lucide-react';
import { useNavigate } from '@/components/navigation-context';

const PROVIDERS = ['Bina Karya Institut', 'Global Skills Academy', 'Mandiri Training Center'];
const JAKERS = [
  'JaKer Hospitality — Bulgaria',
  'JaKer Hospitality — Romania',
  'JaKer Manufacturing — Poland',
  'JaKer Healthcare — Germany',
];

function CurriculumEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateItem = (i: number, val: string) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };

  const addItem = (afterIndex?: number) => {
    const idx = afterIndex !== undefined ? afterIndex + 1 : items.length;
    const next = [...items];
    next.splice(idx, 0, '');
    onChange(next);
    requestAnimationFrame(() => inputRefs.current[idx]?.focus());
  };

  const removeItem = (i: number) => {
    if (items.length === 1) return;
    const next = items.filter((_, idx) => idx !== i);
    onChange(next);
    requestAnimationFrame(() => inputRefs.current[Math.min(i, next.length - 1)]?.focus());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(i);
    }
    if (e.key === 'Backspace' && items[i] === '' && items.length > 1) {
      e.preventDefault();
      removeItem(i);
    }
  };

  return (
    <div className="rounded-lg border bg-white focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-shadow">
      <div className="px-3 pt-3 pb-1 space-y-0.5">
        {items.map((item, i) => (
          <div key={i} className="group flex items-start gap-2 py-1">
            <CheckCircle2 className="h-4 w-4 text-primary-500 mt-2 shrink-0" />
            <input
              ref={(el) => { inputRefs.current[i] = el; }}
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              placeholder="Tambah poin kurikulum..."
              className="flex-1 py-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="opacity-0 group-hover:opacity-100 transition-opacity mt-1.5 text-muted-foreground hover:text-destructive shrink-0"
              tabIndex={-1}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <div className="px-3 pb-3 pt-1 border-t border-dashed border-gray-100">
        <button
          type="button"
          onClick={() => addItem()}
          className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Tambah poin
        </button>
      </div>
    </div>
  );
}

export default function TrainingFormScreen() {
  const navigateTo = useNavigate();
  const [format, setFormat] = useState<string>('online');
  const [selectedJakers, setSelectedJakers] = useState<string[]>(['JaKer Hospitality — Bulgaria']);
  const [curriculum, setCurriculum] = useState<string[]>(['']);

  const toggleJaker = (j: string) => {
    setSelectedJakers(prev => prev.includes(j) ? prev.filter(x => x !== j) : [...prev, j]);
  };

  return (
    <div className="mx-10 space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Add Training</h2>
          <p className="text-sm text-muted-foreground">Delivery info is shown to candidates only after payment.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigateTo('TP-00')}>
          <ArrowLeft className="h-4 w-4 mr-1" />Cancel
        </Button>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-primary-500" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Training Name <span className="text-danger-600">*</span></label>
              <Input placeholder="e.g. Bahasa Bulgaria Intensif" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Provider <span className="text-danger-600">*</span></label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select provider" /></SelectTrigger>
                <SelectContent>
                  {PROVIDERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description <span className="text-danger-600">*</span></label>
            <Textarea placeholder="Describe what this training covers and who it's for..." rows={3} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Curriculum / Learning Outcomes <span className="text-danger-600">*</span>
            </label>
            <p className="text-xs text-muted-foreground -mt-1">
              Tekan Enter untuk tambah poin baru. Tampilannya persis seperti yang kandidat lihat di app.
            </p>
            <CurriculumEditor items={curriculum} onChange={setCurriculum} />
          </div>
        </CardContent>
      </Card>

      {/* Schedule & Format */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Schedule & Format</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration <span className="text-danger-600">*</span></label>
              <Input placeholder="e.g. 4 minggu (20 jam)" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format <span className="text-danger-600">*</span></label>
              <Select defaultValue="online" onValueChange={(v) => setFormat(v ?? 'online')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Schedule / Estimated Dates <span className="text-danger-600">*</span></label>
              <Input placeholder="e.g. Batch Juli 2026, mulai 14 Jul" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-w-xs">
            <label className="text-sm font-medium">Price (IDR) <span className="text-danger-600">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">Rp</span>
              <Input placeholder="1.500.000" className="pl-9" />
            </div>
            <p className="text-xs text-muted-foreground">All-in price — commission is handled offline, not in platform.</p>
          </div>
        </CardContent>
      </Card>

      {/* JaKer Assignment */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">JaKer Assignment <span className="text-danger-600">*</span></CardTitle>
          <p className="text-sm text-muted-foreground">Select which JaKers this training will be visible to. At least one required.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {JAKERS.map(j => (
              <label key={j} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedJakers.includes(j)}
                  onChange={() => toggleJaker(j)}
                  className="h-4 w-4 rounded border-gray-300 accent-primary-600"
                />
                <span className="text-sm">{j}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Delivery Info</CardTitle>
          <p className="text-sm text-muted-foreground">Shown to candidates only after payment. Leave blank if not yet confirmed.</p>
        </CardHeader>
        <CardContent>
          {format === 'online' ? (
            <div className="space-y-2 max-w-lg">
              <label className="text-sm font-medium">Platform Link</label>
              <Input placeholder="e.g. https://zoom.us/j/..." />
            </div>
          ) : (
            <div className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location Address</label>
                <Textarea placeholder="e.g. Jl. Gatot Subroto No. 12, Lantai 3, Jakarta Selatan 12930" rows={2} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Google Maps Link</label>
                <Input placeholder="e.g. https://maps.google.com/?q=..." />
                <p className="text-xs text-muted-foreground">Paste link dari Google Maps. Kandidat bisa langsung buka di HP mereka.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigateTo('TP-00')}>Cancel</Button>
        <Button onClick={() => navigateTo('TP-06')}>Save Training</Button>
      </div>
    </div>
  );
}
