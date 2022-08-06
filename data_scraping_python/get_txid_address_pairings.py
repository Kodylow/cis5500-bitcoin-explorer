import requests
import pandas as pd
import os
import time
from sqlalchemy import create_engine

# env variables for postgres connection
pg_user = os.environ['postgres_user']
pg_host = os.environ['postgres_host']
pg_db = os.environ['postgres_database']
pg_pwd = os.environ['postgres_password']

engine = create_engine(
    f'postgresql://{pg_user}:{pg_pwd}@{pg_host}:5432/{pg_db}')

# reading CSV file
data = pd.read_csv("big_btc_addresses.csv")

# converting column data to list
addresses = data['addresses'].tolist()

# Loop through addresses
for address in addresses:
    # Get first batch of txs for each address
    print('address: ', address)
    addr_txids = []
    try:
        txs = requests.get(
            'http://www.blockstream.info/api/address/' + address + '/txs').json()
    except:
        continue
    # Append to addr_txs list
    [addr_txids.append({'txid': tx['txid'], 'address': address}) for tx in txs]

    # If there's more txs than the 25, loop getting txs
    while (len(txs) > 0 and len(txs) % 25 == 0):
        time.sleep(2)
        print('in while', len(addr_txids))
        try:
            txs = requests.get('http://www.blockstream.info/api/address/' +
                               address + '/txs/chain/' + addr_txids[-1]['txid']).json()
        except:
            break
        for tx in txs:
            addr_txids.append({'txid': tx['txid'], 'address': address})
    print('tx_count:', len(addr_txids))

    df = pd.DataFrame(addr_txids)
    sql = df.to_sql(name='txidaddress', con=engine,
                    schema='bitcoin', if_exists='append', index=False)
