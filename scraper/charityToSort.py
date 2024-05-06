import json

with open("data.json", "r") as file:
    json_string = file.read()

json_list = json.loads(json_string)


filtered_data = filter(lambda obj: sum(
    1 for value in obj.values() if value['value'] is None) <= 5, json_list)


result = list(filtered_data)

print(len(result))
for item in result:
    print(item["name"]["value"])
