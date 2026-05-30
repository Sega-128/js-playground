import { Card } from './components/Card';
// TODO: import Avatar and UserBadge

const team = [
  { name: 'Alex Chen', role: 'Frontend Developer', online: true },
  { name: 'Sam Rivera', role: 'Backend Developer', online: false },
  { name: 'Jordan Lee', role: 'Designer' },
];

export function App() {
  return (
    <div className="app">
      <header className="page-header">
        <h1>Team</h1>
        <p>Lesson 02 — Props</p>
      </header>
      <main className="card-grid">
        {/* TODO: replace placeholder below — render Card with Avatar and UserBadge, pass all data via props */}
        {team.map((member) => (
          <p key={member.name}>TODO: card for {member.name}</p>
        ))}
      </main>
    </div>
  );
}
