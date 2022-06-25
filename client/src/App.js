import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

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
  }, []);

  return (
    <div className='text-center w-full'>
      <h1 className='text-center py-5 mx-2'>100 DAYS OF CODE PROGRESS REPORT</h1>
      <Table responsive bordered className='container my-2 overflow-scroll w-100 '>
        <thead className=''>
          <tr>
            <th>NAME</th>
            <th>College NAME</th>
            <th>DAYS COMPLETED</th>
            <th>DAYS MISSED</th>
            <th>CURRENT STREAK</th>
          </tr>
        </thead>
        <tbody>
          {
            [...user]
            .sort((a, b) => a.SCORES - b.SCORES)
            .map((val, key) => {
              return <tr key={key} >
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