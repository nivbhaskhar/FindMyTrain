# Storing relevant LA Metro static data as jsons


```python
from collections import defaultdict
import json, requests
import pprint
import math
#from collections import namedtuple
import matplotlib as mpl
import matplotlib.pyplot as plt
plt.style.use('classic')
import numpy as np
import pickle

%matplotlib inline
```

# Loading pickled data


```python
#Open data file with pickled data in read mode (binary format)
static_LAmetro_data_fileobj = open('static_LAmetro_data', 'rb') 

#Get pickled data
static_data = pickle.load(static_LAmetro_data_fileobj)


print(static_data.keys())
```

    dict_keys(['routes', 'stops', 'stop_coordinates_and_distances', 'current_vehicles', 'route_wise_current_vehicles'])



```python
routes = static_data['routes']
stops = static_data['stops']
stop_coordinates_and_distances = static_data['stop_coordinates_and_distances']
current_vehicles = static_data['current_vehicles']
route_wise_current_vehicles = static_data['route_wise_current_vehicles']
```

# Deleting  irrelevant data


```python
pprint.pprint(stop_coordinates_and_distances['801'].keys())
```

    dict_keys(['no_of_stops', 'stop_sequence', 'stop_coordinates', 'stop_distances', 'widths_between_stops', 'heights_between_stops', 'min_consecutive_distance', 'max_consecutive_distance', 'end_to_end', 'scaled_distances'])



```python
for route in stop_coordinates_and_distances:
    del stop_coordinates_and_distances[route]['scaled_distances']
    del stop_coordinates_and_distances[route]['widths_between_stops']
    del stop_coordinates_and_distances[route]['heights_between_stops']
    del stop_coordinates_and_distances[route]['min_consecutive_distance']
    del stop_coordinates_and_distances[route]['max_consecutive_distance']


    
```

# Adding relevant data


```python
for route in routes:
    print(routes[route]['color'])
    for i in range(stop_coordinates_and_distances[route]['no_of_stops']):
        pprint.pprint(stops[route][i]['display_name'])
    print("******")
    
```

    blue
    '7th Street / Metro Center Station - Metro A Line (Blue) & E Line (Expo)'
    'Pico Station'
    'Grand / Lattc Station'
    'San Pedro Street Station'
    'Washington Station'
    'Vernon Station'
    'Slauson Station'
    'Florence Station'
    'Firestone Station'
    '103rd Street / Watts Towers Station'
    'Willowbrook - Rosa Parks Station - Metro A Line (Blue)'
    'Compton Station'
    'Artesia Station'
    'Del Amo Station'
    'Wardlow Station'
    'Willow Street Station'
    'Pacific Coast Hwy Station'
    'Anaheim Street Station'
    '5th Street Station'
    '1st Street Station'
    'Downtown Long Beach Station'
    ******
    red
    'North Hollywood Station'
    'Universal / Studio City Station'
    'Hollywood / Highland Station'
    'Hollywood / Vine Station'
    'Hollywood / Western Station'
    'Vermont / Sunset Station'
    'Vermont / Santa Monica Station'
    'Vermont / Beverly Station'
    'Wilshire / Vermont Station'
    'Westlake / Macarthur Park Station'
    '7th Street / Metro Center Station - Metro Red & Purple Lines'
    'Pershing Square Station'
    'Civic Center / Grand Park Station'
    'Union Station - Metro Red & Purple Lines'
    ******
    green
    'Redondo Beach Station'
    'Douglas Station'
    'El Segundo Station'
    'Mariposa Station'
    'Aviation / Lax Station'
    'Hawthorne / Lennox Station'
    'Crenshaw Station'
    'Vermont / Athens Station'
    'Harbor Freeway Station'
    'Avalon Station'
    'Willowbrook - Rosa Parks Station - Metro Green Line'
    'Long Beach Blvd Station'
    'Lakewood Blvd Station'
    'Norwalk Station'
    ******
    gold
    'Atlantic Station'
    'East La Civic Center Station'
    'Maravilla Station'
    'Indiana Station'
    'Soto Station'
    'Mariachi Plaza / Boyle Heights Station'
    'Pico / Aliso Station'
    'Little Tokyo / Arts District Station'
    'Union Station - Metro Gold Line'
    'Chinatown Station'
    'Lincoln Heights / Cypress Park Station'
    'Heritage Square / Arroyo Station'
    'Southwest Museum Station'
    'Highland Park Station'
    'South Pasadena Station'
    'Fillmore Station'
    'Del Mar Station'
    'Memorial Park Station'
    'Lake Station'
    'Allen Station'
    'Sierra Madre Villa Station'
    'Arcadia Station'
    'Monrovia Station'
    'Duarte / City Of Hope Station'
    'Irwindale Station'
    'Azusa Downtown Station'
    'Apu / Citrus College Station'
    ******
    purple
    'Union Station - Metro Red & Purple Lines'
    'Civic Center / Grand Park Station'
    'Pershing Square Station'
    '7th Street / Metro Center Station - Metro Red & Purple Lines'
    'Westlake / Macarthur Park Station'
    'Wilshire / Vermont Station'
    'Wilshire / Normandie Station'
    'Wilshire / Western Station'
    ******
    cyan
    '7th Street / Metro Center Station - Metro A Line (Blue) & E Line (Expo)'
    'Pico Station'
    'Lattc / Ortho Institute Station'
    'Jefferson / Usc Station'
    'Expo Park / Usc Station'
    'Expo / Vermont Station'
    'Expo / Western Station'
    'Expo / Crenshaw Station'
    'Farmdale Station'
    'Expo / La Brea / Ethel Bradley Station'
    'La Cienega / Jefferson Station'
    'Culver City Station'
    'Palms Station'
    'Westwood / Rancho Park Station'
    'Expo / Sepulveda Station'
    'Expo / Bundy Station'
    '26th Street / Bergamot Station'
    '17th Street / Smc Station'
    'Downtown Santa Monica Station'
    ******



