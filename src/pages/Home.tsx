import React, { FC, useState, useEffect, useContext } from "react";
import axios from "axios";
import { config } from "../utils/Api";
import "../assets/styles/home.scss";
import DeviceContext from "../utils/DeviceContext";
import Auth from "../utils/Auth";

interface Device {
  Id: number;
  TypeId: number;
  BrandId: string;
  Name: string;
  Comment: string;
  Description: string;
}

const Home: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const { updateModalOpen, updateAddModalOpen } = useContext(DeviceContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    setError(false);
    axios
      .get("http://163.47.115.230:30000/api/overview/modeltype", config)
      .then(({ data }) => {
        setDevices(data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  const logout = () => {
    Auth.deauthenticateUser();
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div className="top-row">
        <h2>Medical Device List</h2>
        <button
          type="button"
          className="btn-add"
          onClick={() => updateAddModalOpen(true)}
        >
          Add Model
        </button>
        <button type="button" onClick={logout} className="btn-logout">
          Logout
        </button>
      </div>
      {loading && <div className="main-loader" />}
      {!loading && error && (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <button type="button" onClick={fetchData}>
            Try Again
          </button>
        </div>
      )}
      <div className="device-list">
        {!loading &&
          devices &&
          devices.map((device, index) => (
            <div key={index} className="single-device">
              <span>
                <b>Name&nbsp;</b>
                {device.Name !== null ? device.Name : "Not found"}
              </span>
              <span>
                <b>Brand&nbsp;</b>
                {device.BrandId !== null ? device.BrandId : "Not found"}
              </span>
              <span>
                <b>Description&nbsp;</b>
                {device.Description !== null ? device.Description : "Not found"}
              </span>
              <span>
                <b>Comment&nbsp;</b>
                {device.Comment !== null ? device.Comment : "Not found"}
              </span>
              <span
                className="show-action"
                onClick={() =>
                  updateModalOpen(true, device.BrandId, device.Name)
                }
              >
                Show Data
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Home;
