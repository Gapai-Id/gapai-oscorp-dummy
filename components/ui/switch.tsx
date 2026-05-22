import { cn } from '@/lib/utils';

interface SwitchProps {
  checked?: boolean;
  className?: string;
}

export function Switch({ checked = false, className }: SwitchProps) {
  return (
    <div
      className={cn(
        'inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-sm transition-colors',
        checked ? 'bg-primary' : 'bg-input',
        className,
      )}
    >
      <div
        className={cn(
          'h-4 w-4 rounded-full bg-background shadow-lg transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0',
        )}
      />
    </div>
  );
}
