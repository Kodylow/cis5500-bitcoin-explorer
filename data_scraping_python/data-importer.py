#imports
import pandas as pd
import requests


#first 10 blocks
url = 'https://blockstream.info/api'
max_block_height = requests.get(url + '/blocks/tip/height').json()
ten_bloacks_url = 'https://blockstream.info/api/blocks/{}'.format(max_block_height)
ten_blocks_data = requests.get(ten_bloacks_url).json()
block_headers = pd.DataFrame.from_dict(ten_blocks_data)


#appending more data to block_headers
max_block_height -= 10
#currently 100 rows are added. can be extended.
for i in range(10):
    url = 'https://blockstream.info/api/blocks/{}'.format(max_block_height)
    ten_blocks_data = requests.get(ten_bloacks_url).json()
    temp_df = pd.DataFrame.from_dict(ten_blocks_data)
    block_headers = pd.concat([block_headers, temp_df], ignore_index=True)
    max_block_height -= 10


#creating coinbase_txs
coinbase_txs = pd.DataFrame(columns=['txid', 'block_hash', 'version', 'locktime', 'outputs'])
#list used to get addresses
address_list = []
for hash in list(block_headers.id):
    txid = requests.get('https://blockstream.info/api/block/{}/txids'.format(hash)).json()[0]
    coinbase_data = requests.get('https://blockstream.info/api/tx/{}'.format(txid)).json()
    new_row = [coinbase_data['txid'], coinbase_data['status']['block_hash'], coinbase_data['version'], coinbase_data['locktime'], coinbase_data['vout']]
    coinbase_txs.loc[len(coinbase_txs.index)] = new_row
    address_list.append(coinbase_data['vout'][0]['scriptpubkey_address'])