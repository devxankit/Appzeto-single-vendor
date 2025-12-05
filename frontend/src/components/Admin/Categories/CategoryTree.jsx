import { useState } from 'react';
import { FiChevronDown, FiChevronRight, FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import { useCategoryStore } from '../../../store/categoryStore';
import Badge from '../../Badge';
import toast from 'react-hot-toast';

const CategoryTree = ({ categories, onEdit, onDelete, level = 0 }) => {
  const { toggleCategoryStatus } = useCategoryStore();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getChildren = (parentId) => {
    return categories.filter((cat) => cat.parentId === parentId);
  };

  const renderCategory = (category) => {
    const children = getChildren(category.id);
    const hasChildren = children.length > 0;
    const isExpanded = expanded[category.id];

    return (
      <div key={category.id} className="select-none">
        <div
          className={`flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors ${
            level > 0 ? 'ml-6' : ''
          }`}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpand(category.id)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <FiChevronDown className="text-gray-600" />
              ) : (
                <FiChevronRight className="text-gray-600" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-6" />}

          <div className="flex-1 flex items-center gap-3">
            {category.image && (
              <img
                src={category.image}
                alt={category.name}
                className="w-10 h-10 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleCategoryStatus(category.id)}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                title={category.isActive ? 'Deactivate' : 'Activate'}
              >
                {category.isActive ? <FiEye /> : <FiEyeOff />}
              </button>
              <button
                onClick={() => onEdit(category)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4 border-l-2 border-gray-200">
            {children.map((child) => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };

  const rootCategories = categories
    .filter((cat) => !cat.parentId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-1">
      {rootCategories.map((category) => renderCategory(category))}
    </div>
  );
};

export default CategoryTree;

