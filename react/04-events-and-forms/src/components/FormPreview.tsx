import type { FormData } from '../types';

export interface FormPreviewProps {
  form: FormData;
}

// TODO: render name, email, and role from the form prop
// TODO: show "—" for empty name/email; show empty-state message when all fields are blank

export function FormPreview({ form: _form }: FormPreviewProps) {
  return (
    <section className="panel preview">
      <h2>Live preview</h2>
      <p className="preview-empty">Preview will appear here after you wire FormPreview.</p>
    </section>
  );
}
