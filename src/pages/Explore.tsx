import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Explore() {
  const { user, loading: authLoading } = useAuth();
  const [cities, setCities] = useState<City[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cities'));
        const cityData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as City[];

        setCities(cityData);
        console.log(cityData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      fetchCities();
    }
  }, [user]);

  if (authLoading) return <div>Checking authentication...</div>;
  if (!user) return <Navigate to='/login' />;
  if (dataLoading) return <div>Loading city data...</div>;

  return (
    <div className='flex flex-col gap-8 p-4 pt-24 items-center min-h-screen bg-linear-to-br from-slate-50 to-slate-300'>
      {cities.map(city => (
        <div
          key={city.id}
          className='w-full max-w-2xl border rounded-xl shadow-lg bg-white overflow-hidden'>
          <div className='h-64 bg-slate-200'>
            <img
              src={city.images.main}
              alt={city.name}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='p-4'>
            <div className='flex justify-between mb-2'>
              <h2 className='text-2xl font-bold text-slate-800'>{city.name}</h2>
              <span className='text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                {city.country}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
