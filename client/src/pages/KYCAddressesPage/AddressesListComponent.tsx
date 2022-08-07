import React from 'react'
import { Dispatch, SetStateAction } from "react";
import blockImg from "./cropped_block.png";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Address } from "./AddressesTypes";
import {
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  Box,
} from "@mui/material";
import moment from "moment";
import { resourceUsage } from 'process';

export interface IProps {
    address: Address | undefined;
    setAddress: Dispatch<SetStateAction<Address | undefined>>;
  }

const AddressesListComponent: React.FC<IProps>  = ({address, setAddress}) => {
    const [addresses, setAddresses] = React.useState<Array<Address> | undefined>(undefined);

    React.useEffect(() => {
        (
            async () => {
                const res = await ( await fetch("http://www.localhost:5010/addresses/")).json();
                setAddresses([...res.message]);
            }
        )();
    }, []);
  return (
    <List
      sx={{
        height: "100vh",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
        position: "sticky",
        top: ".25rem",
      }}
    >
      {addresses ? (
        <React.Fragment>
          {addresses.map((address) => (
            <ListItem
              onClick={
                address.address !== address?.address
                  ? () => setAddress(address)
                  : undefined
              }
              sx={
                address.address === address?.address
                  ? { backgroundColor: "primary.main" }
                  : {
                      "&:hover": {
                        backgroundColor: "primary.main",
                        cursor: "pointer",
                      },
                    }
              }
              key={address.address}
            >
              <ListItemAvatar>
                <div>
                  <Box
                    component="img"
                    sx={{
                      height: "50px",
                      width: "auto",
                      mr: ".55rem",
                    }}
                    alt="Block img"
                    src={blockImg}
                  />
                </div>
              </ListItemAvatar>
              <ListItemText
                primary={address.address}
                secondary={address.txid}
              />
            </ListItem>
          ))}
        </React.Fragment>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </List>
  )
}

export default AddressesListComponent