import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffersStart, fetchOffersSuccess, fetchOffersFailure } from '../../store/slices/offerSlice';
import api from '../../utils/api';

const OfferList = () => {
  const dispatch = useDispatch();
  const { offers, loading, error } = useSelector(state => state.offers);

  useEffect(() => {
    const fetchOffers = async () => {
      dispatch(fetchOffersStart());
      try {
        const res = await api.get('/offers');
        dispatch(fetchOffersSuccess(res.data));
      } catch (err) {
        dispatch(fetchOffersFailure(err.message));
      }
    };

    fetchOffers();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900">Offer List</h2>
      <ul className="mt-4">
        {offers.map(offer => (
          <li key={offer._id} className="border-b py-2">
            <h3 className="text-lg font-semibold">{offer.title}</h3>
            <p>{offer.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferList;
