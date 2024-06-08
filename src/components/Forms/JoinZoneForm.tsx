import { useState } from "react";
import { VscGitPullRequestCreate } from "react-icons/vsc";

const JoinZoneForm = () => {
  const [zoneName, setZoneName] = useState("");
  return (
    <div className="flex flex-col justify-between items-center py-5">
      <h1 className="text-6xl font-extrabold flex flex-col  justify-center items-center gap-4 md:gap-8 text-center">
        <VscGitPullRequestCreate />
        Join Zone
      </h1>
      <form className="flex flex-col gap-6 mt-16 mb-8">
        <input
          value={zoneName}
          onChange={(e) => {
            setZoneName(e.target.value);
          }}
          type="text"
          placeholder="Zone Name"
          className="bg-zinc-700 px-4 py-2 border-white border-[0.5px] rounded-2xl"
        />

        <div className="flex flex-col gap-2">
          <button
            disabled={zoneName === ""}
            className="bg-zinc-300 uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500"
          >
            Continue
          </button>
          <p className="text-xs text-center text-gray-400">
            (zone name is mandatory)
          </p>
        </div>
      </form>
    </div>
  );
};

export default JoinZoneForm;
