import { SearchIcon } from '@icons';
import { Lang } from '@lang';

export interface FilterFieldProps {
  setSearchParam(searchParam: string): void;
}

export function FilterField({ setSearchParam }: FilterFieldProps) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <SearchIcon styles="h-6 h-6 text-gray-500" />
      </span>
      <input
        type="search"
        name="search"
        className="py-2 pl-10 rounded-md text-sm focus:ring-0 text-gray-900 focus:ring-primary-500/75 border-gray-300"
        placeholder={Lang.Components.Filter}
        autoComplete="off"
        onChange={(e) => setSearchParam(e.target.value)}
      />
    </div>
  );
}

export default FilterField;
