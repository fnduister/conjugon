import json

verbs = []

with open('src/Data/conjugaisons.json', 'r') as f:
    verbs = json.load(f)

    for verb in verbs:
        verb.pop('_id', None)
        verb.pop('_class', None)

with open('src/Data/conjugaisonCleaned.json', 'w') as w:
    json.dump(verbs, w)
