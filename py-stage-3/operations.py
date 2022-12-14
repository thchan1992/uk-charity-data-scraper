import re
multipliers = {"k": 1000, "m": 1000000, "bn": 1000000000}


def split_str(s):
    return s.split(':')[1].strip()


def fromAbbreviated(string):
    if string == None:
        return None
    string = string.replace("£", "").replace(",", "")
    if string[-1].isdigit():
        return int(string)
    try:
        mult = multipliers[string[-1]]
        return int(float(string[:-1]) * mult)
    except:
        mult = multipliers[string[-2]+string[-1]]
        return int(float(string[:-2]) * mult)


def numExtractor(my_str):
    if my_str == None:
        return None
    return re.sub(r'[^0-9]', '', my_str)


def errorCounter(prop, arr):
    count = len([p for p in arr if p[prop]['value'] ==
                None])
    print(prop + ": ")
    print(count)
    return count


def getErrCharity(arr):
    for i in arr:
        if i['incomeDonationsAndLegacies']['value'] is None:
            print(i['id']['value'])
