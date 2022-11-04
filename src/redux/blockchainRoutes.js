export const contract = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      usdtContract: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      usdcContract: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      busdContract: '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
      daiContract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      nudaraMinter: '0xE27BF39A8BfE3755b5d4C52FC28eba5ADC2d3218',
      RPC_URL: 'https://rpc-mumbai.maticvigil.com/',
    };
  }

  if (process.env.NODE_ENV === 'production') {
    return {
      usdtContract: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      usdcContract: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      busdContract: '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
      daiContract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      nudaraMinter: '0xD35E7f9e364C5bC14DC75e1651b8Bb5B4eB2a3F4',
      RPC_URL: 'https://polygon-rpc.com/',
    };
  }
};
