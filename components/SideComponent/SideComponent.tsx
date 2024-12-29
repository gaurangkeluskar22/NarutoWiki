import { useEffect, useRef } from "react";


interface SideComponentProp {
  data: any;
  setSelectedId: any;
}

const SideComponent: React.FC<SideComponentProp> = ({
  data,
  setSelectedId,
}) => {
  console.log("data:", data, data?.name);
  const sideComponentRef = useRef<HTMLDivElement | null>(null);

  const handleCancleClick = () => {
    if (sideComponentRef.current) {
      sideComponentRef.current.style.top = "100vh";
      sideComponentRef.current.style.transition = "top 1s ease";
    }
    setTimeout(() => {
      setSelectedId(-1);
    }, 500);
  };

  useEffect(() => {
    if (data?.name && sideComponentRef.current) {
      sideComponentRef.current.style.top = "0";
      sideComponentRef.current.style.transition = "top 1s ease";
      sideComponentRef.current.style.visibility = "visible";
    }
  }, [data]);

  return (
    <div
      ref={sideComponentRef}
      className={`sm:w-4/12 sm:relative bg-white sm:rounded-2xl sm:shadow-2xl sm:border-2 sm:m-5 fixed  left-0 h-full sm:h-auto z-10 w-full sm:block sm:top-0 sm:visible top-[100vh] ${
        data?.name ? "block" : "invisible"
      }`}
    >
      <div className=" flex justify-start items-center flex-col text-center">
        <div className={`flex items-end w-full justify-end sm:hidden`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 m-5 shadow-lg border-2 rounded-lg cursor-pointer"
            onClick={handleCancleClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="overflow-y-scroll h-[calc(100vh-80px)] w-full sm:h-auto sm:overflow-auto flex flex-col justify-start items-center">
          {data?.images ? (
            <img
              src={data?.images[0]}
              className="w-7/12 aspect-square mt-5 mb-3 rounded-2xl object-cover object-top"
            />
          ) : (
            <img src="/naruto.webp" className="w-6/6 opacity-60 mt-10" />
          )}
          {data?.name && <div className="text-2xl font-bold">{data.name}</div>}
          {data?.personal?.clan && (
            <>
              <div>Clan</div>
              <div className="bg-gray-200 rounded-lg px-2 py-1 font-semibold">
                {data?.personal?.clan}
              </div>
            </>
          )}
          <div>
            {data?.jutsu && (
              <div className="flex justify-start flex-col  p-2 my-2">
                <div className="text-center font-bold ">🌀 Justu 🌀</div>
                <div className="sm:h-[140px] sm:overflow-scroll cards-container">
                  {data?.jutsu &&
                    data?.jutsu?.map((item: any, index: number) => {
                      return <div key={index}>️🥷 {item}</div>;
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideComponent;
