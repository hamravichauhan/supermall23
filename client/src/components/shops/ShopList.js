import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopsStart, fetchShopsSuccess, fetchShopsFailure } from '../../store/slices/shopSlice';
import api from '../../utils/api';

const ShopList = () => {
  const dispatch = useDispatch();
  const { shops, loading, error } = useSelector(state => state.shops);

  useEffect(() => {
    const fetchShops = async () => {
      dispatch(fetchShopsStart());
      try {
        const res = await api.get('/shops');
        dispatch(fetchShopsSuccess(res.data));
      } catch (err) {
        dispatch(fetchShopsFailure(err.message));
      }
    };

    fetchShops();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900">Shop List</h2>
      <ul className="mt-4">
        {shops.map(shop => (
          <li key={shop._id} className="border-b py-2">
            <h3 className="text-lg font-semibold">{shop.name}</h3>
            <p>{shop.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopList;
