import Container from "../elements/Container";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { TbScreenShare } from "react-icons/tb";
import { useModalProps } from "../context/ModalPropsProvider";
import JoinZoneForm from "../components/Forms/JoinZoneForm";
import CreateSongZoneForm from "../components/Forms/CreateSongZoneForm";
import CreateWatchZoneForm from "../components/Forms/CreateWatchZoneForm";

const Home = () => {
  const { set } = useModalProps();
  const handleSelectType = (component: React.ReactElement) => {
    set({
      isOpen: true,
      children: component,
    });
  };

  return (
    <Container>
      <>
        <div className="p-5 md:p-10 z-0">
          <div className="fixed left-0"></div>
          {/* <h1>Timezone Type</h1> */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-32 m-2">
            <button
              onClick={() => handleSelectType(<JoinZoneForm />)}
              className="flex flex-col justify-center items-center gap-4 cursor-pointer hover:scale-110 transition-all"
            >
              <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] flex justify-center items-center text-[110px] rounded-3xl shadow-md shadow-[#121212] bg-gradient-to-br from-red-400 to-red-800">
                <VscGitPullRequestCreate />
              </div>
              <h1 className="text-xl ">Join Timezone</h1>
            </button>

            <button
              onClick={() => handleSelectType(<CreateSongZoneForm />)}
              className="flex flex-col justify-center items-center gap-4 cursor-pointer hover:scale-110 transition-all"
            >
              <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] flex justify-center items-center text-[110px] rounded-3xl shadow-md shadow-[#121212] bg-gradient-to-br from-blue-400 to-blue-800">
                <PiMusicNotesPlusFill />
              </div>
              <h1 className="text-xl ">Create SongZone</h1>
            </button>

            <button
              onClick={() => handleSelectType(<CreateWatchZoneForm />)}
              className="flex flex-col justify-center items-center gap-4 cursor-pointer hover:scale-110 transition-all"
            >
              <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] flex justify-center items-center text-[110px] rounded-3xl shadow-md shadow-[#121212] bg-gradient-to-br from-green-400 to-green-800">
                <TbScreenShare />
              </div>
              <h1 className="text-xl ">Create WatchZone</h1>
            </button>
          </div>
          <div></div>
        </div>
      </>
    </Container>
  );
};

export default Home;
