"use client";

import type { ReactNode } from 'react';
import { useWizard } from '@/components/WizardWhatsApp';

export default function WizardButton({ className, children }: { className?: string; children: ReactNode }) {
  const { open } = useWizard();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
