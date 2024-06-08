import { useState } from "react";
import { useUser } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../contants";

const Settings = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(user?.user?.name || "");

  const setUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    user.set({
      name: username,
    });
    navigate("/");
  };

  return (
      <div className="px-10 py-20 md:px-20 backdrop-blur-lg backdrop-brightness-150 shadow-md shadow-gray-900 rounded-3xl flex flex-col justify-center items-center gap-5 z-10">
        <h1 className="text-4xl font-bold uppercase">Setup</h1>
        <img
          src={IMAGES.profileIcon}
          alt="profile icon"
          width={100}
          className="bg-slate-400 rounded-full "
        />
        <form className="flex flex-col gap-6" onSubmit={setUser}>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username"
            className="bg-slate-800 px-4 py-2 border-white border-[0.5px] rounded-2xl"
          />

          <div className="flex flex-col gap-2">
            <button
              disabled={username === ""}
              className="bg-slate-300 uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-slate-400 disabled:text-slate-400 disabled:bg-slate-500"
            >
              Continue
            </button>
            <p className="text-xs text-center text-gray-400">
              (enter username is mandatory)
            </p>
          </div>
        </form>
      </div>
  );
};

export default Settings;
