import type { FormEvent } from 'react';
import type { FormData } from '../types';

export interface RegistrationFormProps {
  form: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const roles: FormData['role'][] = ['developer', 'designer', 'manager'];

export function RegistrationForm({ form, onChange, onSubmit }: RegistrationFormProps) {
  return (
    <section className="panel">
      <h2>Sign up</h2>
      <form className="form" onSubmit={onSubmit}>
        <label className="form-field">
          <span className="form-label">Name</span>
          <input
            type="text"
            className="form-input"
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

        <label className="form-field">
          <span className="form-label">Email</span>
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label className="form-field">
          <span className="form-label">Role</span>
          <select
            className="form-input"
            value={form.role}
            onChange={(e) => onChange('role', e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </section>
  );
}
