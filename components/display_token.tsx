import { useEffect, useMemo, useState } from "react";
import BigNumber from "bignumber.js";

import getTokenContract from "../utils/get-token-contract";

const DisplayToken = () => {
  const [balance, setBalance] = useState(new BigNumber(0));

  const token = useMemo(async () => await getTokenContract(), []);

  //   useEffect(() => {
  //     (async function () {
  //       const balanceBN = await token.balanceOf(accounts[Number(index)].address);
  //     })();
  //   }, []);

  //   const balanceBN = await token.balanceOf(accounts[Number(index)].address);
  //   const balance = ethers.utils.formatEther(balanceBN);
  //   console.log(
  //     `The account of address ${accounts[Number(index)]} has ${balance} LTO\n`
  //   );

  return (
    <div className="border border-gray-900 p-4 rounded-md">
      <p>Token Balance:</p>
      <p>{balance.toFixed(2)} LTO</p>
    </div>
  );
};

export default DisplayToken;
