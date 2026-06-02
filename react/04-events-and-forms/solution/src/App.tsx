import { useState, type FormEvent } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { FormPreview } from './components/FormPreview';
import type { FormData } from './types';

const initialForm: FormData = {
  name: '',
  email: '',
  role: 'developer',
};

export function App() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="app">
      <header className="page-header">
        <h1>Registration</h1>
        <p>Lesson 04 — Events & Forms</p>
      </header>

      {submitted && (
        <p className="success-banner" role="status">
          Registration submitted! Thanks, {form.name || 'guest'}.
        </p>
      )}

      <main className="layout">
        <RegistrationForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
        <FormPreview form={form} />
      </main>
    </div>
  );
}
