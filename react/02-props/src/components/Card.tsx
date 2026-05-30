import type { ReactNode } from 'react';

// TODO: define CardProps interface with title, description, and children

export function Card({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  // TODO: implement Card layout (article, heading, description, body)
  return (
    <article className="card">
      <p>TODO: Card — {title}</p>
      {children}
    </article>
  );
}
