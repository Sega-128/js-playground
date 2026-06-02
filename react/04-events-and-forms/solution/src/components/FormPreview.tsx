import type { FormData } from '../types';

export interface FormPreviewProps {
  form: FormData;
}

function display(value: string) {
  return value.trim() === '' ? '—' : value;
}

export function FormPreview({ form }: FormPreviewProps) {
  const isEmpty = !form.name && !form.email;

  return (
    <section className="panel preview">
      <h2>Live preview</h2>
      {isEmpty ? (
        <p className="preview-empty">Start typing to see your preview.</p>
      ) : (
        <dl className="preview-list">
          <div className="preview-row">
            <dt>Name</dt>
            <dd>{display(form.name)}</dd>
          </div>
          <div className="preview-row">
            <dt>Email</dt>
            <dd>{display(form.email)}</dd>
          </div>
          <div className="preview-row">
            <dt>Role</dt>
            <dd>{form.role}</dd>
          </div>
        </dl>
      )}
    </section>
  );
}
