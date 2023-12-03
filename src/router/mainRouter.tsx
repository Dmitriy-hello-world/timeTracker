import { Routes, Route } from "react-router-dom";
import Layout from "./lib/layout";
import App from "@/components/app/App";
import { Settings } from "@/components/settings/settings";
import { TimeControl } from "@/components/timeControl/timeControl";

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<App />} path="/" />
        <Route element={<Settings />} path="/settings" />
        <Route element={<TimeControl />} path="/time" />
      </Route>
    </Routes>
  );
};

export default RootRouter;
