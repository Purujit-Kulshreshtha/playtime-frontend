import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Timezone from "./pages/Timezone";
import { ROUTES } from "./contants";
import { Background } from "./components/Background";
import { useUser } from "./context/UserProvider";
import Settings from "./components/Settings";
import { ReactElement } from "react";

const AuthorizeCheck = (props: { children: ReactElement }) => {
  const user = useUser();
  console.log(user);
  if (!user.user) {
    return <Settings />;
  }
  return props.children;
};

function App() {
  return (
    <main className="min-w-screen min-h-screen bg-slate-800 flex justify-center items-center text-white">
      <Background />

      <AuthorizeCheck>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path={ROUTES.getTimezoneRoute(":name")}
            element={<Timezone />}
          />
        </Routes>
      </AuthorizeCheck>
    </main>
  );
}

export default App;
