import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Timezone from "./pages/Timezone";
import { ROUTES } from "./contants";
import { Background } from "./components/Background";
import { useUser } from "./context/UserProvider";
import { ReactElement } from "react";
import Setup from "./components/Setup";
import Settings from "./pages/Settings";
import MultiPurposeModal from "./components/MultiPurposeModal";

const AuthorizeCheck = (props: { children: ReactElement }) => {
  const user = useUser();
  <div className="w-[240px] h-[240px]  bg-gradient-to-br from-yellow-400 to-yellow-800"></div>;

  if (!user.user) {
    return <Setup />;
  }
  return props.children;
};

function App() {
  return (
    <main className="min-w-screen min-h-screen bg-zinc-900 flex justify-center items-center text-white">
      <Background />
      <AuthorizeCheck>
        <Routes>
          <Route path={ROUTES.getSettingsRoute()} element={<Settings />} />
          <Route>
            <Route path="/" element={<Home />} />

            <Route
              path={ROUTES.getTimezoneRoute(":name")}
              element={<Timezone />}
            />
          </Route>
        </Routes>
      </AuthorizeCheck>
      <MultiPurposeModal />
    </main>
  );
}

export default App;
