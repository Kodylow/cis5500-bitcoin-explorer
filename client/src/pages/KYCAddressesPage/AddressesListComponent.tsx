import React from 'react'
import { Dispatch, SetStateAction } from "react";
import { Address } from "../../types/BitcoinTypes";
import {
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  SvgIcon,
} from "@mui/material";
import QrCode2Icon from '@mui/icons-material/QrCode2';

export interface IProps {
    address: Address | undefined;
    setAddress: Dispatch<SetStateAction<Address | undefined>>;
  }

const AddressesListComponent: React.FC<IProps>  = ({address, setAddress}) => {
    const [addresses, setAddresses] = React.useState<Array<Address> | undefined>(undefined);

    React.useEffect(() => {
        (
            async () => {
                const res = await ( await fetch("http://www.localhost:5010/address/addresses")).json();
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
          {addresses.map((addr) => (
            <ListItem
              onClick={
                addr.address !== address?.address
                  ? () => setAddress(addr)
                  : undefined
              }
              sx={
                addr.address === address?.address
                  ? { backgroundColor: "primary.main" }
                  : {
                      "&:hover": {
                        backgroundColor: "primary.main",
                        cursor: "pointer",
                      },
                    }
              }
              key={addr.address}
            >
              <ListItemAvatar>
                <SvgIcon component={QrCode2Icon} sx={{fontSize: '2rem'}}></SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={addr.address}
              />
            </ListItem  >
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
