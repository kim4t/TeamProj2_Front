import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import './table.css'
import TimeSheet from './TimeSheet';
//need to do npm install @mui/material @emotion/react @emotion/styled

const {useState} = require("react");
function createData(day, date, starttime, endtime, totaltime, floatingDay, holiday, vaccation) {
    return {day, date, starttime, endtime, totaltime, floatingDay, holiday, vaccation};
}

//   handleItemChanged(i, event){
//     var items = this.state.items;
//     rows[i]  = event.target.value;

//     this.setState({
//       rows: rows
//     });
//   }



export default function TimeSheetTable(props) {

    const [floatCount, setFloatCount] = useState(0);
    //const [holidayCount, setHolidayCount] = useState(0);
    const [vacationCount, setvacationCount] = useState(0);
    //const [disableVacation, setdisableVacation] = useState(false);
    //const [disableFloating, setdisableFloating] = useState(false);
    const [totalBilling, setTotalBilling] = useState(0);
    const [totalCompensated, setTotalCompensated] = useState(0);
    const [chosenWeek, setChosenWeek] = useState(props.selectedWeek);

    const [timeTable, setTimeTable] = useState();
    
   // const [floatCount, setFloatCount] = useState(0);

    //this will be obtained from the backend
    
    const [rows, setRows] = useState([
        createData('Sunday', chosenWeek.split(",")[0], 'N/A', 'N/A', 0, false, false, false),
        createData('Monday', chosenWeek.split(",")[1], 'N/A', 'N/A', 0, false, false, false),
        createData('Tuesday', chosenWeek.split(",")[2], 'N/A', 'N/A', 0, false, false, false),
        createData('Wednesday', chosenWeek.split(",")[3], 'N/A', 'N/A', 0, false, false, false),
        createData('Thursday', chosenWeek.split(",")[4], 'N/A', 'N/A', 0, false, false, false),
        createData('Friday', chosenWeek.split(",")[5], 'N/A', 'N/A', 0, false, false, false),
        createData('Saturday', chosenWeek.split(",")[6], 'N/A', 'N/A', 0, false, false, false),
      ]);



    // React.useEffect(() => { 
    //     console.log("component updated"); 
        
    // });

 
 const changeStartTime = index => event => {
    //console.log(event.target.value); 
    let newArr = [...rows]; //copy of our table
    let prevTotal = newArr[index].totaltime;
    let newStart = event.target.value;
    newArr[index].starttime = newStart;
    newArr[index].totaltime = newArr[index].endtime - newStart;
    if (newArr[index].totaltime <= 0) {
        newArr[index].totaltime = 0;
    }
    setRows(newArr);
    let total = newArr[index].totaltime;
    setTotalBilling(totalBilling + (total = total || 0) - (prevTotal = prevTotal || 0));
    setTotalCompensated(totalCompensated + (total = total || 0) - (prevTotal = prevTotal || 0));
}

const changeFloat = index => event => {

    let newArr = [...rows];//copy of our table
    if (newArr[index].floatingDay === false) {
        let prevTotal = newArr[index].totaltime;
        newArr[index].floatingDay = true;
        setFloatCount(floatCount + 1);
        newArr[index].starttime = "N/A";
        newArr[index].endtime = "N/A";
        newArr[index].totaltime = 0;
        setTotalBilling(totalBilling - prevTotal);
    
        setTotalCompensated(totalCompensated + 8 - prevTotal);

    } else {
        newArr[index].floatingDay = false;

        setFloatCount(floatCount - 1);
     
        setTotalCompensated(totalCompensated - 8);
    }
    setRows(newArr);

    console.log("floating day =", newArr[index].floatingDay);
    //printLeaves()
}

// function printLeaves() {
//     console.log("floating count =", floatCount);
//     console.log("holiday count =", holidayCount);
//     console.log("vacation count =", vacationCount);

// }

// const changeHoliday = index => event => {
//     let newArr = [...rows];//copy of our table
//     if (newArr[index].holiday === false) {
//         newArr[index].holiday = true;
//         setHolidayCount(holidayCount + 1);
//     } else {
//         newArr[index].holiday = false;
//         setHolidayCount(holidayCount - 1);
//     }
//     setRows(newArr);
//     console.log("holiday =", newArr[index].holiday);
// }

const changeVacation = index => event => {
    let newArr = [...rows];//copy of our table
    if (newArr[index].vaccation === false) {
        let prevTotal = newArr[index].totaltime;
        newArr[index].vaccation = true;
        newArr[index].starttime = "N/A";
        newArr[index].endtime = "N/A";
        newArr[index].totaltime = 0;
        setTotalBilling(totalBilling - prevTotal);
        setvacationCount(vacationCount +  1);
        setTotalCompensated(totalCompensated + 8 - prevTotal);
    } else {
        newArr[index].vaccation = false;
        setvacationCount(vacationCount -  1);
        setTotalCompensated(totalCompensated - 8);
    }
    setRows(newArr);
    console.log("vacation =", newArr[index].vaccation);
}

function saveWeek(event) {
    event.stopPropagation();
    var timeSheet = rows;
    var id = "";
    var filePath = "";
    var weekEnding = "";
    var user = "";

    var submissionObj = {id, filePath, weekEnding, timeSheet, user};

    console.log(submissionObj);
}


const axios = require('axios');

function getDatafromDB() {
    var userName = "user"
    const config = {
        headers: {"Access-Control-Allow-Origin": "*"},
        params: {weekEnding: "31 March 2018"}
    }
    const res = axios.get('http://localhost:8080/api/timeSheet/' + userName, config)
                .then(data => setTimeTable(data.data));
                
   // console.log(timeTable);
    /*
    var weekEnding = "31 March 2018";
    var userName = "user";
    
    const specs = {
        method: 'GET',
       /* headers: {'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin": "*"} */
   //     body: JSON.stringify({weekEnding: "31 March 2018", userName: "user"})
    //}; 
     //fetch('http://localhost:8080/api/timeSheet', specs)
     //.then(response => response.json())
     //.then(data => setTimeTable({ totalReactPackages: data.total }));
     
}


function loadWeek(event) {
    event.stopPropagation();
   // console.log("asdasdasd", props.loadWeek());
    setChosenWeek(props.loadWeek());
    var weekArr = chosenWeek.split(",");
    let newArr = [...rows];
    for (let i = 0; i < 7; i++) {{
        newArr[i].date = weekArr[i];
    }}
    setRows(newArr);
    getDatafromDB();
    console.log(timeTable);
}

const changeEndTime = index => event => {
   // console.log(event.target.value);
    let newArr = [...rows]; //copy of our table
    let prevTotal = newArr[index].totaltime;
    let newEnd = event.target.value;
    newArr[index].endtime = newEnd;
    newArr[index].totaltime = newEnd - newArr[index].starttime;
    setRows(newArr);
    let total = newArr[index].totaltime;
    setTotalBilling(totalBilling + (total = total || 0) - (prevTotal = prevTotal || 0));
    setTotalCompensated(totalCompensated + (total = total || 0) - (prevTotal = prevTotal || 0));
}

    return (
    <React.Fragment>
    <Button style={{float: "left"}} variant="outlined"  onClick = {loadWeek}>Load Table</Button>
    <TableContainer component={Paper}>
      <Table aria-label="simple table" style={{borderTop:10, borderLeft:10}}>
        <TableHead>
          <TableRow>
            <TableCell style ={{fontWeight: 'bold'}} >Day</TableCell>
            <TableCell style ={{fontWeight: 'bold'}} >Date</TableCell>
            <TableCell style ={{fontWeight: 'bold'}} >Start Time</TableCell>
            <TableCell style ={{fontWeight: 'bold'}} >End Time</TableCell>
            <TableCell style ={{fontWeight: 'bold'}} >Total Hours</TableCell>
            <TableCell style ={{fontWeight: 'bold'}} >Floating Day</TableCell>
            <TableCell style ={{fontWeight: 'bold'}} >Holiday</TableCell>
            <TableCell style ={{fontWeight: 'bold'}} >Vacation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.day}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell>{row.date}</TableCell>
              
              <TableCell>
              <select name="starttime" id="starttime" onChange={changeStartTime(i)}>
                <option value= "0">12:00 AM</option>
                <option value= "1">1:00 AM</option>
                <option value= "2">2:00 AM</option>
                <option value= "3">3:00 AM</option>
                <option value= "4">4:00 AM</option>
                <option value= "5">5:00 AM</option>
                <option value= "6">6:00 AM</option>
                <option value= "7">7:00 AM</option>
                <option value= "8">8:00 AM</option>
                <option value= "9">9:00 AM</option>
                <option value= "10">10:00 AM</option>
                <option value= "11">11:00 AM</option>
                <option value= "12">12:00 PM</option>
                <option value= "13">1:00 PM</option>
                <option value= "14">2:00 PM</option>
                <option value= "15">3:00 PM</option>
                <option value= "16">4:00 PM</option>
                <option value= "17">5:00 PM</option>
                <option value= "18">6:00 PM</option>
                <option value= "19">7:00 PM</option>
                <option value= "20">8:00 PM</option>
                <option value= "21">9:00 PM</option>
                <option value= "22">10:00 PM</option>
                <option value= "23">11:00 PM</option>
            </select>
            {row.starttime}
              
              </TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell> */}
              <TableCell>
              <select name="endtime" id="endtime" onChange={changeEndTime(i)}>
                <option value= "0">12:00 AM</option>
                <option value= "1">1:00 AM</option>
                <option value= "2">2:00 AM</option>
                <option value= "3">3:00 AM</option>
                <option value= "4">4:00 AM</option>
                <option value= "5">5:00 AM</option>
                <option value= "6">6:00 AM</option>
                <option value= "7">7:00 AM</option>
                <option value= "8">8:00 AM</option>
                <option value= "9">9:00 AM</option>
                <option value= "10">10:00 AM</option>
                <option value= "11">11:00 AM</option>
                <option value= "12">12:00 PM</option>
                <option value= "13">1:00 PM</option>
                <option value= "14">2:00 PM</option>
                <option value= "15">3:00 PM</option>
                <option value= "16">4:00 PM</option>
                <option value= "17">5:00 PM</option>
                <option value= "18">6:00 PM</option>
                <option value= "19">7:00 PM</option>
                <option value= "20">8:00 PM</option>
                <option value= "21">9:00 PM</option>
                <option value= "22">10:00 PM</option>
                <option value= "23">11:00 PM</option>
            </select>
            {row.endtime}
            </TableCell>
              <TableCell>{row.totaltime}</TableCell>

              <TableCell><input type="checkbox" name="floatingday" value="floatingday" onChange={changeFloat(i)} disabled={(row.vacation || floatCount >= 3 || vacationCount >= 2)}/>
              
              </TableCell>

              <TableCell><input type="checkbox" name="holiday" value="holiday" disabled ={true}/>
              </TableCell>

              <TableCell><input type="checkbox" name="vacation" value="vacation" onChange={changeVacation(i)} disabled={row.floatingDay || floatCount >= 3 || vacationCount >= 2}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalBilling}
      <br></br>
      {totalCompensated}
    </TableContainer>
    <br></br>
    <Button style={{float: "right"}} variant="outlined" onClick = {saveWeek}>Save</Button>
    {/* {props.selectedWeek} */}
    <br></br>
    <div>
    <select name="endtime" id="endtime" >
            <option value= "Approved">Approved Timesheet</option>
            <option value= "Unapproved">Unapproved Timesheet</option>
    </select>
    <input type="file" />
    </div>
    </React.Fragment>);
}