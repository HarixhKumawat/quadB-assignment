import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  let [tableData, setTableData] = useState([{ _id: "", base_unit: "", buy: "", last: "", name: "", sell: "", volume: "" }, { base_unit: "", buy: "", last: "", name: "", sell: "", volume: "" }, { base_unit: "", buy: "", last: "", name: "", sell: "", volume: "" }, { base_unit: "", buy: "", last: "", name: "", sell: "", volume: "" }])
  let [currTheme, setCurrTheme] = useState("dark")
  let [printData, setPrintData] = useState(false)

  const switchTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light")
      document.body.classList.remove("dark")
      setCurrTheme("light")
    } else {
      localStorage.setItem("theme", "dark")
      document.body.classList.add("dark")
      setCurrTheme("dark")
    }

  }
  const getAllData = async () => {
    try {
      const baseUrl = process.env.REACT_APP_SERVER_URL
      const url = baseUrl + "/quadB/tickers"
      console.log(url);
      const { data } = await axios.get(url)
      console.log(data)
      setTableData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setCurrTheme(localStorage.getItem("theme"))
    console.log(localStorage.getItem("theme"))
    if (currTheme == "dark") {
      document.body.classList.add("dark")
    }

    getAllData()

  }, [])

  useEffect(() => {
    setPrintData(true)
    console.log(printData)
    tableData.map((val) => { console.log(val.name) })
  }, tableData)

  return (
    <div className='dark:bg-[#191d28]'>
      <div className=" flex w-[90vw] flex-row border-b-2 border-indigo-500 dark:border-0 content-center items-center">
        <img src={"https://hodlinfo.com/static/media/HODLINFO.8f78fc06.png"} className="flex pt-4 lg:h-[5vw] h-[13vw] App-logo" alt="logo" />
        <button className="rounded-lg px-3 py-1 lg:text-[2vw] text-[5vw] mr-1 mt-2 border-2 border-zinc-800 bg-white fixed right-0 text-purple-950 dark:bg-[#3dc6c1] dark:text-purple-200" onClick={switchTheme}>{currTheme}</button>
      </div>


      <div className="pt-10 flex-row w-[80vw] m-auto dark:text-gray-200 text-xl font-semibold min-h-screen">

        <div class="grid grid-cols-6 gap-4 px-9">
          <div>Name</div>
          <div>Last Trad Price</div>
          <div>Buy Price</div>
          <div>Sell Price</div>
          <div>Volume</div>
          <div>Base Unit</div>
        </div>
        {printData ? tableData.map((val, key) => {
              return (<div className='grid grid-cols-6 gap-1 bg-slate-300 dark:bg-[#2e3241] p-2 px-10 my-4 rounded-lg'>
                <div className='mb-10'>{val.name}</div>
                <div>{val.last}</div>
                <div>{val.buy}</div>
                <div>{val.sell}</div>
                <div>{val.volume}</div>
                <div>{val.base_unit}</div>
              </div>)
            }) : (<i>loading...</i>)}
        
      </div>
    </div>
  );
}

export default App;
