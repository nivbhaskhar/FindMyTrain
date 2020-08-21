import {no_of_stops,stop_coordinates, stop_distances, route_index, dir} from  '/constants.js';

document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#current_trains_api').onclick = current_trains_api_part.bind(this, "dummy");
    document.querySelector('#test_output_box').innerHTML = "Output data goes here";
    


});

function current_trains_api_part(canvas){

    
    fetch('https://api.metro.net/agencies/lametro-rail/vehicles/')
	.then(
            //Get data. Catch request errors
	    function(response){
		if (!response.ok) {
		    throw new Error(`HTTP error! status: ${response.status}`);
		}	
		else {
		    return response.json();
		}
	    })
        .then(
            //Do initial API data processing
	    function(initial_data){
		var current_vehicles=[];
		for (let index = 0; index < initial_data.items.length; index++)
		{
		    let vehicle = initial_data.items[index];
		    if (vehicle.predictable){
			current_vehicles.push(vehicle);
		    }
		}
		//Catch Error - no vehicles
		if (initial_data.items.length==0){
		    throw new Error("No current predictable vehicles");
		}
		else{return current_vehicles;}
	    })
	.then(process_current_vehicle_data)
	.catch(e => {
	    alert('There has been a problem with your fetch operation: ' + e.message);
	});
    


}


// Element of current_vehicles looks like {"seconds_since_report":9,"predictable":true,"id":"204","longitude":-118.285589,"run_id":"805_1_var0","heading":270,"latitude":34.061904,"route_id":"805"}
// Want element of plot_data to look like  {'route_index':0/1/2/3/4/5, 'dir':0/1, 'nearest_stop': r, 'd': 0<d<1}

function process_current_vehicle_data(current_vehicles){
    var plot_data = [];
    for (let vehicle_index = 0;vehicle_index <current_vehicles.length; vehicle_index ++){
	let vehicle=current_vehicles[vehicle_index];
	let adj_station_details = find_adjacent_stations([vehicle.latitude, vehicle.longitude],route_index[vehicle.route_id]);

	if (adj_station_details[0]!=null){
	    
	    let vehicle_plot_data = { 'route_index': route_index[vehicle.route_id],
				  'dir': dir[vehicle.run_id[4]],
				  'nearest_stop': adj_station_details[0],
				  'd': adj_station_details[1]/stop_distances[route_index[vehicle.route_id]][adj_station_details[0]]
				    };
	    plot_data.push(vehicle_plot_data);
	}
	
    }

document.querySelector('#test_output_box').innerHTML = JSON.stringify(plot_data);
return plot_data;

}




function find_adjacent_stations(point,route_index){
    var orthogonal_dist=Math.pow(10, 1000);
    var d=null;
    var not_in_betweens = [];
    var prev_adj_station = null;
    for (var pos=0; pos < no_of_stops[route_index]-1; pos ++){
	let start_station = stop_coordinates[route_index][pos];
	let end_station =  stop_coordinates[route_index][pos+1];
	let dist_bet_stations = stop_distances[route_index][pos];
	let orthogonal_projection_details = orthogonal_projection(point,start_station,end_station, dist_bet_stations);

	if (orthogonal_projection_details[0]){
	    if (orthogonal_projection_details[1]<=orthogonal_dist){
		orthogonal_dist=orthogonal_projection_details[1];
		d=orthogonal_projection_details[2];
		prev_adj_station = pos;
	    }    	    
	}
	else{not_in_betweens.push(pos);	}
    }
    if (prev_adj_station==null){
	d=Math.pow(10,1000);
	for(var i=0; i<not_in_betweens.length;i++){
	    let temp_station_x = stop_coordinates[route_index][not_in_betweens[i]][0];
	    let temp_station_y = stop_coordinates[route_index][not_in_betweens[i]][1];
	    let distance = Math.sqrt(Math.pow(temp_station_x-point[0],2) + Math.pow(temp_station_y-point[1],2));
	    if (distance < d){
		d = distance
		prev_adj_station = not_in_betweens[i];
	    }
	} 
    }

    return [prev_adj_station, d]

    
    
}


function orthogonal_projection(point, start_station, end_station, dist_bet_stations){
    //Translate by - start_station
    var new_end = [end_station[0]-start_station[0], end_station[1]-start_station[1]];
    var new_point = [point[0]-start_station[0], point[1]-start_station[1]];
    //var unit_vector_along_stations = [new_end[0]/dist_bet_stations, new_end[1]/dist_bet_stations];
    var signed_length_of_projection = (new_point[0]*new_end[0] + new_point[1]*new_end[1])/dist_bet_stations;
    var in_opp_direction = (signed_length_of_projection < 0);
    if (in_opp_direction){
	var is_in_between = false;
    }
    else{
	var is_in_between = (signed_length_of_projection<dist_bet_stations);        

    }
    var new_projection_point = [(signed_length_of_projection*new_end[0]/dist_bet_stations),
			    (signed_length_of_projection*new_end[1]/dist_bet_stations)];
    var orthogonal_distance = Math.sqrt(Math.pow(new_point[0]-new_projection_point[0],2) + Math.pow(new_point[1]-new_projection_point[1],2));
    return [is_in_between, orthogonal_distance, signed_length_of_projection]

}




