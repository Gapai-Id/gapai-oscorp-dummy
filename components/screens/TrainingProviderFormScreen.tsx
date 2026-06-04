'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building2, Upload } from 'lucide-react';
import { useNavigate } from '@/components/navigation-context';

export default function TrainingProviderFormScreen() {
  const navigateTo = useNavigate();
  return (
    <div className="mx-10 space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Add Training Provider</h2>
          <p className="text-sm text-muted-foreground">Trainings can be added after the provider is saved.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigateTo('TP-01')}>
          <ArrowLeft className="h-4 w-4 mr-1" />Cancel
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-4 w-4 text-primary-500" />
            Provider Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Provider Name <span className="text-danger-600">*</span></label>
            <Input placeholder="e.g. Bina Karya Institut" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Short Description <span className="text-danger-600">*</span></label>
            <Textarea placeholder="Briefly describe this provider and the type of trainings they offer..." rows={3} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Logo / Image</label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 shrink-0">
                <Building2 className="h-6 w-6 text-gray-300" />
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1.5" />Upload Logo
                </Button>
                <p className="text-xs text-muted-foreground mt-1.5">PNG or JPG · Max 2 MB · Recommended 256×256px</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigateTo('TP-01')}>Cancel</Button>
        <Button onClick={() => navigateTo('TP-02')}>Save Provider</Button>
      </div>
    </div>
  );
}
