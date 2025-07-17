import csv 
import requests
import json

def dataset_list(search):
    File = open("dataset.csv","r",newline="")
    csv_reader = csv.reader(File)
    for i in csv_reader:
        if i[3] == search:
            focused_list = i
            return focused_list
            break
            
def get_route_instructions(start_lat, start_lon, dest_lat, dest_lon):
    api_url = f"https://router.osrm.org/route/v1/driving/{start_lon},{start_lat};{dest_lon},{dest_lat}?steps=true"

    print("\nFetching directions...")
    print(f"Attempting to connect to: {api_url}")

    try:
        response = requests.get(api_url, timeout=15)
        response.raise_for_status()
        data = response.json()

        if data.get('code') != 'Ok':
            print(f"API returned an error: {data.get('message', 'Unknown error')}")
            return []
        
        route = data['routes'][0]
        legs = route['legs'][0]
        steps = legs['steps']

        instructions = []
        print("Route found!")
        print("-" * 20)
        
        # the instructions for the user
        for i, step in enumerate(steps):
            maneuver = step['maneuver']
            instruction_text = maneuver['instruction']
            distance_meters = step['distance']
            # Convert distance to a more readable format (km)
            distance_km = round(distance_meters / 1000, 2)
            
            full_instruction = f"{i+1}. {instruction_text} (for {distance_km} km)"
            instructions.append(full_instruction)

        return instructions

    except requests.exceptions.Timeout:
        print("The request timed out. The server might be too slow or unreachable.")
        return []
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        print(f"The server returned an error. Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        return []
    except requests.exceptions.RequestException as e:
        print(f"A network error occurred: {e}")
        return []
    except json.JSONDecodeError:
        print("Failed to decode the server's response as JSON.")
        print(f"This usually means the server returned an error page or an empty response.")
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        return []
    except (KeyError, IndexError):
        print("Could not parse the route from the API response. The data format may have changed.")
        return []
    

if __name__ == "__main__":
    user_lat = None
    user_long = None #to be fed using neo6m
    search = str=input("Enter the place where you want to go")
    destination = dataset_list(search) #this to be replaced with the algorithm of finding the closest to the longitude and latitude
    for elb in destination:
        selected_lat = elb[1]
        selected_long = elb[2]
    

    route_steps = get_route_instructions(
        user_lat,
        user_long,
        selected_lat,
        selected_long
    )

    if route_steps:
        print("\n--- Your Directions ---")
        for step in route_steps:
            print(step)
        print("\n--- End of Directions ---") # 
    else:
        print("\nCould not retrieve directions. Please check the error messages above and try again.")