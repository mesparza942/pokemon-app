import { useEffect } from "react";
import { usePokemonService } from "@/presentation/hooks/usePokemonService";
import { useFetch } from "@/presentation/hooks/useFetch";
import { PokemonAbility } from "@/domain/models/Pokemon";
import { capitalize } from "@/utils/capitalize";

interface PokemonDetailsTabContentProps {
  abilityName: string;
  detailsUrl: string;
}
const PokemonTabContentAbility = ({
  abilityName,
  detailsUrl,
}: PokemonDetailsTabContentProps) => {
  const { pokemonService } = usePokemonService();

  const {
    data: pokemonAbilityInfo,
    fetchData: getDetailsInfo,
    loading,
    error,
  } = useFetch<PokemonAbility, string>({
    api: pokemonService!.getPokemonAbility.bind(pokemonService),
  });

  useEffect(() => {
    getDetailsInfo(detailsUrl);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <div className="flex flex-col gap-1 mt-2">
      <p>
        <b>Ability Name:</b> {capitalize(abilityName)}
      </p>
      <p>{pokemonAbilityInfo?.effect}</p>
    </div>
  );
};

export default PokemonTabContentAbility;
