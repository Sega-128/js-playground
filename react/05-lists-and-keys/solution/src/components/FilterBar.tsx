import type { Filter } from '../types';

interface Props {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const FILTERS: Filter[] = ['all', 'active', 'done'];

export function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter todos">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`btn btn-filter${filter === f ? ' active' : ''}`}
          onClick={() => onChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
