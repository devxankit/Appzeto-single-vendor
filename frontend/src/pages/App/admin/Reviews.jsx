import { useState, useEffect } from 'react';
import { FiSearch, FiCheck, FiX } from 'react-icons/fi';
import { mockOrders } from '../../../data/adminMockData';
import Badge from '../../../components/Badge';
import toast from 'react-hot-toast';

const MobileAdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const mockReviews = [
      {
        id: 1,
        productId: 1,
        productName: 'Classic White T-Shirt',
        customerName: 'John Doe',
        rating: 5,
        comment: 'Great product! Very satisfied.',
        status: 'approved',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        productId: 2,
        productName: 'Slim Fit Blue Jeans',
        customerName: 'Jane Smith',
        rating: 4,
        comment: 'Good quality, fits well.',
        status: 'pending',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    const savedReviews = localStorage.getItem('admin-reviews');
    setReviews(savedReviews ? JSON.parse(savedReviews) : mockReviews);
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      !searchQuery ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || review.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    const updatedReviews = reviews.map((r) =>
      r.id === id ? { ...r, status: 'approved' } : r
    );
    setReviews(updatedReviews);
    localStorage.setItem('admin-reviews', JSON.stringify(updatedReviews));
    toast.success('Review approved');
  };

  const handleReject = (id) => {
    const updatedReviews = reviews.map((r) =>
      r.id === id ? { ...r, status: 'rejected' } : r
    );
    setReviews(updatedReviews);
    localStorage.setItem('admin-reviews', JSON.stringify(updatedReviews));
    toast.success('Review rejected');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search reviews..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'approved', 'pending', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
              selectedStatus === status
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{review.productName}</h3>
                <p className="text-sm text-gray-600 mb-2">{review.customerName}</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <Badge
                variant={
                  review.status === 'approved'
                    ? 'success'
                    : review.status === 'pending'
                    ? 'warning'
                    : 'error'
                }
              >
                {review.status}
              </Badge>
            </div>

            <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

            {review.status === 'pending' && (
              <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleApprove(review.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg font-semibold"
                >
                  <FiCheck />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(review.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-lg font-semibold"
                >
                  <FiX />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileAdminReviews;

