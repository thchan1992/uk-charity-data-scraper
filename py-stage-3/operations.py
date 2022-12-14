

import re
multipliers = {"k": 1000, "m": 1000000, "bn": 1000000000}


def fromAbbreviated(string):
    print(string)
    if string == None:
        return None
    string = string.replace("£", "").replace(",", "")
    print(string)
    if string[-1].isdigit():
        return int(string)
    try:
        mult = multipliers[string[-1]]
        return int(float(string[:-1]) * mult)
    except:
        print(string)
        mult = multipliers[string[-2]+string[-1]]
        return int(float(string[:-2]) * mult)


def numExtractor(my_str):
    if my_str == None:
        return None
    return re.sub(r'[^0-9]', '', my_str)
