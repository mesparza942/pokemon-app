import LogoutButton from "../components/modules/auth/LogoutButton";
import PokemonList from "../components/modules/pokemon/PokemonList";

const PokemonListPage = () => {
  return (
    <div>
      <LogoutButton />
      <div className="flex flex-col py-12 px-32 gap-8">
        <h1 className="text-center text-2xl font-bold text-amber-400">
          Pokemon List
        </h1>
        <PokemonList />
      </div>
    </div>
  );
};

export default PokemonListPage;
