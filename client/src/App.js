import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import './App.css';

export default function App() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    const callData = async (req, res) => {
      try {
        const res = await fetch('/getdata', {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
          },
          credentials: "include"
        });

        const sheetData = await res.json();
        setUser(sheetData.data.data);
      }
      catch (error) {
        console.log(error);
      }
    }

    callData();
  });

  return (
    <div className='text-center w-100'>
      <h1 className='text-center py-4 mx-2 lh-base lh-sm-0 fs-2'>100 DAYS OF CODE <br/> PROGRESS REPORT</h1>
      <Table responsive bordered className='container w-auto table-xl text-nowrap my-2 overflow-scroll  table-fixed mx-4 mx-sm-auto '>
        <thead className=''>
          <tr className='text-uppercase table-success'>
            <th className='px-3'>#</th>
            <th className='px-3'>NAME</th>
            <th className='text-nowrap'>College NAME</th>
            <th className='text-nowrap'>DAYS COMPLETED</th>
            <th className='text-nowrap'>DAYS MISSED</th>
            <th className='text-nowrap'>CURRENT STREAK</th>
          </tr>
        </thead>
        <tbody>
          {
            [...user]
            .sort((a, b) => b.CURRENTSTREAK - a.CURRENTSTREAK)
            .map((val, key) => {
              return <tr key={val.SNO} >
                <td>{key+1}</td>
                <td>{val.NAME}</td>
                <td>{val.COLLEGENAME}</td>
                <td>{val.DAYSCOMPLETED}</td>
                <td>{val.DAYSMISSED}</td>
                <td>{val.CURRENTSTREAK}</td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  );
}