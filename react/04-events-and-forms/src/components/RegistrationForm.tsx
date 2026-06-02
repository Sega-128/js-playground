import type { FormEvent } from 'react';
import type { FormData } from '../types';

export interface RegistrationFormProps {
  form: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

// TODO: wire each input with value={form.x} and onChange calling onChange('field', e.target.value)
// TODO: wire <form onSubmit={onSubmit}> and enable the submit button

export function RegistrationForm({ form, onChange: _onChange, onSubmit }: RegistrationFormProps) {
  return (
    <section className="panel">
      <h2>Sign up</h2>
      <form className="form" onSubmit={onSubmit}>
        <label className="form-field">
          <span className="form-label">Name</span>
          <input
            type="text"
            className="form-input"
            defaultValue={form.name}
            placeholder="Your name"
            disabled
          />
        </label>

        <label className="form-field">
          <span className="form-label">Email</span>
          <input
            type="email"
            className="form-input"
            defaultValue={form.email}
            placeholder="you@example.com"
            disabled
          />
        </label>

        <label className="form-field">
          <span className="form-label">Role</span>
          <select className="form-input" defaultValue={form.role} disabled>
            <option value="developer">developer</option>
            <option value="designer">designer</option>
            <option value="manager">manager</option>
          </select>
        </label>

        <button type="submit" className="btn btn-primary" disabled>
          Submit
        </button>
      </form>
      <p className="form-hint">Complete the TODOs to enable the form.</p>
    </section>
  );
}
