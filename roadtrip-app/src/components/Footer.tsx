const Footer = () => {
  return (
    <footer className="lock-bottom">
      <img src="/layered-peaks-haikei.svg" className="svg-image" draggable="false"/>
      <div className="text-center footer">
        &copy; 2025 Roadtrip App. Built by: {" "}
        <a href="https://www.linkedin.com/in/jlojanarungsiri/" target="_blank">Jirath "Bart" Lojanarungsiri</a>, {" "}
        <a href="https://www.linkedin.com/in/jasongracias/" target="_blank">Jason Gracias</a>, {" "}
        <a href="https://www.linkedin.com/in/patrick--zhang/" target="_blank">Patrick Zhang</a>, and {" "}
        <a href="https://www.linkedin.com/in/millan-degnemark/" target="_blank">Millan Degnemark</a>
      </div>
    </footer>
  );
};

export default Footer;
