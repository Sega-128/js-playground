export interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  return (
    <div className={`avatar avatar-${size}`} aria-label={name}>
      {getInitials(name)}
    </div>
  );
}
