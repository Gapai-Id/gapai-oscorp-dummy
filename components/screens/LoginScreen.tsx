import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, LogIn } from 'lucide-react';

export default function LoginScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold">
            <div className="flex flex-col items-center justify-center gap-3">
              {/* gapai wordmark — replicated as styled text since image not in inventory */}
              <div className="text-3xl font-bold text-primary-600 tracking-tight" style={{ fontFamily: 'sans-serif' }}>
                gapai
              </div>
              <div className="text-2xl font-semibold">Gapai Dashboard Portal</div>
            </div>
          </CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your.email@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input type="password" placeholder="Enter your password" className="pr-10" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <Button className="w-full">
              <LogIn className="h-4 w-4 mr-2" />Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
