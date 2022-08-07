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
import { Address } from "./AddressesTypes";
type Props = {}

export interface IAddressesPageProps {}

const KYCAddressesPage: React.FC<IAddressesPageProps> = (props: Props) => {
  const [address, setAddress] = React.useState<Address | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const [pageTXs, setPageTXs] = React.useState<Array<string>>([]);
  const [txids, setTxids] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    async () => {
      
    }
  })
  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <AddressesListComponent address={address} setAddress={setAddress} />
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
            {address ? "Block " + address.address : "Loading..."}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default KYCAddressesPage