import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { SendAndArchiveRounded } from "@mui/icons-material";

type Props = {};

const SearchComponent = (props: Props) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState<String>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let search: String = query.trim();
    // If Block
    if (search.length <= 6) {
      try {
        const blockheight: number = +search;
        const res = await (
          await fetch("http://localhost:5010/blockheaders/height")
        ).json();
        const curr_block_tip = res.message[0].height;
        console.log(curr_block_tip);
        if (blockheight <= curr_block_tip) {
          navigate(`/block/${blockheight}`);
        } else {
          alert("Block not found");
        }
      } catch {}
    } else if (search.length === 34) {
      // base58 Address: 3KixxF1pUzTW39KXm8RJkXTNfvDFr5PLpk, or 112KjS23sQB5hxcn1MziFgimr5LHLoY73f
      if (search.startsWith("1") || search.startsWith("3")) {
        try {
          navigate(`/address/${search}`);
        } catch {
          alert("Invalid Legacy Address");
        }
      }
    } else if (search.length === 42 && search.startsWith("bc1q")) {
      // Bech32 P2WPKH Address: bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4
      try {
        navigate(`/address/${search}`);
      } catch {
        alert("Invalid Bech32 Address");
      }
    } else if (search.length === 62) {
      // Bech32 P2WSH Address: bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7
      // or Taproot address
      if (search.startsWith("bc1q") || search.startsWith("bc1p")) {
        try {
          navigate(`/address/${search}`);
        } catch {
          alert("Invalid Bech32 Address");
        }
      }
    } else if (search.length === 64) {
      // TXID or Blockhash
      try {
        const blockheader = await (
          await fetch(`http://localhost:5010/blockheaders/hash/${search}`)
        ).json();
        if (blockheader.height) {
          navigate(`/block/${blockheader.height}`);
        } else {
          navigate(`/tx/${search}`);
        }
      } catch {
        alert("Invalid TXID or Blockhash");
      }
    } else {
      alert("Invalid search");
    }
    setQuery("");
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
      }}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search the Timechain"
        value={query}
        inputProps={{ "aria-label": "Search for a Block" }}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchComponent;
