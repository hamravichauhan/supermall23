import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopById } from '../../store/slices/shopSlice';
import api from '../../utils/api';

const ShopDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { shop, loading, error } = useSelector(state => state.shops);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await api.get(`/shops/${id}`);
        dispatch(fetchShopById(res.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchShop();
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900">{shop.name}</h2>
      <p className="mt-4">{shop.description}</p>
      <p className="mt-2">Contact: {shop.contactInfo.phone}</p>
    </div>
  );
};

export default ShopDetail;
