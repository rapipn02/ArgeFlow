export default function Table({ columns, data, onDelete, onEdit }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 mb-6 mt-6">
                    <thead className="bg-white-50">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        column.align === 'right' ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data && data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50">
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`px-6 py-4 whitespace-nowrap ${
                                                column.align === 'right' ? 'text-right' : ''
                                            }`}
                                        >
                                            {column.render
                                                ? column.render(row, rowIndex)
                                                : row[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
