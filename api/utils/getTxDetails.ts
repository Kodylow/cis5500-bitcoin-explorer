import axios, { AxiosResponse } from "axios";

const getTxDetails = async (txid: String) => {
  let txDetailResponse: AxiosResponse = await axios.get(
    `https://blockstream.info/api/tx/${txid}`
  );
  let txDetail = txDetailResponse.data;

  return txDetail;
};

export default getTxDetails;