```python
#After comparison
stops_endpoints_direction= {}
for route in routes:
    stops_endpoints_direction[route] = {}
for route in ['801', '802', '803', '804']:
    stops_endpoints_direction[route]['start_id'] = stops[route][0]['id']
    stops_endpoints_direction[route]['start_name'] = stops[route][0]['display_name']
    stops_endpoints_direction[route]['end_id'] = stops[route][-1]['id']
    stops_endpoints_direction[route]['end_name'] = stops[route][-1]['display_name']
    stops_endpoints_direction[route]['is_in_dir_1'] = True
for route in ['805', '806']:
    stops_endpoints_direction[route]['start_id'] = stops[route][-1]['id']
    stops_endpoints_direction[route]['start_name'] = stops[route][-1]['display_name']
    stops_endpoints_direction[route]['end_id'] = stops[route][0]['id']
    stops_endpoints_direction[route]['end_name'] = stops[route][0]['display_name']
    stops_endpoints_direction[route]['is_in_dir_1'] = False   

```


```python
for route in routes:
    print(routes[route]['color'])
    print(stops_endpoints_direction[route]['start_name'])
    print(stops_endpoints_direction[route]['end_name'])
    print("*****")
```

    blue
    7th Street / Metro Center Station - Metro A Line (Blue) & E Line (Expo)
    Downtown Long Beach Station
    *****
    red
    North Hollywood Station
    Union Station - Metro Red & Purple Lines
    *****
    green
    Redondo Beach Station
    Norwalk Station
    *****
    gold
    Atlantic Station
    Apu / Citrus College Station
    *****
    purple
    Wilshire / Western Station
    Union Station - Metro Red & Purple Lines
    *****
    cyan
    Downtown Santa Monica Station
    7th Street / Metro Center Station - Metro A Line (Blue) & E Line (Expo)
    *****


# Storing as json files


```python
json_static_data = {'routes': routes, 'stops': stops , 
                    'stop_coordinates_and_distances':stop_coordinates_and_distances,
                    'stops_endpoints_direction': stops_endpoints_direction}
```


```python
with open('json_static_data.json', 'w') as fp:
    json.dump(json_static_data, fp)
```


```python

```
