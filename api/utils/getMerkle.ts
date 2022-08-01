import axios, { AxiosResponse } from "axios";

const getMerkle = async (txid: String) => {
  let merkleResponse: AxiosResponse = await axios.get(
    `https://blockstream.info/api/tx/${txid}/merkle-proof`
  );
  let merkle = merkleResponse.data;

  return merkle;
};

export default getMerkle;
