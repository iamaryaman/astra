for project Automated Speaking TRAcker project. Please make new branches if u commit your work

1. git pull this repo, ill accept ur pull request
2. go to the main branch of the main branch ("git checkout main" i think or sm like that i forgot), make sure the HEAD is there
3. make a new branch with "git branch new_name"
4. "git add" your shit
5. "git commit -m msg"
6. "git push origin your_repo" (if u are already on that repo i dont think u have to classify the your_repo, but its okay)
--

Automatic Safety TRAcker (ASTRA)

During the Ujjain Mahakumbh Event, there may be children, elderly, or disabled people who could lose their way. To aid with this problem, we are developing a wearable device which will aid the person to locate the nearby lost and found center via a Speaker.
This wearable device will be powered by Hardware like
-	A9G for GPS 
- 	ESP32 Microcontroller
- 	Speaker Module (TBD)
-	TTS Module (TBD)
We can inculcate many different software architectures for this model.
1.	Take the NMEA Data from the NEO-6M and extract the Latitudes and Longitudes from it.
2.	 Pull the CSV Datafile and find the nearest location of a center using
a.	 Finding the distance of the center using Haversine formula 
b.	Finding Nearest Center
c.	Course over ground data from the NEO-6M will be used to analyze the True North and then be able to tell in accessible languages. 
3.	To guide the person we can use either two ways (TBD)
a.	Using a micropy python library to find all the nodes and guide the person
b.	Using a Dijkstra’s Algorithm to find the shortest route between starting point and ending point using an offline map of Ujjain Mahakumbh event. 
4.	The direction’s text that will be outputted from the Algorithm/API, will be fed into our Text to Speech Module. 
5.	 The Text to Speech module will output the Directions.
Future Prospects:
-	Hybrid Connection of the Device so that it can connect to the internet as soon as it reaches an end point and can relay the given data to the app for which the guardians/friends can access it
-	Miniaturization 
Problems: 
-	GPS locking in crowded Areas.
-	Reliability 
-	Location of Child on the app might have some issues if the Loss and Found centers don’t have WiFi capacity for our dynamic model.

