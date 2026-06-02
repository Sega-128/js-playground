// TODO: import useState from 'react'
// TODO: add form state with useState<FormData> (name, email, role: 'developer')
// TODO: add submitted state with useState(false)
// TODO: implement handleChange — update one field with spread, set submitted to false
// TODO: implement handleSubmit — e.preventDefault(), set submitted to true

import { RegistrationForm } from './components/RegistrationForm';
import { FormPreview } from './components/FormPreview';
import type { FormData } from './types';

const initialForm: FormData = {
  name: '',
  email: '',
  role: 'developer',
};

export function App() {
  const form = initialForm;
  const submitted = false;

  const handleChange = (_field: keyof FormData, _value: string) => {
    // TODO: update form state
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // TODO: set submitted to true
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
