// TODO: define AvatarProps with name and optional size (default 'md')

export function Avatar({ name }: { name: string }) {
  // TODO: show initials from name, apply avatar-{size} CSS class
  return <div className="avatar">{name[0]}</div>;
}
