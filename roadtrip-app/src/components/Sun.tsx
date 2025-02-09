
const SunSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="yellow"
    width="100"
    height="100"
    style={{
      position: 'absolute',
      bottom: '0',
      right: '10%',
      zIndex: '-1', 
    }}
  >
    <circle cx="50" cy="50" r="20" fill="#f7cb05" />
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180; // angle for each ray
      const x1 = 50 + Math.cos(angle) * 20;
      const y1 = 50 + Math.sin(angle) * 20;
      const x2 = 50 + Math.cos(angle) * 30;
      const y2 = 50 + Math.sin(angle) * 30;
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#f7cb05"
          strokeWidth="3"
        />
      );
    })}
  </svg>
);

export default SunSVG;
