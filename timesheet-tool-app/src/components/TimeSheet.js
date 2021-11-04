//import {useHistory, useLocation} from "react-router-dom";
import Button from '@mui/material/Button';
import TimeSheetTable from './TimeSheetTable';
import * as React from 'react';

const {useState} = require("react");

export default function TimeSheet(props) {
   // const location = useLocation();
   // let history = useHistory();
   if(props.location.state){
        console.log(props.location.state.approvalStatus);
        console.log(props.location.state.weekEnding);
   }
  

    const [totalBilling, setTotalBilling] = useState();
    const [totalComp, setTotalComp] = useState();
    const [selectedWeek, setSelectedWeek] = useState("11-7-2021,11-6-2021,11-5-2021,11-4-2021,11-3-2021,11-2-2021,11-1-2021");

  /*  const dates = [...Array(7)].map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return d
    }) */

    const selectWeek = event => {
        setSelectedWeek(event.target.value);
        //console.log(event.target.value);
       // var parseDay = event.target.value.split('-');
       // console.log(parseDay[0]);
        //console.log(parseDay[1]);
        //console.log(parseDay[2]);
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

    return (
        <React.Fragment>
        <div>
            <div >
            <label style={{fontWeight:'bold'}}>Week Ending: </label>
            <select name="date" id="date" onChange={selectWeek}>
                <option value="11-07-2021">11-07-2021</option>
                <option value="10-31-2021">10-31-2021</option>
                <option value="10-24-2021">10-24-2021</option>
                <option value="10-17-2021">10-17-2021</option>
                <option value="10-10-2021">10-10-2021</option>
            </select>
            <div>
            
            </div>
            <label style={{fontWeight:'bold'}}> Total Billing Hours:  </label>
                <input type="text" value={totalBilling} onChange={event => setTotalBilling(event.target.value)}/>
            <label style={{fontWeight:'bold'}}> Total Compensated Hours:  </label>
                    <input type="text" value={totalComp} onChange={event => setTotalComp(event.target.value)}/>

            </div>
            <br></br>
            <Button style={{float: "right"}} variant="outlined">Set Default</Button>
            <br></br>
        </div>
        <TimeSheetTable selectedWeek = {selectedWeek}/>
        </React.Fragment>
    );
}