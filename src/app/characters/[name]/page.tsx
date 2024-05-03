"use client"
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Footer from "@/app/components/Footer";
import { Character } from "@/app/utils/types";
import { addFileName } from "@/app/utils/helper";
import StatsTable from "@/app/components/StatsTable";
import InfoCharacterBanner from "@/app/components/InfoCharacterBanner";
import Lenis from "@studio-freight/lenis";
import ConstellationsTable from "@/app/components/ConstellationTable";
import AttackTable from "@/app/components/AttackTable";
import VoiceList from "@/app/components/VoiceList";
import Gallery from "@/app/components/Gallery";
import Loader from "@/app/components/Loader";

export default function CharacterPage({ params }: { params: { name: string } }) {

    const [characterData, setCharacterData] = useState<Character[]>();
    const [error, setError] = useState('');
    const [lang, setLang] = useState<string>("english");
    const [assets, setAssets]= useState()    
    useLayoutEffect(() => {
        axios.get(`/api/assets/${params.name}`).then((res:any)=>{
            let data = res.data
            console.log(data)
        })
        axios.get<Character[]>(`https://genshin-db-api.vercel.app/api/v5/stats?folder=characters&query=${params.name}&dumpResult=true&resultLanguage=${lang}`)
            .then((res) => {
                let data = res.data;
                // @ts-ignore
                addFileName([data.result]);
                const mergeWithPreference = (firstData: any, secondData: any) => {
                    for (const key in secondData) {
                        if (firstData.hasOwnProperty(key) && typeof firstData[key] === 'object' && secondData[key] !== null) {
                            firstData[key] = mergeWithPreference(firstData[key], secondData[key]);
                        } else {
                            firstData[key] = secondData[key];
                        }
                    }
                    return firstData;
                };
                Promise.all([
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/constellations?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/talents?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/namecards?query=${params.name}&matchCategories=true&queryLanguages=english,jap`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/voiceovers?query=${params.name}&matchCategories=true&queryLanguages=english,jap`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/outfits?query=${params.name}&matchCategories=true&queryLanguages=english,jap`),
                ])
                    .then((responses) => {
                        const [constellationsResponse, talentsResponse, nameCardResponse, voiceDataResponse, outfitResponse] = responses;
                        const constellationsData = constellationsResponse.data;
                        const talentsData = talentsResponse.data;
                        const nameCardData = nameCardResponse.data;
                        const voiceData = voiceDataResponse.data;
                        const outfitData = outfitResponse.data;

                        const mergedData = {
                            // @ts-ignore
                            stats: data.stats,
                            constellations: constellationsData,
                            talents: talentsData,
                            nameCard: nameCardData,
                            voices: voiceData,
                            outfits: outfitData,
                            // @ts-ignore
                            ...data.result,
                        };

                        const finalData = mergeWithPreference(data, mergedData);
                        setCharacterData(finalData);
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    useEffect(() => {
        const lenis = new Lenis()
        const raf = (time: any) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

    }, [])
    return (
        <>
            <NavBar />

            {characterData ?
                <main className="flex flex-col gap-4" >
                    <InfoCharacterBanner characterData={characterData} params={params} />
                    <div className="flex gap-2 p-4 md:p-8 z-20">
                        <section className="flex flex-col gap-8 mt-20">
                            <StatsTable characterData={characterData} />
                            
                            {/* @ts-ignore */}
                            <AttackTable attackData={characterData.talents} params={params} />
                            {/* @ts-ignore */}
                            <ConstellationsTable constellationData={characterData.constellations} params={params} />

                        </section>
                    </div>
                    <section className="flex gap-3 flex-col p-4 md:p-8">
                        <Gallery characterData={characterData} />
                    </section>
                    <section className="flex gap-3 flex-col p-4 md:p-8">
                        <h2 className="font-bold text-3xl">Quotes</h2>
                        <div className="grid gap-4">
                            {/* @ts-ignore */}
                            <VoiceList voiceData={characterData.voices} />
                        </div>
                    </section>
                    <Footer />
                </main>

                :
                <div className="pt-16">
                    <Loader />
                </div>}
        </>
    );
}
