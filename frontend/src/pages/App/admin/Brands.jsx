import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useBrandStore } from '../../../store/brandStore';
import BrandForm from '../../../components/Admin/Brands/BrandForm';
import Badge from '../../../components/Badge';
import toast from 'react-hot-toast';

const MobileAdminBrands = () => {
  const { brands, initialize, deleteBrand } = useBrandStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search brands..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button
        onClick={() => {
          setEditingBrand(null);
          setShowForm(true);
        }}
        className="w-full flex items-center justify-center gap-2 py-3 gradient-green text-white rounded-xl font-semibold shadow-lg"
      >
        <FiPlus />
        Add Brand
      </button>

      <div className="grid grid-cols-2 gap-3">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            {brand.logo && (
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-20 object-contain mb-3"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <h3 className="font-bold text-gray-800 mb-2">{brand.name}</h3>
            <Badge variant={brand.isActive !== false ? 'success' : 'error'}>
              {brand.isActive !== false ? 'Active' : 'Inactive'}
            </Badge>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setEditingBrand(brand);
                  setShowForm(true);
                }}
                className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Delete this brand?')) {
                    deleteBrand(brand.id);
                  }
                }}
                className="flex-1 p-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <BrandForm
          brand={editingBrand}
          onClose={() => {
            setShowForm(false);
            setEditingBrand(null);
          }}
          onSave={() => initialize()}
        />
      )}
    </div>
  );
};

export default MobileAdminBrands;

