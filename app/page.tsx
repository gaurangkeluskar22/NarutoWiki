"use client";
import img1 from "@/public/Hashirama Senju.webp";
import img2 from "@/public/Hiruzen Sarutobi.webp";
import img3 from "@/public/Kakashi Hatake.webp";
import img4 from "@/public/Minato Namikaze.webp";
import img5 from "@/public/Naruto Uzumaki.webp";
import img6 from "@/public/Tobirama Senju.webp";
import img7 from "@/public/Tsunade Senju.webp";
import img8 from "@/public/Danzō Shimura.webp";
import img9 from "@/public/Shikamaru Nara.webp";
import naruto from "@/public/image_processing20210205-2768-kegnw4-removebg.webp";
import narutoText from "@/public/logo.webp";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import Link from "next/link";

function App() {
  const data = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const soundRef: any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    soundRef.current = new Audio("ringtone.mp3");
    soundRef.current.loop = true;

    setTimeout(() => {
      const itemArr: any = document.querySelectorAll(".item");
      if (itemArr) {
        for (let i = 0; i < 9; i++) {
          itemArr[i].style.visibility = "visible";
          itemArr[i].style.transform = `rotateY(${
            i * (360 / 9) * 1
          }deg) translateZ(30vw) rotateX(5deg)`;
        }
        setTimeout(() => {
          const slider = document.getElementById("slider");
          if (slider) {
            slider.style.animation = "spin 15s linear infinite";
          }
        }, 1000);
      }
    }, 1500);

    // Cleanup the sound when the component unmounts
    return () => {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying === false) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (isPlaying) {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="main-container">
      {isPlaying ? (
        <HiMiniSpeakerWave
          className="speaker"
          onClick={handleStop}
          style={{ filter: "opacity(1)" }}
        />
      ) : (
        <HiMiniSpeakerXMark
          className="speaker"
          onClick={handlePlay}
          style={{ filter: "opacity(0.5)" }}
        />
      )}
      <div className="container scale-[2] sm:scale-[1]">
        <div className="slider" id="slider">
          {data?.map((item, index) => {
            return (
              <div className="item" key={index}>
                <Image alt="image" src={item} draggable={false} />
              </div>
            );
          })}
        </div>
        <div className="model">
          <Image
            alt="naruto"
            src={naruto}
            className="naruto-img "
            draggable={false}
          />
          <Link href="/details">
            <button className="bg-gradient-to-l from-orange-500 to-orange-600 text-white font-bold  text-[16px] sm:text-2xl sm:p-4 relative -translate-y-[0px] sm:-translate-y-[65px] z-10  px-[0.5rem] py-[0.1rem]  rounded-2xl shadow-lg border-2 border-black">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
