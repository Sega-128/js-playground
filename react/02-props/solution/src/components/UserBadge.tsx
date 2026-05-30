export interface UserBadgeProps {
  name: string;
  role: string;
  online?: boolean;
}

export function UserBadge({ name, role, online }: UserBadgeProps) {
  return (
    <div className="user-badge">
      <div className="user-badge-info">
        <span className="user-badge-name">{name}</span>
        <span className="user-badge-role">{role}</span>
      </div>
      {online && <span className="online-dot" aria-label="Online" />}
    </div>
  );
}
