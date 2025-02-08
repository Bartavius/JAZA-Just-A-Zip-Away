const Card = ({ title, content }: { title: string; content: string }) => {
    return (
      <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-lg w-80 rounded-4">
        <h3 className="mb-2 text-black">{title}</h3>
        <p className="text-black">{content}</p>
      </div>
    );
  };
  
  export default Card;
  