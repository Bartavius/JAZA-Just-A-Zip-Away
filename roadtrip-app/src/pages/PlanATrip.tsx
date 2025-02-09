import GoogleMap from "../components/GoogleMaps";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRightToCity } from "react-icons/fa6";
import api from "../api";

interface LocationInput {
  address: string;
  latitude: number;
  longitude: number;
}

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

export default function PlanATrip() {
  const [loading, setLoading] = useState(false);

  const loadGoogleMaps = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.google) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject("Failed to load Google Maps API");
        document.head.appendChild(script);
      }
    });
  };

  const getCoordinates = async (address: string) => {
    if (!address) return { address: address, latitude: 0, longitude: 0 };
    await loadGoogleMaps();

    const geocoder = new google.maps.Geocoder();

    return new Promise<{
      address: string;
      latitude: number;
      longitude: number;
    }>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            address: address,
            latitude: location.lat(),
            longitude: location.lng(),
          });
        } else {
          reject("Geocode failed: " + status);
        }
      });
    });
  };

  const setCoordinates = async () => {
    // make some call to google maps api to get the coordinates

    // only AFTER submitting the form, we will get the coordinates
    setLoading(true);
    const newOrigin = await getCoordinates(origin.address);
    const newDestination = await getCoordinates(destination.address);
    setOrigin(newOrigin);
    setDestination(newDestination);
    setLoading(false);
  };

  // Function to format date as "MM/DD/YYYY HH:MM:SS"
  const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const selectedDate = new Date(event.target.value);
    const formatted = formatDate(selectedDate);
    if (type === "start") {
      setStartDate(formatted);
    } else if (type === "end") {
      setEndDate(formatted);
    }
  };
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [origin, setOrigin] = useState<LocationInput>({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState<LocationInput>({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await api.get("/api/post/get/");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const sendReturnObject = async () => {
    const returnObj = {
      title: title,
      content: description,
      start_location: origin,
      end_location: destination,
      start_time: startDate,
      end_time: endDate,
    };
    console.log(JSON.stringify(returnObj));
    const res = await api
      .post("/api/post/create/", returnObj)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1 className="section-header">Plan A Trip!</h1>
      <form>
        <div className="row">
          <div className="mb-2 d-inline w-25">
            <FaMapMarkerAlt className="text-secondary mb-2" />
            <label htmlFor="origin" className="ms-2 mb-2">
              Origin
            </label>
            <input
              id="origin"
              type="text"
              className="form-control rounded-3"
              placeholder="'Boston, MA'"
              onChange={(e) => {
                setOrigin({
                  address: e.target.value,
                  latitude: 0,
                  longitude: 0,
                });
              }}
              required
            />
          </div>
          <div className="mb-2 d-inline w-25">
            <FaMapMarkerAlt className="text-secondary mb-2 " />
            <label htmlFor="destination" className="ms-2 mb-2">
              Destination
            </label>
            <input
              id="destination"
              type="text"
              className="form-control rounded-3"
              placeholder="'Las Vegas, NV'"
              onChange={(e) => {
                setDestination({
                  address: e.target.value,
                  latitude: 0,
                  longitude: 0,
                });
              }}
              required
            />
          </div>
          <div className="mb-3 d-inline-block w-25">
            <label htmlFor="start-time" className="form-label">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="start-time"
              className="form-control"
              onChange={(e) => handleDateChange(e, "start")}
            />
          </div>
          <div className="mb-3 d-inline-block w-25">
            <label htmlFor="end-time" className="form-label">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="end-time"
              className="form-control"
              onChange={(e) => handleDateChange(e, "end")}
            />
          </div>

          <div className="text-inputs">
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="form-control w-50 mb-2"
                placeholder="'A drive through Vegas...'"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <label htmlFor="description" className="mb-2">
              {" "}
              Description{" "}
            </label>
            <textarea
              name="trip-description"
              id="description"
              className="form-control"
              rows={5}
              placeholder="'They say go big or go home ... Well, we are having one scenic route before going all in on my life savings...'"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-primary mt-4 ms-2 plan-button d-flex align-items-center"
            onClick={() => {
              setCoordinates();
              sendReturnObject();
            }}
          >
            Plan Trip
            <FaArrowRightToCity className="ms-2 fs-4" />
          </button>
        </div>
        <hr />
        <div className="container mb-5">
          {origin.latitude !== 0 &&
            destination.latitude !== 0 &&
            origin.longitude !== 0 &&
            destination.longitude !== 0 && (
              <p>
                Calculating route from{" "}
                <span className="text-primary">{origin.address}</span> to{" "}
                <span className="text-primary">{destination.address}</span>.
              </p>
            )}

          {origin.latitude !== 0 &&
          destination.latitude !== 0 &&
          origin.longitude !== 0 &&
          destination.longitude !== 0 ? (
            <div>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <div className="map-container">
                  <GoogleMap location1={origin} location2={destination} />
                </div>
              )}
            </div>
          ) : (
            <h1 className="text-white">** Please enter a location **</h1>
          )}
        </div>
      </form>
      <hr />
      <h2>Check out other people who are planning out there trips! </h2>
      {posts.length > 0 &&
        posts.map((post: any) => (
          <div className="result-box-container mt-4 rounded-4 text-black">
            <div className="result-box" key={post.id}>
              <h3>
                <b className="bg-white d-inline-block p-2 ps-3 pe-3 rounded-4">
                  {post.title}
                </b>{" "}
                <span className="ms-3">{post.userInfo.username}</span>
              </h3>
              <h6 className="mt-3 mb-3 ms-3">{post.message}</h6>

              <div className="mt-3 container bg-white rounded-3">
                <h5 className=" ms-3 p-1">
                  <b>FROM:</b> {post.start_location_address}
                </h5>
                <h5 className=" ms-3 p-1">
                  <b>TO:</b> {post.end_location_address}
                </h5>
                <h5 className="ms-3 p-1">
                    <b>TIME: </b>
                  {new Date(post.start_time).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <br />
                  <h5 className="ms-5 p-2">
                  {new Date(post.end_time).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</h5>
                </h5>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
