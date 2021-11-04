//import {useHistory, useLocation} from "react-router-dom";
import Button from '@mui/material/Button';

const {useState} = require("react");

export default function TimeSheet() {
   // const location = useLocation();
   // let history = useHistory();

    const [totalBilling, setTotalBilling] = useState();
    const [totalComp, setTotalComp] = useState();


    return (
        <div>
            <div >
            <label style={{fontWeight:'bold'}}>Week Ending: </label>
            <select name="date" id="date">
                <option value="11-7-2021">11-7-2021</option>
                <option value="10-31-2021">10-31-2021</option>
                <option value="10-24-2021">10-24-2021</option>
                <option value="10-17-2021">10-17-2021</option>
                <option value="10-10-2021">10-10-2021</option>
            </select>

            <label style={{fontWeight:'bold'}}> Total Billing Hours:  </label>
                <input type="text" value={totalBilling} onChange={event => setTotalBilling(event.target.value)}/>
            <label style={{fontWeight:'bold'}}> Total Compensated Hours:  </label>
                    <input type="text" value={totalComp} onChange={event => setTotalComp(event.target.value)}/>

            </div>
            <br></br>
            <Button style={{float: "right"}} variant="outlined">Set Default</Button>
            <br></br>



        </div>
    )
}