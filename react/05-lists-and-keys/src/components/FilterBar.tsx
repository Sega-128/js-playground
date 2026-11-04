import type { Filter } from '../types';

interface Props {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const FILTERS: Filter[] = ['all', 'active', 'done'];

export function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter todos">
      {/* TODO: render a button for each item in FILTERS
            - label: capitalize the filter name (e.g. "All", "Active", "Done")
            - add className "btn btn-filter" and "active" when filter === current
            - onClick: call onChange(f)
            Hint: FILTERS.map((f) => ...) — don't forget the key prop!
      */}
      <p style={{ color: '#999', margin: 0 }}>Filter buttons go here</p>
    </div>
  );
}
