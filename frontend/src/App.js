import "./App.css";
import { useEffect, useState } from "react";
import { DashboardDataAction } from "./Action/DashboardDataAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Line, Bar } from "react-chartjs-2";
import faker from "faker";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const dispatch = useDispatch();
  const [Intensitylabels, IntensitysetLabel] = useState([]);
  const [Likelihoodlabel, Likelihoodsetlabel] = useState([]);

  const [end_year, setend_year] = useState([]);
  const [start_year, setstart_year] = useState([]);
  const [allyear, setAllYear] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [showError, setshowError] = useState(false);
  // const [minstart_year, setMinstart_year] = useState(0);
  // const [MaxEnd_Year, setMaxEnd_Year] = useState(0);

  const { datadetails, loading } = useSelector((state) => {
    return state.dashboardData;
  });

  useEffect(() => {
    dispatch(DashboardDataAction());
  }, []);

  useEffect(() => {
    if (datadetails) {
      if (datadetails.success == true) {
        //  get  intensity value

        IntensitysetLabel(() => {
          return datadetails.data.map((item, index) => {
            return item.intensity;
          });
        });

        //  get Likelihood array value

        Likelihoodsetlabel(() => {
          return datadetails.data.map((item, index) => {
            return item.likelihood;
          });
        });

        // get Year

        //  get Start Year
        let startyear_arr = datadetails.data.map((item) => {
          return item.start_year;
        });
        //
        startyear_arr.sort(function (a, b) {
          return a - b;
        });
        setstart_year(() => {
          return startyear_arr.filter((item) => {
            return item != null;
          });
        });

        //  get End Year

        let endyear_arr = datadetails.data.map((item) => {
          return item.end_year;
        });
        //
        endyear_arr.sort(function (a, b) {
          return a - b;
        });
        setend_year(() => {
          return endyear_arr.filter((item) => {
            return item != null;
          });
        });

        setAllYear(start_year.concat(end_year));

        allyear.sort(function (a, b) {
          return a - b;
        });
      }
      if (datadetails.success == false) {
        seterrorMessage(datadetails.message);
        setshowError(true);
      }
    }
  }, [datadetails]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Intensity Graph",
      },
    },
  };

  const data = {
    labels: Intensitylabels,
    datasets: [
      {
        label: "",

        data: Intensitylabels,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  // Likelihood Graph
  const Likelihoodoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Likelihood Graph",
      },
    },
  };

  const Likelihooddata = {
    labels: Likelihoodlabel,
    datasets: [
      {
        label: "",
        data: Likelihoodlabel,
        borderColor: "#ff00e7;",
        backgroundColor: "rgb(127 0 255 / 35%)",
      },
    ],
  };

  //  Start Year
  const startyearoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Start Year",
      },
    },
  };

  const startyeardata = {
    labels: start_year,

    datasets: [
      {
        label: "Start Year",

        data: start_year,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  //  End Year

  const endyearoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "End Year",
      },
    },
  };

  const endyeardata = {
    labels: end_year,

    datasets: [
      {
        label: "End Year",

        data: end_year,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      {loading == true ? (
        <>
          <h1 className="loading">Loading ....</h1>
        </>
      ) : (
        <>
          {showError == true && (
            <div className="errordiv">
              <p>{errorMessage} </p>
              <p
                className="removeErrorbox"
                onClick={() => {
                  setshowError(false);
                }}
              >
                X
              </p>
            </div>
          )}

          <div className="Container">
            <h1 className="textcenter">dashboard assignment</h1>
            <div className="Intensity_Graph_Container">
              <h2 className="textcenter">Intensity Graph </h2>
              <Line options={options} data={data} />;
            </div>
            <div className="Likelihood_Graph_Container">
              <h2 className="textcenter"> Likelihood Graph</h2>
              <Line options={Likelihoodoptions} data={Likelihooddata} />;
            </div>
            <div>
              <h2 className="textcenter"> Year Graph </h2>
              <div className="YearGraph">
                <div className="start_year">
                  <Line options={startyearoptions} data={startyeardata} />;
                </div>
                <div className="end_year">
                  <Line options={endyearoptions} data={endyeardata} />;
                </div>
              </div>
            </div>

            {/* Start Tablel  */}
            <TableContainer component={Paper} className="tableContainer">
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead className="tabelhead">
                  <TableRow>
                    <TableCell align="center"> Country</TableCell>

                    <TableCell align="center">Region</TableCell>
                    <TableCell align="center">Topics</TableCell>
                    <TableCell align="center">Sector</TableCell>
                    <TableCell align="center">Added</TableCell>
                    <TableCell align="center">Published</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datadetails && datadetails.success == true && (
                    <>
                      {datadetails.data.map((item, index) => {
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">
                              {item.country == "" ? "-" : item.country}
                            </TableCell>

                            <TableCell align="center">
                              {item.region == "" ? "-" : item.region}
                            </TableCell>

                            <TableCell align="center">
                              {item.topic == "" ? "-" : item.topic}
                            </TableCell>

                            <TableCell align="center">
                              {item.sector == "" ? "-" : item.sector}
                            </TableCell>

                            <TableCell align="center">
                              {item.added == "" ? "-" : item.added}
                            </TableCell>
                            <TableCell align="center">
                              {item.published == "" ? "-" : item.published}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </>
  );
}
export default App;
