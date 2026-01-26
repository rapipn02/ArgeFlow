export default function Pagination({ data }) {
    if (!data.links || data.data.length === 0) return null;

    return (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between mb-6 mt-5">
                <div className="text-sm text-gray-700">
                    Menampilkan{' '}
                    <span className="font-medium">{data.from}</span> sampai{' '}
                    <span className="font-medium">{data.to}</span> dari{' '}
                    <span className="font-medium">{data.total}</span> data
                </div>
            </div>
        </div>
    );
}
