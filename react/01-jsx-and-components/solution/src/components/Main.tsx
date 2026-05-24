const technologies: string[] = ['React', 'TypeScript', 'Vite'];

export function Main() {
  return (
    <main className="main">
      <h2>Tech Stack</h2>
      <ul>
        {technologies.map((tech) => (
          <li>{tech}</li>
        ))}
      </ul>
    </main>
  );
}
