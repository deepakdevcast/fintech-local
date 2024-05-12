import { useNavigate } from "react-router-dom";
import UserIcon from "./UserIcon";
import { useEffect, useState } from "react";
import { backendFindUserCall, backendUserAllCall } from "../api";

function Users() {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const userMoneyTransfer = ({_id, name, email}) => {

    navigate('/transfer', {
      state: {
        receiverId: _id,
        receiverName: name,
        receiverEmail: email
      }
    })
  }

  useEffect(() =>{
    if(searchText !='') backendFindUserCall(searchText).then(data => setUserList(data));
    else backendUserAllCall().then(data => setUserList(data));
  }, [searchText])

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
        <div key={user._id} className="pb-2 flex justify-between items-center">
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
