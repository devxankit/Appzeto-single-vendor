import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useCategoryStore } from '../../../store/categoryStore';
import MobileFormModal from '../../../components/Admin/Mobile/MobileFormModal';
import CategoryForm from '../../../components/Admin/Categories/CategoryForm';
import Badge from '../../../components/Badge';
import toast from 'react-hot-toast';

const MobileAdminCategories = () => {
  const { categories, initialize, deleteCategory } = useCategoryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getChildren = (parentId) => {
    return filteredCategories.filter((cat) => cat.parentId === parentId);
  };

  const renderCategory = (category, level = 0) => {
    const children = getChildren(category.id);
    const hasChildren = children.length > 0;
    const isExpanded = expanded[category.id];

    return (
      <div key={category.id} className="mb-2">
        <div
          className={`flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 ${
            level > 0 ? 'ml-4' : ''
          }`}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpand(category.id)}
              className="p-1"
            >
              {isExpanded ? (
                <FiChevronDown className="text-gray-600" />
              ) : (
                <FiChevronRight className="text-gray-600" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-6" />}

          {category.image && (
            <img
              src={category.image}
              alt={category.name}
              className="w-10 h-10 object-cover rounded-lg"
            />
          )}

          <div className="flex-1">
            <p className="font-semibold text-gray-800">{category.name}</p>
            {category.description && (
              <p className="text-xs text-gray-500">{category.description}</p>
            )}
          </div>

          <Badge variant={category.isActive ? 'success' : 'error'}>
            {category.isActive ? 'Active' : 'Inactive'}
          </Badge>

          <button
            onClick={() => {
              setEditingCategory(category);
              setShowForm(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Delete this category?')) {
                deleteCategory(category.id);
              }
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <FiTrash2 />
          </button>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4 border-l-2 border-gray-200 pl-2">
            {children.map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootCategories = filteredCategories.filter((cat) => !cat.parentId);

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          setEditingCategory(null);
          setShowForm(true);
        }}
        className="w-full flex items-center justify-center gap-2 py-3 gradient-green text-white rounded-xl font-semibold shadow-lg"
      >
        <FiPlus />
        Add Category
      </button>

      {/* Categories List */}
      <div className="space-y-2">
        {rootCategories.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">No categories found</p>
          </div>
        ) : (
          rootCategories.map((category) => renderCategory(category))
        )}
      </div>

      {/* Category Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
          onSave={() => {
            initialize();
          }}
        />
      )}
    </div>
  );
};

export default MobileAdminCategories;

