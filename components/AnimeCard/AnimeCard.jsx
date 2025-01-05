const AnimeCard = ({ item, index }) => {
  return (
    <div
      key={index}
      className="flex flex-col justify-center items-center border-2 hover:border-black rounded-2xl shadow-lg bg-white cursor-pointer"
    >
      <img
        src={item?.images[0]}
        className="aspect-square object-cover pb-4 w-full rounded-2xl object-top"
        alt="character-image"
        draggable={false}
      />
      <div className="font-bold text-lg mb-4 text-center text-black">{item?.name}</div>
    </div>
  );
};

export default AnimeCard;
