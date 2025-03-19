const PokemonListLoading = () => {
  const loadingElements = new Array(20).fill("");

  return (
    <>
      {loadingElements.map((_item, idx) => (
        <div
          key={idx}
          className="max-w-[200px] rounded-xl flex flex-col items-center justify-center bg-amber-200 hover:bg-amber-300 shadow-amber-500 shadow-2xl p-3 hover:cursor-pointer gap-2"
        >
          <div className="w-[120px] h-[20px] bg-amber-300" />
          <div className="w-[100px] h-[100px] bg-amber-300" />
        </div>
      ))}
    </>
  );
};

export default PokemonListLoading;
