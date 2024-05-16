import { useNavigate } from "react-router-dom";
import UserIcon from "./UserIcon";
import { useState, useEffect } from "react";
import { backendFindUserCall, backendUserAllCall } from "../api";
import { useDebouncing } from "../hooks/debouncing";

function Users() {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const userMoneyTransfer = ({id, name, email}) => {

    navigate('/transfer', {
      state: {
        receiverId: id,
        receiverName: name,
        receiverEmail: email
      }
    })
  }

  const debounceValue = useDebouncing(searchText, 600)
  useEffect(() =>{
    if(searchText !='') backendFindUserCall(searchText).then(data => setUserList(data));
    else backendUserAllCall().then(data => setUserList(data));
    }, [debounceValue])

  return (
    <>
      <div className="pt-4">
        <p className="font-semibold">Users</p>
        <div className="pt-2">
          <input
            type="text"
            className="w-full border-2 p-2 focus:outline-none focus:border-blue-600"
            name="user"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search User!"
          ></input>
        </div>
      </div>
      <div className="pt-4">
        {userList.map(user => 
        <div key={user.id} className="pb-2 flex justify-between items-center">
          <div className="flex">
            <UserIcon text={user.name.charAt(0)}/>
            <span className="font-semibold pl-2 flex items-center">{user.name}</span>
          </div>
          <div>
            <button className="bg-black text-white px-4 py-2 rounded" onClick={() => userMoneyTransfer(user)}>
              Send Money
            </button>
          </div>
        </div>
        )}
      </div>
    </>
  );
}

export default Users;
