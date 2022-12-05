import { ethers } from "ethers";

import lottery from "../abis/lottery.json";

//  contractAddress: '0xCf62aBAbb99e2a3e46f1fF23c44775C051bb7FF0',
//   paymentTokenAddress: '0xA048FEFA7B3381Eebcf55Df92E863b71Bf3F0DAE'
const getLotteryContract = () => {
  const provider = ethers.getDefaultProvider("goerli");
  //   const wallet = ethers.Wallet.createRandom().connect(provider);
  const wallet = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY ?? "",
    provider
  );
  const lotteryContract = new ethers.Contract(
    "0xCf62aBAbb99e2a3e46f1fF23c44775C051bb7FF0",
    lottery.abi,
    wallet
  );
  return lotteryContract;
};

export default getLotteryContract;
