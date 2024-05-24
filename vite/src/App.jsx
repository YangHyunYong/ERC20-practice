import { useEffect, useState } from "react";
import MetamaskButton from "./components/MetamaskButton";
import Erc20Connect from "./components/Erc20Connect";

const App = () => {
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();

  const getNameSymbol = async () => {
    try {
      const nameResponse = await contract.name();
      const symbolResponse = await contract.symbol();

      setName(nameResponse);
      setSymbol(symbolResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!contract) return;

    getNameSymbol();
  }, [contract]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-16">
      <MetamaskButton signer={signer} setSigner={setSigner}></MetamaskButton>
      {signer && (
        <div className="mt-16 flex flex-col gap-8 grow max-w-xl w-full">
          <div className="box-style text-center">
            0x18393DAce171F8bADF5d0b9E0316d548D1072cE5
          </div>
          <Erc20Connect
            setContract={setContract}
            name={name}
            symbol={symbol}
            signer={signer}
          ></Erc20Connect>
        </div>
      )}
    </div>
  );
};

export default App;
