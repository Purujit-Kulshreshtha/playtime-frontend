import { useState } from "react";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { useZone } from "../../context/ZoneProvider";
import {
  defaultModalProps,
  useModalProps,
} from "../../context/ModalPropsProvider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../contants";

const CreateSongZoneForm = () => {
  const [zoneName, setZoneName] = useState("");
  const { set: setModal } = useModalProps();
  const navigate = useNavigate();
  const { set } = useZone();

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    set({
      name: zoneName,
      password: "",
      isCreate: true,
    });
    setModal(defaultModalProps);
    navigate(ROUTES.getTimezoneRoute(zoneName));
  };

  return (
    <div className="flex flex-col justify-between items-center py-5">
      <h1 className="text-6xl font-extrabold flex flex-col  justify-center items-center gap-4 md:gap-8 text-center">
        <PiMusicNotesPlusFill />+ Song Zone
      </h1>
      <form className="flex flex-col gap-6 mt-16 mb-8" onSubmit={handleCreate}>
        <div className="flex flex-col gap-2">
          <input
            value={zoneName}
            onChange={(e) => {
              setZoneName(e.target.value);
            }}
            type="text"
            placeholder="Zone Name *"
            className="bg-zinc-700 px-4 py-2 border-white border-[0.5px] rounded-2xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            disabled={zoneName === ""}
            className="bg-zinc-300 uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSongZoneForm;
