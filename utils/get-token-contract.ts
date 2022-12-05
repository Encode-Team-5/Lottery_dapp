import { ethers } from "ethers";

import getLotteryContract from "./get-lottery-contract";

//  contractAddress: '0xCf62aBAbb99e2a3e46f1fF23c44775C051bb7FF0',
//   paymentTokenAddress: '0xA048FEFA7B3381Eebcf55Df92E863b71Bf3F0DAE'
const getTokenContract = async () => {
  const contract = getLotteryContract();
  const paymentTokenAddress = await contract.paymentToken();
  const provider = ethers.getDefaultProvider("goerli");
  const wallet = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY ?? "",
    provider
  );
  //   const contractFactory = new ethers.ContractFactory();
  const token = contract.attach(paymentTokenAddress).connect(wallet);
  return token;
};

export default getTokenContract;
