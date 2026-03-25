import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return (
    <div className="bg-[#f3f3f3] w-[60%] m-auto">
      <div>
        {/* <img src="" alt="profileIMG" /> */}
        <input type="file" />
      </div>
      <div>
        <h3>First name: {user?.firstName}</h3>
        <h3>Last name: {user?.lastName}</h3>
        <h3>Email: {user?.email}</h3>
      </div>
    </div>
  );
}
