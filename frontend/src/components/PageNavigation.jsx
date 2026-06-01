import { ChevronLeft, ChevronRight } from "lucide-react";

function PageNavigation({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // Jangan tampilkan paginasi jika hanya ada 1 halaman atau kurang

  // tombol sebelumnya
  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // tombol selanjutnya
  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Tombol kiri */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer"
          title="Halaman Sebelumnya"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Info halaman */}
        <div className="px-4 py-1 text-sm font-bold text-gray-700 flex items-center gap-2">
          <span className="text-blue-600">{currentPage}</span>
          <span className="text-gray-200 font-light">/</span>
          <span className="text-gray-400 font-medium">{totalPages}</span>
        </div>

        {/* Tombol kanan */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer"
          title="Halaman Selanjutnya"
        >
          <ChevronRight size={20} />
        </button>

      </div>
    </div>
  );
}

export default PageNavigation;