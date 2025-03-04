from web3 import Web3

GANACHE_URL = "http://172.16.22.120:8545"
web3 = Web3(Web3.HTTPProvider(GANACHE_URL))

if web3.is_connected():
    print("Connected to Ganache")
else:
    print("Failed to connect")
