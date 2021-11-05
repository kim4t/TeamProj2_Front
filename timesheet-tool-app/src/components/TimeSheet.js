//import {useHistory, useLocation} from "react-router-dom";
import Button from '@mui/material/Button';
import TimeSheetTable from './TimeSheetTable';
import * as React from 'react';

const {useState} = require("react");

export default function TimeSheet() {

    const [totalBilling, setTotalBilling] = useState();
    const [totalCompensated, setTotalCompensated] = useState();
    const [selectedWeek, setSelectedWeek] = useState("11-7-2021,11-6-2021,11-5-2021,11-4-2021,11-3-2021,11-2-2021,11-1-2021");



    const selectWeek = event => {
        setSelectedWeek(event.target.value);

        console.log(event.target.value);

    
        var lastDayofWeek = new Date(event.target.value);
        //console.log(lastDayofWeek);
        //var prevDay = new Date(event.target.value);
 
        //prevDay.setDate(lastDayofWeek.getDate() - 7);
       // console.log(prevDay);
        //console.log(lastDayofWeek.getDate() - 7);
        //var prevDay = new Date();
        //prevDay.setDate(lastDayofWeek.getDate() - 7);
        //console.log(Date.parse(prevDay));
        setSelectedWeek(Last7Days(lastDayofWeek));
        console.log(Last7Days(lastDayofWeek));

       // return Last7Days(lastDayofWeek);
    }

    function loadWeek(){
        return selectedWeek;
    }


    function saveTotalCompensated(value){
        setTotalCompensated(value);
    }

    function saveTotalBilling(value){
        setTotalBilling(value);
    }

    function Last7Days(stringDate) {
        var result = [];
        //console.log(d);
        for (var i=0; i<7; i++) {
            var newDate = new Date(stringDate);
            newDate.setDate(newDate.getDate() - i);
          //  console.log("day", newDate.getDate());
           // console.log("mo", newDate.getMonth());
           // console.log("year", newDate.getFullYear());
         /*   if (newDate.getMonth() === 11) {
                var month = 12;
            } else {
                var month = newDate.getMonth() + 1;
            }
 */
            var strDate = newDate.getMonth() + 1 + "-" + newDate.getDate() + "-" +newDate.getFullYear();
            //console.log(newDate);
            //console.log(newDate);
            result.push(strDate);
        }
    
        return(result.join(','));
    }

    React.useEffect(() => {
        setTotalBilling(20);
        setTotalCompensated(30);
    });

    return (
        <React.Fragment>
        <div>
            <br></br>
            <div style={{fontWeight: 'bold', display: 'flex', justifyContent: 'space-evenly'}}>
            <label>Week Ending: &nbsp;
                <select name="date" id="date" onChange={selectWeek}>
                    <option value="11-07-2021">11-07-2021</option>
                    <option value="10-31-2021">10-31-2021</option>
                    <option value="10-24-2021">10-24-2021</option>
                    <option value="10-17-2021">10-17-2021</option>
                    <option value="10-10-2021">10-10-2021</option>
                </select>
            </label>
            <label> Total Billing Hours: &nbsp;
                <input type="text" value={totalBilling} onChange={event => setTotalBilling(event.target.value)} disabled/>
            </label>
            <label> Total Compensated Hours:   &nbsp;
                    <input type="text" value={totalCompensated} onChange={event => setTotalCompensated(event.target.value)} disabled/>
            </label>

            </div>
            <br></br>
            <Button style={{float: "right"}} variant="outlined">Set Default</Button>
            <br></br>
        </div>
        <TimeSheetTable selectedWeek = {selectedWeek}
            loadWeek = {loadWeek}/>
        </React.Fragment>
    );
}