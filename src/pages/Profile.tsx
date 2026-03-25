import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase/config';

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

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/doedrxw0f/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const { url } = await res.json();
    try {
      if (!user) return;
      console.log(user.uid);
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        profileImageURL: url,
      });
    } catch {
      alert('sum-ting went-wong');
    }
  };

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="bg-[#f3f3f3] w-[60%] m-auto mt-50 absolute">
      <div>
        <img src={user.profileImageURL} alt="profileIMG" />
        <input type="file" onChange={handleInputChange} />
      </div>
      <div>
        <h3>First name: {user?.firstName}</h3>
        <h3>Last name: {user?.lastName}</h3>
        <h3>Email: {user?.email}</h3>
      </div>
    </div>
  );
}
