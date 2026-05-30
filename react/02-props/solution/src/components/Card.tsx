import type { ReactNode } from 'react';

export interface CardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <article className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <div className="card-body">{children}</div>
    </article>
  );
}
