import { Link, useLocation } from 'react-router-dom';
import InputBox from '../components/InputBox';
import UserIcon from '../components/UserIcon';
import HeadText from '../components/HeadText';
import { backendSendMoneyCall } from '../api';
import { useState } from 'react';

function SendMoney() {
  const location = useLocation();
  const [amount, setAmount] = useState(0);
  const [isSend, setIsSend] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const { receiverId, receiverName, receiverEmail } = location.state;
  const sendMoneyToUser = async () => {
    if (amount < 1) return;
    const data = await backendSendMoneyCall(receiverId, amount);
    setIsSend(true);
    console.log(data);
    setTransactionId(data.trxId);
  };
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <div className="bg-white flex flex-col items-center border shadow-sm p-8 rounded">
        <HeadText text={'Send Money'} />
        <UserIcon text={receiverName.charAt(0).toUpperCase()} />
        <span className="font-semibold pl-2">{receiverName}</span>
        <span className="pl-2 text-slate-300">{receiverEmail}</span>
        {isSend ? (
          <div>
            <p className="text-green-600 text-center font-semibold">
              Transaction Successful!
            </p>
            <p className="pl-2 text-center text-slate-300">trxId: {transactionId}</p>
          </div>
        ) : (
          <div>
            <InputBox
              label={'Amount'}
              name={'amount'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={'50'}
              type={'number'}
            />
            <button
              className="w-full mt-8 px-3 py-2 bg-blue-600 text-white rounded-lg focus:outline-none focus:border-blue-400"
              onClick={sendMoneyToUser}
            >
              Transfer
            </button>
          </div>
        )}
        <div>
          <Link to={'/dashboard'} className="text-blue-600 font-semibold">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
