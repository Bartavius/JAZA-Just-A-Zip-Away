import GoogleMap from "../components/GoogleMaps";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRightToCity } from "react-icons/fa6";
import api from "../api";

interface LocationInput {
  name: string;
  lat: number;
  lng: number;
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
    if (!address) return { name: address, lat: 0, lng: 0 };
    await loadGoogleMaps();

    const geocoder = new google.maps.Geocoder();

    return new Promise<{ name: string; lat: number; lng: number }>(
      (resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            resolve({
              name: address,
              lat: location.lat(),
              lng: location.lng(),
            });
          } else {
            reject("Geocode failed: " + status);
          }
        });
      }
    );
  };

  const setCoordinates = async () => {
    // make some call to google maps api to get the coordinates

    // only AFTER submitting the form, we will get the coordinates
    setLoading(true);
    const newOrigin = await getCoordinates(origin.name);
    const newDestination = await getCoordinates(destination.name);
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
    name: "",
    lat: 0,
    lng: 0,
  });
  const [destination, setDestination] = useState<LocationInput>({
    name: "",
    lat: 0,
    lng: 0,
  });

  const sendReturnObject = async () => {
    try {
      const response = await api.post("/api/post/create", returnObject);
    } catch (error) {
      console.error(error);
    }
  };

  const [returnObject, setReturnObject] = useState({
    title: title,
    description: description,
    startLocation: origin,
    endLocation: destination,
    postTime: currentDate,
    startTime: startDate,
    endTime: endDate,
  });

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
                setOrigin({ name: e.target.value, lat: 0, lng: 0 });
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
                setDestination({ name: e.target.value, lat: 0, lng: 0 });
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
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-primary mt-4 ms-2 plan-button d-flex align-items-center"
            onClick={() => {
              setCoordinates();
              const currentDate = new Date();
              const formatted = formatDate(currentDate);
              setCurrentDate(formatted);
              sendReturnObject();
            }}
          >
            Plan Trip
            <FaArrowRightToCity className="ms-2 fs-4" />
          </button>
        </div>
        <hr />
        <div className="container mb-5">
          {origin.lat !== 0 &&
            destination.lat !== 0 &&
            origin.lng !== 0 &&
            destination.lng !== 0 && (
              <p>
                Calculating route from{" "}
                <span className="text-primary">{origin.name}</span> to{" "}
                <span className="text-primary">{destination.name}</span>.
              </p>
            )}

          {origin.lat !== 0 &&
          destination.lat !== 0 &&
          origin.lng !== 0 &&
          destination.lng !== 0 ? (
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
        <div className="result-box-container mt-4 text-black">
          <h3>
            Other people looking to take you on a road trip! don't forget
            loading...
          </h3>
        </div>
      </form>
    </div>
  );
}
