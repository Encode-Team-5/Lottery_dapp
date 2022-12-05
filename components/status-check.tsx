import { useEffect, useState, useMemo } from "react";

import getLotteryContract from "../utils/get-lottery-contract";

type StatusType = {
  error: any;
  status: boolean;
  isLoading: boolean;
};

const StatusCheck = () => {
  const [state, setState] = useState<StatusType>({
    status: false,
    isLoading: false,
    error: null,
  });
  const [values, setValues] = useState({ date: "", time: "" });
  const lotteryContract = useMemo(() => getLotteryContract(), []);

  useEffect(() => {
    (async function makeStatus() {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        const status = await lotteryContract.betsOpen();
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          status,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          error,
        }));
      }
    })();
  }, [lotteryContract]);

  const handleDateChange = (event: any) => {
    const { value, name } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpenBallot = async (event: any) => {
    event.preventDefault();
    try {
      const date = new Date(values.date + " " + values.time);
      const seconds = Math.floor(date.getTime() / 1000);
      const txn = await lotteryContract.openBets(seconds);
      await txn.wait();
      setState((prevState) => ({
        ...prevState,
        status: true,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        status: false,
      }));
      console.error(error);
    }
  };

  return (
    <div className="border border-gray-900 p-4 rounded-md">
      {state.status ? (
        <p>Betting is Opened!</p>
      ) : (
        <form onSubmit={handleOpenBallot} className="flex flex-col">
          <input
            type="date"
            value={values.date}
            onChange={handleDateChange}
            className="mb-4"
            name="date"
          />
          <input
            type="time"
            value={values.time}
            onChange={handleDateChange}
            className="mb-4"
            name="time"
          />
          <button
            type="submit"
            className="px-4 py-2.5 border border-gray-800 rounded mb-2"
          >
            {state.isLoading ? "Loading..." : "Open Ballot"}
          </button>
        </form>
      )}
    </div>
  );
};

export default StatusCheck;
