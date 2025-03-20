import Image from "next/image";
import { Pokemon } from "@/domain/models/Pokemon";
import { Modal } from "../../common";
import { capitalize } from "@/utils/capitalize";
import PokemonDetailsTabs from "./PokemonDetailsTabs";

interface PokemonDetailModalProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
}
const PokemonDetailModal = ({
  pokemon,
  isOpen,
  onClose,
}: PokemonDetailModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[300px] sm:w-[350px] flex flex-col items-center justify-center gap-2">
        <p className="font-bold text-white text-3xl">
          {capitalize(pokemon.name)}
        </p>
        <Image
          src={pokemon.imageUrl!}
          width={150}
          height={150}
          alt={pokemon.name}
        />
        <span className="bg-white border border-black rounded-2xl px-4 text-black">
          {capitalize(pokemon.type)}
        </span>
        <PokemonDetailsTabs pokemon={pokemon} />
      </div>
    </Modal>
  );
};

export default PokemonDetailModal;
