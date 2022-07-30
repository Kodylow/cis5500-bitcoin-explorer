export interface BlockHeader {
  hash: string;
  height: number;
  timestamp: string;
  version: number;
}

export interface Transaction {
  txid: string;
  version: number;
  locktime: number;
  vin: Array<Vin>;
  vout: Array<Vout>;
  size: number;
  weight: number;
  fee: number;
  status: Status;
}

export interface Vin {
  txid: string;
  vout: number;
  prevout: Vout;
  scriptSig: string;
  scriptsig_asm: string;
  is_coinbase: boolean;
  sequence: number;
}

export interface Vout {
  scriptPubKey: string;
  scriptPubKey_asm: string;
  scriptPubKey_type: string;
  scriptPubKey_address: string;
  value: number;
}

export interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}
