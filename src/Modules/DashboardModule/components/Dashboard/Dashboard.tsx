import {useEffect, useState} from "react";
import Header from "../../../SharedModule/components/Header";
import DonutChart from "react-donut-chart";
import { toast } from "react-toastify";
import { useUser } from "../../../../Context/AuthContext";
import axios from "axios";
import {
  baseUrl,
  handleApiError,
  loader,
  requestHeaders,
} from "../../../../utils/Utils";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { Token  , userRole} = useUser();
  const [todoCount, settodoCount] = useState<number>(0);
  const [progressCount, setprogressCount] = useState<number>(0);
  const [doneCount, setdoneCount] = useState<number>(0);
  const [activatedEmployeeCount, setactivatedEmployeeCount] = useState<number>(0);
  const [deactivatedEmployeeCount, setdeactivatedEmployeeCount] = useState<number>(0);
  
  const getTasksCount = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Task/count`,
        { headers: requestHeaders, }
      );

      settodoCount(response.data.done);
      setprogressCount(response.data.inProgress);
      setdoneCount(response.data.toDo);
      // console.log (response.data.done);
    } catch (error) {
      console.log("Error Not Exepted")
    }
  };
  const getUserCount = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Users/count`,
        { headers: requestHeaders,}
      );
      setactivatedEmployeeCount(response.data.activatedEmployeeCount );
      setdeactivatedEmployeeCount(response.data.deactivatedEmployeeCount);
      
    } catch (error) {
      console.log("Error Not Exepted")
    }
  };

  useEffect(() => {
    getTasksCount();
    getUserCount();
  }, []);
  return (
    <>
    <div className="main-content">
      <Header />

      <div className = 'container-fluid  py-5'>
        <div className='justify-content-around d-flex gap-1  row '>
          <div className='px-5    col-sm-10  col-md-5 rounded-4' >
            <div className="titles ">
              <h3 className="">Tasks</h3>
              <p>List of all tasks</p>
            </div>
            <div className="row tasks-count my-5  ">
              <div className="col-md-4 mb-1 ">
                <div className="tasks d-flex flex-column  p-3  rounded-4">
                  <i className="fa fa-tasks my-3"> </i>
                  <span className="py-1 ps-1 text-dark-light">To do</span>
                  <h3 className="ps-1 text-dark-light">{todoCount}</h3>
                </div>
              </div>
              <div className="col-md-4 mb-1 ">
                <div className="tasks1 d-flex flex-column  p-3 rounded-4">
                  <i className="fa-solid fa-group-arrows-rotate  my-3"></i>
                  <span className="py-1 ps-1 text-dark-light">In-progress</span>
                  <h3 className="ps-1 text-dark-light">{progressCount}</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="tasks2 d-flex flex-column   p-3  rounded-4">
                  <i className="fa-solid fa-calendar-check my-3"></i>
                  <span className="py-1 ps-1 text-dark-light">Done</span>
                  <h3 className="ps-1 text-dark-light">{doneCount}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className='px-5  col-sm-10  col-md-5 rounded-4 ' >
            <div className=" tasks-charts pt-5 d-flex justify-content-center  align-items-center">      
          <DonutChart
              data={[
                { label: "To Do", value: todoCount },
                { label: "In Progress", value:progressCount  },
                { label: "Done", value: doneCount },
              ]}
              height={290}
              width={400}
              clickToggle={true}
              interactive={true}
              innerRadius= {0.6}
                colors={["#CFD1EC", "#E4E4BC", "#E7C3D7"]}
            />
               </div>
          </div>
        </div>
      </div>

   {userRole === "Manager" ?
     <div className= 'container-fluid  py-5' >
     <div className=" row dashboaed-charts  justify-content-around gap-1  ">
       <div className='px-5    col-sm-10  col-md-5 rounded-4'>
       <div className="titles pt-3 ">
           <h3>Users</h3>
           <p>List of all users</p>
         </div>
         <div className="row users-count my-5  ">
           <div className="col-md-4  mb-1">
             <div className="  user  d-flex flex-column  rounded-4 p-3">
               <i className="fa-solid fa-user-large my-2"></i>
               <span className="py-1 ps-1 text-dark-light">Active users</span>
               <h3 className="ps-1 text-dark-light ">{activatedEmployeeCount}</h3>
             </div>
           </div>
            <div className="col-md-4 mb-1">
             <div className="  user1 d-flex flex-column  rounded-4 p-3">
               <i className="fa-solid fa-user-slash my-2"></i>
               <span className="py-1 ps-1 text-dark-light"> De-active users</span>
               <h3 className="ps-1 text-dark-light">{deactivatedEmployeeCount}</h3>
             </div>
           </div>
        
         </div>
       </div>

       <div className='px-5  col-sm-10  col-md-5 rounded-4 '>
         <div className=" tasks-charts pt-5 d-flex justify-content-center  align-items-center">      
       <DonutChart
           data={[
             { label: "Active ", value: activatedEmployeeCount },
             { label: " De-active ", value:deactivatedEmployeeCount  },
           ]}
           height={290}
           width={400}
           clickToggle={true}
           interactive={true}
           innerRadius= {0.6}
           // colors = {["#7187FF", "#9D9D9D", "#CFD1EC"]}
             colors={["#CFD1EC", "#E4E4BC", ]}
         />
            </div>
       </div>
     </div>
   </div> : ''}
    
      
    </div>
  </>
  );
}
