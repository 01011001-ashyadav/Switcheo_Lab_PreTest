const { ethers } = require("ethers");

const ADDR = "0xa131AD247055FD2e2aA8b156A11bdEc81b9eAD95";   // your contract address
console.log(ADDR.length)
const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "tokenAddresses",
				"type": "address[]"
			}
		],
		"name": "getBalances",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];    // your contract ABI
    

    // Generate a random wallet address
const wallet = ethers.Wallet.createRandom();
const ADDRESS = wallet.address;
    
    // Generate sample token contract addresses
const TOKENS = [
  "0x123d475e13aa54a43a7421d94caa4459da021c77",
  "0x55f6823de9642f47e80ed4845a55aa8430cb4ec6",
  "0x789aabbccddeeff00112233445566778899aabb",
];



const provider = ethers.providers.getDefaultProvider();
const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);
	console.log(contract)
    const balances = await contract.getBalances(ADDRESS, TOKENS);
        
    return balances;
    };

test().then(console.log);