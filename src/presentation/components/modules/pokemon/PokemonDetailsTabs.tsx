import { useMemo, useState } from "react";
import Tabs from "../../common/Tabs";
import PokemonTabContentAbility from "./PokemonTabContentAbility";
import { Pokemon } from "@/domain/models/Pokemon";
import { capitalize } from "@/utils/capitalize";

interface PokemonDetailsTabsProps {
  pokemon: Pokemon;
}
const PokemonDetailsTabs = ({ pokemon }: PokemonDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const pokemonTabs = useMemo(() => {
    return [
      {
        id: 1,
        title: "Abilities",
        content: (
          <div className="h-[200px] p-4 overflow-y-auto text-white">
            {pokemon.abilities?.map((ability, idx) => (
              <PokemonTabContentAbility
                key={idx}
                abilityName={ability.name!}
                detailsUrl={ability.url!}
              />
            ))}
          </div>
        ),
      },
      {
        id: 2,
        title: "Stats",
        content: (
          <div className="h-[200px] p-4 overflow-y-auto text-white">
            <ul className="list-disc">
              {pokemon.stats?.map((stat) => (
                <li key={stat.name} className="py-1">
                  <span className="font-bold">{capitalize(stat.name!)}:</span>{" "}
                  {stat.value}
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        id: 3,
        title: "Moves",
        content: (
          <div className="h-[200px] p-4 overflow-y-auto text-white">
            <ul className="list-disc grid grid-cols-2">
              {pokemon.moves?.map((move) => (
                <li key={move.name} className="py-1">
                  {capitalize(move.name!)}
                </li>
              ))}
            </ul>
          </div>
        ),
      },
    ];
  }, []);

  const handleClickTab = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <Tabs
      activeTab={activeTab}
      tabs={pokemonTabs}
      onClickTab={handleClickTab}
    />
  );
};

export default PokemonDetailsTabs;
