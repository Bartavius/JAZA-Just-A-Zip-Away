import { useEffect, useRef, useState } from "react";

interface Profile {
  name: string;
  image: string;
  bio: string;
  contact: string;
}

const AutoScrollCarousel = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Patrick Zhang",
      image: "patrick.jpg",
      title: "Backend Developer",
      bio: "Patrick is a such big fan of rice, in fact, his phone's wallpaper is rice.",
      contact: "https://linkedin.com/in/patrick--zhang",
    },
    {
      id: 2,
      name: `Jirath "Bart" Lojanarungsiri`,
      title: "Full-stack Developer",
      image: "bart.jpg",
      bio: "Bart played Geoguessr so much he can probably guess where you are by looking at the dirt.",
      contact: "https://linkedin.com/in/jlojanarungsiri",
    },
    {
      id: 3,
      name: "Jason Gracias",
      title: "Backend Developer",
      image: "jason.jpg",
      bio: "Jason's laptop can open up from one, to three monitors. He's truly a final Cybersecurity Boss.",
      contact: "https://linkedin.com/in/jasongracias",
    },
    {
      id: 4,
      name: "Millan Degnemark",
      title: "Product Manager",
      image: "millan.jpg",
      bio: "Millan's bio...idk he couldn't come up with a fun fact...",
      contact: "https://linkedin.com/in/millan-degnemark",
    },
  ]);

  return (
    <div className="container">
      <div className="row mt-3 mb-5">
        {profiles.map((profile, index) => (
          <div className="card col me-4">
            <img className="card-img-top" src={profile.image} alt={profile.name} />
            <div className="card-body">
              <h3 className="card-title"><b>{profile.name}</b></h3>
              <h5><i className="text-secondary">{profile.title}</i></h5>
              <h6 className="card-text mb-2">
                {profile.bio}
              </h6>
              <a href={profile.contact} target="_blank" className="btn btn-primary float-end">
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
