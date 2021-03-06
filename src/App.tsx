import React, { FC, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ModelDataModal from "./components/ModelDataModal";
import { DeviceContextProvider } from "./utils/DeviceContext";
import AddDataModal from "./components/AddDataModal";

const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const updateModalOpen = (update: boolean, b: string, m: string) => {
    setIsModalOpen(update);
    setBrand(b);
    setModel(m);
  };
  const updateAddModalOpen = (update: boolean) => {
    setAddModalOpen(update);
  };
  const deviceContextValue = {
    isModalOpen,
    updateModalOpen,
    brand,
    model,
    addModalOpen,
    updateAddModalOpen,
  };
  return (
    <DeviceContextProvider value={deviceContextValue}>
      <BrowserRouter>
        <AddDataModal />
        <ModelDataModal />
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </BrowserRouter>
    </DeviceContextProvider>
  );
};
export default App;
