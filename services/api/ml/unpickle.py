import json
import sys
import pickle

with open(sys.argv[1], 'rb') as f:
    print(json.dumps(pickle.load(f), ensure_ascii=False))
