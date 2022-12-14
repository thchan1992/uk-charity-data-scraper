import json


with open("data.json", "r") as file:
    json_string = file.read()


# Parse the JSON string and convert it to a Python list
json_list = json.loads(json_string)


# arr = []


# for item in json_list:
#     if json_list.index(item) < 10:
#         arr.append({"name": item["name"]["value"], "id": item["id"]["value"]})


# with open('nameList.json', 'w', encoding='utf-8') as f:
#     json.dump(arr, f, ensure_ascii=False, indent=4)


# Use a filter function to remove objects with more than 5 null values
filtered_data = filter(lambda obj: sum(
    1 for value in obj.values() if value['value'] is None) <= 5, json_list)

# Print the filtered data

result = list(filtered_data)

print(len(result))
for item in result:
    print(item["name"]["value"])
