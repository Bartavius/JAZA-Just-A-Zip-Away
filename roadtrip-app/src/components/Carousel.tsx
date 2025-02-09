import { useEffect, useRef, useState } from "react";

interface Profile {
  name: string;
  image: string;
  bio: string;
  contact: string;
}

const AutoScrollCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Patrick",
      image: "patrick.jpg",
      bio: "Patrick's bio...",
      contact: "https://linkedin.com/in/patrick--zhang",
    },
    {
      id: 2,
      name: "Bart",
      image: "bart.jpg",
      bio: "Bart's bio...",
      contact: "https://linkedin.com/in/jlojanarungsiri",
    },
    {
      id: 3,
      name: "Jason",
      image: "jason.jpg",
      bio: "Jason's bio...",
      contact: "https://linkedin.com/in/jasongracias",
    },
    {
      id: 4,
      name: "Millan",
      image: "millan.jpg",
      bio: "Millan's bio...",
      contact: "https://linkedin.com/in/millan-degnemark",
    },
  ]);

  return (
    <div>
      <div>
        {profiles.map((profile, index) => (
          <div className="card d-inline-block" style={{ width: "18rem;" }}>
            <img className="card-img-top" src={profile.image} alt={profile.name} />
            <div className="card-body">
              <h5 className="card-title">{profile.name}</h5>
              <p className="card-text">
                {profile.bio}
              </p>
              <a href="#" className="btn btn-primary">
                {profile.contact}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
