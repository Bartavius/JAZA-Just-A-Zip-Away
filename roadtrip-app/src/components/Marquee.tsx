import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles.css";

const items = [
  {
    name: "Benedict Cumberbatch",
    origin: "Manchester, ME",
    destination: "Los Angeles, CA",
    date: "2025-02-12",
    time: "11:00"
  },
  {
    name: "Joseph Aoun",
    origin: "Boston, MA",
    destination: "Miami, FL",
    date: "2025-04-10",
    time: "13:00"
  },
  {
    name: "Sleepy Joe",
    origin: "Washington D.C.",
    destination: "Tik Tok, AK",
    date: "2025-01-19",
    time: "00:00"
  },
  {
    name: "Jendrick Bamar",
    origin: "Grand Canyon, AZ",
    destination: "Oakland, CA",
    date: "2025-03-12",
    time: "08:00"
  },
  {
    name: "Obama Care",
    origin: "Honolulu, HI",
    destination: "Washington D.C.",
    date: "2025-02-10",
    time: "02:00"
  },
  {
    name: "Taylor Swift",
    origin: "New Orleans, LA",
    destination: "New Orleans, LA",
    date: "2025-02-09",
    time: "07:00"
  },
  {
    name: "Elon Musk",
    origin: "Palo Alto, CA",
    destination: "Austin, TX",
    date: "2025-05-15",
    time: "09:00"
  },
  {
    name: "Steve Jobs",
    origin: "Cupertino, CA",
    destination: "New York, NY",
    date: "2025-06-21",
    time: "17:00"
  },
  {
    name: "Mark Zuckerburger",
    origin: "Menlo Park, CA",
    destination: "Los Angeles, CA",
    date: "2025-07-30",
    time: "14:30"
  },
  {
    name: "Oprah Windfree",
    origin: "Chicago, IL",
    destination: "Los Angeles, CA",
    date: "2025-08-05",
    time: "16:00"
  },
  {
    name: "Bill Gator",
    origin: "Seattle, WA",
    destination: "San Francisco, CA",
    date: "2025-09-25",
    time: "10:00"
  },
  {
    name: "Sundar Pitchy",
    origin: "Mountain View, CA",
    destination: "Boston, MA",
    date: "2025-10-15",
    time: "12:30"
  }
];

const MarqueeSlider = () => {
  // Initialize state with value from localStorage (if available), else default to 0
  const [index, setIndex] = useState(() => {
    const storedIndex = localStorage.getItem("marqueeIndex");
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });

  useEffect(() => {
    // Save the current index to localStorage whenever it changes
    localStorage.setItem("marqueeIndex", index.toString());

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 7000); // Change item every 7 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative w-64 h-20 overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: "100%", opacity: 1 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 1 }}
          transition={{ duration: 20, ease: "linear" }}
          className="absolute w-full h-full flex items-center justify-center text-lg shadow-md"
        >
          <img
            className="airplane"
            src="paper-airplane.png"
            alt="plane"
            width={100}
          />
          <span className="text-primary">{items[index].name}</span> is traveling from{" "}
          <span className="text-primary">{items[index].origin}</span> to{" "}
          <span className="text-primary">{items[index].destination}</span> on {items[index].date} at{" "}
          {items[index].time}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MarqueeSlider;
