export default function Pagination({ page, totalPages, setPage }) {
    return (
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <span className="px-4 py-2 bg-gray-100 rounded">{page} / {totalPages}</span>
        
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }
  