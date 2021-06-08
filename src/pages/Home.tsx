import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { config } from "../utils/Api";
import "../assets/styles/home.scss";

interface Device {
  Id: number;
  TypeId: number;
  BrandId: string;
  Name: string;
  Comment: string;
  Description: string;
}

const Home: FC = () => {
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    axios
      .get("http://163.47.115.230:30000/api/overview/modeltype", config)
      .then(({ data }) => {
        setDevices(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="top-row">
        <h2>Medical Device List</h2>
      </div>
      {loading && <div className="main-loader" />}
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
            </div>
          ))}
      </div>
    </div>
  );
};
export default Home;
