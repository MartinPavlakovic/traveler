import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase/config';
import axios from 'axios';

export default function Profile() {
  const { user, loading } = useAuth();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'traveler');
    data.append('cloud_name', 'doedrxw0f');

    const res = axios.post(
      'https://api-eu.cloudinary.com/v1_1/doedrxw0f/image/upload',
      data,
    );
    const url = (await res).data.url;
    try {
      if (!user) return;
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        profileImageURL: url,
      });
    } catch {
      alert('sum-ting went-wong');
    }
  };

  if (loading) return null;
  if (!user) return <Navigate to='/login' />;
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-300 p-8'>
      <div className='w-1/2 mx-auto'>
        <div className='bg-white rounded-2xl shadow-lg p-8 flex gap-8 mt-20'>
          <div className='flex flex-col items-center space-y-4'>
            <img
              src={user.profileImageURL}
              alt='profileIMG'
              className='w-48 h-48 object-cover border-4 border-slate-200 shadow-md'
            />
            <label className='cursor-pointer'>
              <input
                type='file'
                onChange={handleInputChange}
                className='hidden'
                accept='image/*'
              />
              <span className='inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors duration-200'>
                Change Photo
              </span>
            </label>
          </div>

          <div className='flex-1 space-y-4 pt-4'>
            <div>
              <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                First Name
              </p>
              <p className='text-lg text-slate-900 font-medium'>
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                Last Name
              </p>
              <p className='text-lg text-slate-900 font-medium'>
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                Email
              </p>
              <p className='text-lg text-slate-900 font-medium break-all'>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-12 min-h-96'></div>
      </div>
    </div>
  );
}
