"use client"
import Image from "next/image";
import { addFileName } from "../utils/helper";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
import Link from "next/link";
import Loader from "../components/Loader";
import IconButtonSwitch from "../components/IconButtonSwitch";
import { Character } from "@/app/types/character";
export default function CharacterPage() {

  const [CharacterData, setCharacterData] = useState<Character[]>([]);
  const [activeElement, setActiveElement] = useState<number>(0);
  const [activeWeapon, setActiveWeapon] = useState<number>(0);
  useLayoutEffect(() => {
    axios
      .get<Character[]>("https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true")
      .then((res) => {
        let names = res.data.sort();
        names.forEach((name) => {
          addFileName([name]);
        })
        setCharacterData(names);
        
      })
      .catch((error) => {
        console.error("Error fetching character names:", error);
      });
  }, []);
  return (
    <>
      <h1 className="text-3xl text-primary">Characters List</h1>
      <div className="flex gap-3 justify-around flex-col md:flex-row">
        <div className="flex gap-3 justify-center ">
          <IconButtonSwitch name="Pyro" onClick={() => { setActiveElement(activeElement === 1 ? 0 : 1) }} type="elements" index={1} active={activeElement} />
          <IconButtonSwitch name="Hydro" onClick={() => { setActiveElement(activeElement === 2 ? 0 : 2) }} type="elements" index={2} active={activeElement} />
          <IconButtonSwitch name="Anemo" onClick={() => { setActiveElement(activeElement === 3 ? 0 : 3) }} type="elements" index={3} active={activeElement} />
          <IconButtonSwitch name="Electro" onClick={() => { setActiveElement(activeElement === 4 ? 0 : 4) }} type="elements" index={4} active={activeElement} />
          <IconButtonSwitch name="Dendro" onClick={() => { setActiveElement(activeElement === 5 ? 0 : 5) }} type="elements" index={5} active={activeElement} />
          <IconButtonSwitch name="Cryo" onClick={() => { setActiveElement(activeElement === 6 ? 0 : 6) }} type="elements" index={6} active={activeElement} />
          <IconButtonSwitch name="Geo" onClick={() => { setActiveElement(activeElement === 7 ? 0 : 7) }} type="elements" index={7} active={activeElement} />
        </div>
        <div className="flex gap-3 justify-center">
          <IconButtonSwitch name="Bow" onClick={() => { setActiveWeapon(activeWeapon === 1 ? 0 : 1) }} index={1} active={activeWeapon} />
          <IconButtonSwitch name="Sword" onClick={() => { setActiveWeapon(activeWeapon === 2 ? 0 : 2) }} index={2} active={activeWeapon} />
          <IconButtonSwitch name="Polearm" onClick={() => { setActiveWeapon(activeWeapon === 3 ? 0 : 3) }} index={3} active={activeWeapon} />
          <IconButtonSwitch name="Claymore" onClick={() => { setActiveWeapon(activeWeapon === 4 ? 0 : 4) }} index={4} active={activeWeapon} />
          <IconButtonSwitch name="Catalyst" onClick={() => { setActiveWeapon(activeWeapon === 5 ? 0 : 5) }} index={5} active={activeWeapon} />
        </div>
      </div>
      <section className="grid-auto-fit-300 max-w-screen-2xl w-full p-2">

        {CharacterData.length > 0 ? CharacterData.map((character: Character, index: number) => {
          const elementConditions = [true, "Pyro", "Hydro", "Anemo", "Electro", "Dendro", "Cryo", "Geo"];
          const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];

          const validElement = activeElement === 0 || elementConditions[activeElement] === character.elementText;
          const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === character.weaponText;
          if (character.name == "Aether" || character.name == "Lumine") return //temp
          if (validWeapon && validElement) return <div key={index} className="bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer hover:scale-105 hover:shadow-light">
            <Link href={`/characters/${character.name}`} className={`flex flex-col `} id={character.name}>
              {character.elementText && <div className="absolute top-1 left-1 text-black">
                <Image src={`/elements/${character.elementText}.webp`} width={25} height={25} className="" alt={`${character.elementText} icon`} />
              </div>}
              {character.region && <div className="absolute top-1 right-1 text-black">
                <Image src={`/regions/${character.region}.webp`} width={25} height={25} className="" alt={`${character.region} icon`} />
              </div>}

              <Image
                src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`}
                width={200}
                height={200}
                alt={`${character.name} character icon`}
                className={`rounded-t-xl rounded-br-4xl max-h-44 object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"}`}
              />
              <p className="text-center w-full h-full text-xs text-nowrap p-2 text-black relative font-bold rounded-b-xl after:absolute after:p-2 absolute:top-0 absolute:bg-red ">{character.name}</p>
            </Link>
          </div>
        })
          :
          <div className="w-full col-span-6 md:col-span-full">
            <Loader />
          </div>
        }
      </section>
    </>
  );
}
