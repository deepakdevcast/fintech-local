import { useEffect, useState } from "react";
import { backendGetBalanceCall } from "../api";

function UserBalance() {
  const [userBalance, setUserBalance] = useState();
  useEffect(() => {
    backendGetBalanceCall().then((data) => setUserBalance(data.balance));
  }, [])
  return (
    <div>
      <span className="font-semibold">Your Balance</span>
      <span className="ml-2">${userBalance}</span>
    </div>
  );
}

export default UserBalance;
