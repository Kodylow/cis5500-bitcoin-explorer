import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Typography,
  Box,
} from "@mui/material";
import React from 'react'
import AddressesListComponent from "./AddressesListComponent";
import AddressTxsComponent from "./AddressTxsComponent";
import AddressInfoComponent from "./AddressInfoComponent";
import { Address } from "./AddressesTypes";
type Props = {}

export interface IAddressesPageProps {}

const KYCAddressesPage: React.FC<IAddressesPageProps> = (props: Props) => {
  const [addr, setAddress] = React.useState<Address | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const [pageTXs, setPageTXs] = React.useState<Array<string>>([]);
  const [txids, setTxids] = React.useState<Array<string>>([]);

  // Set the initial address to the first address
  React.useEffect(() => {
    (async () => {
      const res = await (
        await fetch(`http://www.localhost:5010/address/topaddress`)
      ).json();
      const data: Address = res.message[0];
      setAddress(data);
    })();
  }, []);

  React.useEffect(() => {
    if (addr !== undefined) {
      (async () => {
        const url = `http://www.localhost:5010/address/${addr.address}/txids`;
        let res = await fetch(url);
        let data = await res.json();
        setTxids([...data.message]);
        setPageTXs([...data.message.slice(0, 25)]);
      })();
    } else {
      setTxids([]);
    }
  }, [addr]);


  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <AddressesListComponent address={addr} setAddress={setAddress} />
      </Grid>
      <Grid item xs={10} sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginRight: "auto",
            marginLeft: "auto",
            alignItems: "center",
            mt: "2rem",
          }}
        >
          <Typography variant="h3" align="center" alignItems="center">
            {addr ? addr.address : "Loading..."}
          </Typography>
        </Box>
        <AddressInfoComponent address={addr} />
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: "1rem" }}>
              Address Transactions
            </Typography>
            <Pagination
              count={Math.ceil(txids.length / 25)}
              color="primary"
              page={page}
              onChange={(event, value) => {
                setPage(value);
                setPageTXs([...txids.slice((value - 1) * 25, value * 25)]);
              }}
            />
            <AddressTxsComponent txids={pageTXs} page={page} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default KYCAddressesPage