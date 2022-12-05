import { useState, useMemo } from "react";

import getLotteryContract from "../utils/get-lottery-contract";

const PurchaseToken = () => {
  const [values, setValues] = useState({ amount: "" });
  const [isLoading, setIsLoading] = useState(false);
  const lotteryContract = useMemo(() => getLotteryContract(), []);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const txn = await lotteryContract.purchaseToken({
        value: Number(values.amount),
      });
      const receipt = await txn.wait();
      setIsLoading(false);
      console.log(receipt.transactionHash);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="border border-gray-900 p-4 rounded-md">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <p className="text-center font-bold text-xl">Purchase Token</p>
        <div className="flex flex-col mb-2.5">
          <label className="mb-1">Amount (LTO)</label>
          <input
            onChange={handleChange}
            value={values.amount}
            name="amount"
            placeholder="Enter amount of LTO purchase"
            className="border border-gray-700 p-2 rounded"
          />
        </div>
        <button
          className="px-4 py-2.5 border border-gray-800 rounded mb-2"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PurchaseToken;
