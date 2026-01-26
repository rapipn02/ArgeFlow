import { Search } from 'lucide-react';

export default function SearchFilter({ 
    searchPlaceholder = 'Cari...', 
    onSearch,
    filters = [],
    searchValue = ''
}) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filters.map((filter, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {filter.label}
                        </label>
                        {filter.type === 'select' ? (
                            <select 
                                value={filter.value}
                                onChange={filter.onChange}
                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                {filter.options.map((option, optIndex) => (
                                    <option key={optIndex} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={filter.type || 'text'}
                                value={filter.value}
                                onChange={filter.onChange}
                                placeholder={filter.placeholder}
                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        )}
                    </div>
                ))}
                
                {onSearch && (
                    <div className={filters.length > 0 ? 'md:col-span-2' : 'md:col-span-3'}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cari
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={onSearch}
                                placeholder={searchPlaceholder}
                                className="w-full pl-10 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
