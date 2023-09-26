import { TbSeeding, TbCake, TbCoffee, TbAlarm } from "react-icons/tb";
import { BiParty } from "react-icons/bi";

const categories = [
  { icon: <TbSeeding fontSize="2rem" />, name: "Vegan", value: "Vegana" },
  { icon: <TbCake fontSize="2rem" />, name: "Sweet", value: "Postres" },
  { icon: <TbCoffee fontSize="2rem" />, name: "Drinks", value: "Bebidas" },
  { icon: <TbAlarm fontSize="2rem" />, name: "Fast", value: "Rápidas" },
  { icon: <BiParty fontSize="2rem" />, name: "Party", value: "Fiestas" },
];

export { categories };
