import { Card } from './components/Card';
import { Avatar } from './components/Avatar';
import { UserBadge } from './components/UserBadge';

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
        {team.map((member) => (
          <Card
            key={member.name}
            title={member.name}
            description={member.role}
          >
            <div className="member-row">
              <Avatar name={member.name} size="lg" />
              <UserBadge
                name={member.name}
                role={member.role}
                online={member.online}
              />
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
}
