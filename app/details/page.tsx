"use client";

import AnimeCard from "@/components/AnimeCard/AnimeCard";
import { useEffect, useState, useRef } from "react";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import SideComponent from "@/components/SideComponent/SideComponent";

const Home = () => {
  const [animeData, setAnimeData] = useState<any>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(2);
  const [selectedId, setSelectedId] = useState(-1);
  const [searchValue, setSearchValue] = useState("");
  const [defaultData, setDefaultData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await fetch(
          `https://narutodb.xyz/api/character?page=1&limit=2000`
        );
        const data = await res.json();
        setAllData(data?.characters);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://narutodb.xyz/api/character?page=${page}&limit=50`
        );
        const data = await res.json();
        setDefaultData((prev: any) => {
          return prev?.length === 0
            ? data?.characters
            : [...prev, ...data?.characters];
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
      fetchData();
  }, [page]);


  useEffect(() => {
    if (searchValue?.length) {
      setSelectedId(-1)
      const data = allData.filter((item : any)=> item?.name.toLowerCase().includes(searchValue))
      setSearchData(data)
    }
  }, [searchValue]);

  useEffect(()=>{
    if(searchValue?.length){
      setAnimeData(searchData)
    }
    else{
      setSelectedId(-1)
      setAnimeData(defaultData)
    }
  },[defaultData, searchData, searchValue])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && animeData?.length) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef.current, animeData]);

  const handleOnClick = (id: number) => {
    setSelectedId(id);
  };

  useEffect(() => {
    console.log("anime data", animeData);
  }, [animeData]);

  return (
    <div className="mt-5 mb-0 sm:mx-auto md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1436px] sm:w-full mx-5">
      <SearchComponent setSearchValue={setSearchValue} />
      <div className="w-12/12 flex gap-5 h-full">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-x-5 gap-y-5 ml-0 mt-5 mb-5 py-5 h-[calc(100vh-108px)] overflow-scroll lg:w-8/12 cards-container w-full">
          {animeData?.map((item: any, index: number) =>
            item?.images[0] ? (
              <div onClick={() => handleOnClick(index)} key={index}>
                <AnimeCard item={item} index={index} />
              </div>
            ) : null
          )}
          <div ref={observerRef}></div>
        </div>

        <SideComponent data={selectedId !== -1 ? animeData[selectedId] : []} setSelectedId={setSelectedId} />
      </div>
    </div>
  );
};

export default Home;
