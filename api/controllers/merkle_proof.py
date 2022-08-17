import hashlib
import sys
import json

def sha256(x):
    return bytes(hashlib.sha256(x).digest())

def sha256d(x):
    out = bytes(sha256(sha256(x)))
    return out

def hash_decode(x):
    return bytes.fromhex(x)[::-1]

def hash_merkle_root(d):
    tx_hash = d[0]
    merkle_branch = d[1]
    index = d[2]
    """Return calculated merkle root."""
    h = hash_decode(tx_hash)
    merkle_branch_bytes = [hash_decode(item) for item in merkle_branch]
    data = {'name': tx_hash, 'children': [], 'key': tx_hash}
    for item in merkle_branch_bytes:
        if (index & 1): 
          inner_node = (item + h)
          h = sha256d(inner_node)
          data = {
              'name': "",
              'children': [
                data,
                {
                  'name': item[:3].hex() + '...' + item[-3:].hex(),
                },
              ],
            } 
        else:
          inner_node = (h + item)
          h = sha256d(inner_node)
          data = {
              'name': h[:3].hex() + '...' + h[-3:].hex(),
              'key': h[:3].hex() + '...' + h[-3:].hex(),
              'children': [
                {
                  'name': item[:3].hex() + '...' + item[-3:].hex(),
                  'key': item[:3].hex() + '...' + item[-3:].hex(),
                },
                data,
              ],
            }
        
        index >>= 1

    
    return json.dumps({
      'calculated_merkle_root': h[::-1].hex(),
      'tree': data,
    })

print(hash_merkle_root(json.loads(sys.argv[1])))
sys.stdout.flush()