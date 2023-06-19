import { ethers } from 'ethers';

//used ether v5.2

const rpcUrl = 'https://bsc-dataseed1.defibit.io'; // Binance Smart Chain RPC URL
const contractAddress = '0xc0ecb8499d8da2771abcbf4091db7f65158f1468'; // $SWTH Token Contract
const addresses = [
  '0xb5d4f343412dc8efb6ff599d790074d0f1e8d430',
  '0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
  '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392',
];

const getTokenBalance=async()=> {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const contract = new ethers.Contract(
      contractAddress,
      require('./ERC20ABI.json'), // Path to the ERC20 Token ABI
      provider
    );

    const tokenBalanceHolder: { address: string; balance: string }[] = [];

    for (const address of addresses) {
      try {
        //getting the balance
        const balance = await contract.balanceOf(address);
        const decimals = await contract.decimals();
        //converting decimal to string
        const formattedBalance = formatBalance(balance, decimals);

        tokenBalanceHolder.push({
          address: address,
          balance: formattedBalance,
        });

      } catch (error) {
        console.error(`Error retrieving balance for address ${address}:`, error);
      }
    }

    return tokenBalanceHolder;
}

function formatBalance(balance: ethers.BigNumber, decimals: number): string {
    const balanceNumber = parseFloat(ethers.utils.formatUnits(balance, decimals));
    const formattedBalance = balanceNumber.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formattedBalance;
}
// Usage
getTokenBalance()
  .then((holders) => {
    console.log('Token Holders:');
    holders.forEach((holder) => {
      console.log(`${holder.address} ${holder.balance}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
