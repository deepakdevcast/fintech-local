import { useEffect } from "react";
import TopBar from "../components/TopBar";
import UserBalance from "../components/UserBalance";
import Users from "../components/Users";
import { getCheckToken } from "../api";

function Dashboard() {
  useEffect(()=> {
    getCheckToken();
  },[])
  return (
    <div className="flex flex-col h-screen">
      <TopBar/>
      <main className="px-6 pt-4">
        <UserBalance/>
        <Users/>
      </main>
    </div>
  );
}

export default Dashboard;
