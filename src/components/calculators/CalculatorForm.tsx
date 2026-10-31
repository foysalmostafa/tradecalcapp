'use client';

import { Children, isValidElement, type ReactNode } from 'react';

// Keep fields editable while withholding misleading results for invalid input.
function hasControl(node: ReactNode): boolean {
  if (!isValidElement<{ children?: ReactNode }>(node)) return false;
  return node.type === NumberField || ['input', 'select', 'button'].includes(String(node.type)) ||
    Children.toArray(node.props.children).some(hasControl);
}

export function CalculatorForm({ children, error }: { children: ReactNode; error?: string }) {
  return <div className="space-y-6">
    {error && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">{error}</p>}
    {Children.toArray(children).filter(child => !error || hasControl(child))}
  </div>;
}

export type NumberRule = [string, string, number?, number?, boolean?, boolean?];
export function inputError(rules: NumberRule[]): string | undefined {
  for (const [label, raw, min = 0, max = 1e12, integer = false, optional = false] of rules) {
    if (optional && raw.trim() === '') continue;
    const n = Number(raw);
    if (raw.trim() === '' || !Number.isFinite(n)) return `Enter a valid number for ${label}.`;
    if (n < min || n > max) return `${label} must be between ${min} and ${max}.`;
    if (integer && !Number.isInteger(n)) return `${label} must be a whole number.`;
  }
}

export function NumberField({ label, value, onChange, min = 0, max, step = 'any' }: {
  label: string; value: string; onChange: (value: string) => void;
  min?: number; max?: number; step?: number | string;
}) {
  return <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    {label}<input className="calc-input mt-1" type="number" value={value} min={min} max={max} step={step}
      onChange={e => onChange(e.target.value)} />
  </label>;
}
