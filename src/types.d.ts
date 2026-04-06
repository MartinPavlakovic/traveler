interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImageURL: string;
}

interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  images: {
    main: string;
    photo1: string;
    photo2: string;
    photo3: string;
  };
  lat: number;
  lng: number;
}
