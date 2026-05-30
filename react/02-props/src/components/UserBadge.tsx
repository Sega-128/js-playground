// TODO: define UserBadgeProps with name, role, and optional online

export function UserBadge({ name, role }: { name: string; role: string }) {
  // TODO: add online prop and show green dot when online is true
  return (
    <div className="user-badge">
      <span>{name}</span>
      <span>{role}</span>
    </div>
  );
}
