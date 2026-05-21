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
    <div className="mt-6">
      <div className="flex justify-center sm:justify-end">
        
        <div className="flex items-center rounded-md overflow-hidden shadow-sm border bg-white">
          
          {/* Tombol kiri */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-2 py-1.5 border-r hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Info halaman */}
          <div className="px-3 py-1 text-xs sm:text-sm font-medium text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </div>

          {/* Tombol kanan */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1.5 border-l hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}

export default PageNavigation;