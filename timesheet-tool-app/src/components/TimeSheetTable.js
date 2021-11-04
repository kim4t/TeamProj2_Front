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
function createData(name, date, starttime, endtime, totaltime, floatingday, holiday, vacation) {
    return { name, date, starttime, endtime, totaltime, floatingday, holiday, vacation};
}



//   handleItemChanged(i, event){
//     var items = this.state.items;
//     rows[i]  = event.target.value;

//     this.setState({
//       rows: rows
//     });
//   }



export default function TimeSheetTable({selectedWeek}) {

    const [floatCount, setFloatCount] = useState(0);
    //const [holidayCount, setHolidayCount] = useState(0);
    const [vacationCount, setvacationCount] = useState(0);
    //const [disableVacation, setdisableVacation] = useState(false);
    //const [disableFloating, setdisableFloating] = useState(false);
    const [totalBilling, setTotalBilling] = useState(0);
    const [totalCompensated, setTotalCompensated] = useState(0);
    const [chosenWeek, setChosenWeek] = useState({selectedWeek});

   // const [floatCount, setFloatCount] = useState(0);

    //this will be obtained from the backend
    const [rows, setRows] = useState([
        createData('Sunday', selectedWeek.split(",")[0], 'N/A', 'N/A', 0, false, false, false),
        createData('Monday', selectedWeek.split(",")[1], 'N/A', 'N/A', 0, false, false, false),
        createData('Tuesday', selectedWeek.split(",")[2], 'N/A', 'N/A', 0, false, false, false),
        createData('Wednesday', selectedWeek.split(",")[3], 'N/A', 'N/A', 0, false, false, false),
        createData('Thursday', selectedWeek.split(",")[4], 'N/A', 'N/A', 0, false, false, false),
        createData('Friday', selectedWeek.split(",")[5], 'N/A', 'N/A', 0, false, false, false),
        createData('Saturday', selectedWeek.split(",")[6], 'N/A', 'N/A', 0, false, false, false),
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
    if (newArr[index].floatingday === false) {
        let prevTotal = newArr[index].totaltime;
        newArr[index].floatingday = true;
        setFloatCount(floatCount + 1);
        newArr[index].starttime = "N/A";
        newArr[index].endtime = "N/A";
        newArr[index].totaltime = 0;
        setTotalBilling(totalBilling - prevTotal);
    
        setTotalCompensated(totalCompensated + 8 - prevTotal);

    } else {
        newArr[index].floatingday = false;

        setFloatCount(floatCount - 1);
     
        setTotalCompensated(totalCompensated - 8);
    }
    setRows(newArr);

    console.log("floating day =", newArr[index].floatingday);
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
    if (newArr[index].vacation === false) {
        let prevTotal = newArr[index].totaltime;
        newArr[index].vacation = true;
        newArr[index].starttime = "N/A";
        newArr[index].endtime = "N/A";
        newArr[index].totaltime = 0;
        setTotalBilling(totalBilling - prevTotal);
        setvacationCount(vacationCount +  1);
        setTotalCompensated(totalCompensated + 8 - prevTotal);
    } else {
        newArr[index].vacation = false;
        setvacationCount(vacationCount -  1);
        setTotalCompensated(totalCompensated - 8);
    }
    setRows(newArr);
    console.log("vacation =", newArr[index].vacation);
}

function saveWeek(event) {
    event.stopPropagation();
    console.log(rows);
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
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
              key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
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

              <TableCell><input type="checkbox" name="vacation" value="vacation" onChange={changeVacation(i)} disabled={row.floatingday || floatCount >= 3 || vacationCount >= 2}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalBilling}
      <br></br>
      {totalCompensated}
    </TableContainer>
    <Button style={{float: "right"}} variant="outlined" onClick = {saveWeek}>Save</Button>
    {selectedWeek}
    </React.Fragment>);
}