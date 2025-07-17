import requests
import json

def dataset_list():
    """
    Returns a pre-defined list of destinations with their names,
    latitudes, and longitudes.
    """
    return [
        {"name": "Eiffel Tower, Paris", "lat": 48.8584, "lon": 2.2945},
        {"name": "Statue of Liberty, New York", "lat": 40.6892, "lon": -74.0445},
        {"name": "Colosseum, Rome", "lat": 41.8902, "lon": 12.4922},
        {"name": "Sydney Opera House", "lat": -33.8568, "lon": 151.2153},
        {"name": "Taj Mahal, India", "lat": 27.1751, "lon": 78.0421},
    ]

def get_route_instructions(start_lat, start_lon, dest_lat, dest_lon):
    """
    Fetches route instructions from the OSRM (Open Source Routing Machine) API.

    Args:
        start_lat (float): Starting latitude.
        start_lon (float): Starting longitude.
        dest_lat (float): Destination latitude.
        dest_lon (float): Destination longitude.

    Returns:
        list: A list of strings, where each string is a turn-by-turn instruction.
              Returns an empty list if an error occurs.
    """
    # 3. Leverage an API to map the path out
    # Construct the API URL for the OSRM routing service using HTTPS.
    api_url = f"https://router.osrm.org/route/v1/driving/{start_lon},{start_lat};{dest_lon},{dest_lat}?steps=true"

    print("\nFetching directions...")
    print(f"Attempting to connect to: {api_url}")

    try:
        # Set a timeout for the request (e.g., 15 seconds)
        response = requests.get(api_url, timeout=15)
        # Raise an exception for bad status codes (4xx or 5xx)
        response.raise_for_status()
        
        # Attempt to decode the JSON response
        data = response.json()

        if data.get('code') != 'Ok':
            print(f"API returned an error: {data.get('message', 'Unknown error')}")
            return []

        # Extract the turn-by-turn instructions from the response
        route = data['routes'][0]
        legs = route['legs'][0]
        steps = legs['steps']

        instructions = []
        print("Route found!")
        print("-" * 20)
        
        # 4. Write down the instructions for the user
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
    destinations = dataset_list()

    print("Welcome to the Route Planner!")
    print("Please select a destination from the list below:")
    for i, dest in enumerate(destinations):
        print(f"  {i + 1}: {dest['name']}")

    choice = -1
    while choice < 1 or choice > len(destinations):
        try:
            choice_input = input(f"Enter a number (1-{len(destinations)}): ")
            choice = int(choice_input)
        except ValueError:
            print("Invalid input. Please enter a number.")
    
    selected_destination = destinations[choice - 1]

    print(f"\nYou have selected: {selected_destination['name']}")

    print("\nPlease provide your current location.")
    user_lat = None
    user_lon = None
    
    while user_lat is None:
        try:
            lat_input = input("Enter your current Latitude (e.g., 40.7128): ")
            user_lat = float(lat_input)
        except ValueError:
            print("Invalid latitude. Please enter a valid number.")

    while user_lon is None:
        try:
            lon_input = input("Enter your current Longitude (e.g., -74.0060): ")
            user_lon = float(lon_input)
        except ValueError:
            print("Invalid longitude. Please enter a valid number.")

    route_steps = get_route_instructions(
        user_lat,
        user_lon,
        selected_destination['lat'],
        selected_destination['lon']
    )

    if route_steps:
        print("\n--- Your Directions ---")
        for step in route_steps:
            print(step)
        print("\n--- End of Directions ---")
    else:
        print("\nCould not retrieve directions. Please check the error messages above and try again.")
