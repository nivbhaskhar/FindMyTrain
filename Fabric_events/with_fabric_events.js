const route_colors = ['blue', 'red', 'green', 'gold', 'purple', 'cyan'];
const route_numbers = [801, 802, 803, 804, 805, 806];
const route_names = ['A', 'B', 'C', 'L', 'D', 'E'];
const no_of_stops = [21,14,14,27,8,19]
const dist_bet_stops = 800/20;
const start_stops = [[2,'   Long','  Beach'], [2,'   North','Hollywood'], [1,'Redondo', ''],
		     [1,' Atlantic', ''], [2,'Wilshire/','Western'], [2,'  Santa',' Monica']];
const end_stops = [[2,'    7th/','  Metro'], [1,'','  Union'], [1,'',' Norwalk'],
		   [2,'   APU/','  Citrus'], [1,'','  Union'], [2,'    7th/', '  Metro']];


const stops = [['Downtown Long Beach', '1st', '5th', 'Anaheim', 'Pacific Coast Hwy', 'Willow', 'Wardlow', 'Del Amo', 'Artesia', 'Compton', 'Rosa Parks', '103rd/Watts Towers', 'Firestone', 'Florence', 'Slauson', 'Vernon', 'Washington', 'San Pedro', 'Grand/Lattc', 'Pico', '7th/Metro Center'],
	       ['N. Hollywood', 'Universal/Studio City', 'Hollywood/Highland', 'Hollywood/Vine', 'Hollywood/Western', 'Vermont/Sunset', 'Vermont/Santa Monica', 'Vermont/Beverly', 'Wilshire/Vermont', 'Westlake/Macarthur Park', '7th/Metro Center', 'Pershing Sq', 'Civic Center/Grand Park', 'Union'],
	       ['Redondo', 'Douglas', 'El Segundo', 'Mariposa', 'Aviation/LAX', 'Hawthorne/Lennox', 'Crenshaw', 'Vermont/Athens', 'Harbor Freeway', 'Avalon', 'Rosa Parks', 'Long Beach Blvd', 'Lakewood Blvd', 'Norwalk'],
	       ['Atlantic', 'East La Civic Center', 'Maravilla', 'Indiana', 'Soto', 'Mariachi Plaza/Boyle Hts', 'Pico / Aliso', 'Little Tokyo/Arts District', 'Union', 'Chinatown', 'Lincoln Hts/Cypress Park', 'Heritage Sq/Arroyo', 'Southwest Museum', 'Highland Park', 'South Pasadena', 'Fillmore', 'Del Mar', 'Memorial Park', 'Lake', 'Allen', 'Sierra Madre Villa', 'Arcadia', 'Monrovia', 'Duarte/City Of Hope', 'Irwindale', 'Azusa Downtown', 'APU/Citrus'],
	       ['Wilshire/Western', 'Wilshire/Normandie', 'Wilshire/Vermont', 'Westlake/Macarthur Park', '7th/Metro', 'Pershing Sq', 'Civic Center/Grand Park', 'Union'],
	       ['Santa Monica', '17th/SMC', '26th/Bergamot', 'Expo/Bundy', 'Expo/Sepulveda', 'Westwood/Rancho Park', 'Palms', 'Culver City', 'La Cienega/Jefferson', 'Expo/ La Brea/Ethel Bradley', 'Farmdale', 'Expo/Crenshaw', 'Expo/Western', 'Expo/Vermont', 'Expo Park/USC', 'Jefferson/USC', 'Lattc/Ortho', 'Pico', '7th/Metro']
	      ]


	

document.addEventListener('DOMContentLoaded', function() {
    //draw static train-tracks
    var ctx = document.getElementById('trains_tracks').getContext('2d');
    draw_train_tracks(ctx);

    //Fabric canvas
    var canvas = new fabric.Canvas('trains',
				   {selection: false,
				    controlsAboveOverlay: true,
				    centeredScaling: true,
				       allowTouchScrolling: true});
    canvas.selection = false;
    canvas.hoverCursor = 'pointer';
    


    //Add Mouseover event to see stop names

    for (let i=0 ; i < route_numbers.length ; i++){
	for (let j=0; j<2; j++){
	    for (let k=0; k < no_of_stops[i]; k++){
		let stop = train_stop(i,j,k,10);
		canvas.add(stop);
		stop.on({'mouseover': display_stop_name.bind(null,stop.name),
			 'mouseup': display_stop_name.bind(null,stop.name),
			 'mouseout':clear_field.bind(null) });
		
	    }
	}
	
     }               
    
    

    
    //Draw arbit engines    
    for (let i=0 ; i < route_numbers.length ; i++){
	let left_engine = engine_icon(50+30*1 + (2*i)*100-10,110+3*(dist_bet_stops),`left-engine-${i}`);
	console.log(left_engine.name);

	let right_engine = engine_icon(50+30*(-1) + (2*i+1)*100-10,110+4*(dist_bet_stops),`right-engine-${i}`);
	canvas.add(left_engine);
	canvas.add(right_engine);
	left_engine.on('mouseup', function()
		       {
			   document.querySelector('#engine_details').innerHTML = left_engine.name;
		       });
	right_engine.on('mouseup', function()
		       {
			   document.querySelector('#engine_details').innerHTML = right_engine.name;
		       });

    }

    
});


function display_stop_name(stop_name) {
    document.querySelector('#stop_details').innerHTML = stop_name;
}

function clear_field() {
    document.querySelector('#stop_details').innerHTML = '';
		}
		

function train_stop(train_index,dir_index,stop_index,rad){

    
 
    var stop = new fabric.Circle({
	radius:rad,
	fill: 'rgba(0,0,0,0)',
	left: 39.5+((2*train_index)+dir_index)*100,
	top:99.5+(stop_index*dist_bet_stops),
	hasControls : false,
	hasBorders : false,
	selectable : false,
	evented : true,
	name : stops[train_index][stop_index],
	lockMovementX : true,
	lockMovementY : true,
	lockScalingY : true,
	lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true


    });

   return stop

}

function engine_icon(x,y,engine_name)
{
    //train icon

    var train_main = new fabric.Rect({
	width: 20,
	height: 25,
	left: x,
	top: y,
	fill: 'black',
	rx: 4,
	ry: 4,
	hasControls : false,
	hasBorders : false,
	selectable : false,
	evented : true,
	name : `${engine_name}_main`,
	lockMovementX : true,
	lockMovementY : true,
	lockScalingY : true,
	lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true
	


    });

    var train_part = new fabric.Rect({
	width: 20,
	height: 11,
	left: x,
	top: y+7,
	fill: 'rgb(217, 217, 217)',
	hasControls : false,
	hasBorders : false,
	selectable : false,
	evented : true,
	name :  `${engine_name}_part`,
	lockMovementX : true,
	lockMovementY : true,
	lockScalingY : true,
	lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true
	


    });
 
  //train headlight
    var train_headlight = new fabric.Circle({
	radius:2,
	fill: 'yellow',
	left: x+7.5,
	top:y+2.5,
	hasControls : false,
	hasBorders : false,
	selectable : false,
	evented : true,
	name :  `${engine_name}_headlight`,
	lockMovementX : true,
	lockMovementY : true,
	lockScalingY : true,
	lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true

    });


    var engine = new fabric.Group([train_main, train_part, train_headlight],{
  left:x,
  top:y,
    subTargetCheck: true,
    hasControls : false,
    hasBorders : false,
    selectable : false,
    evented : true,
    lockMovementX : true,
    lockMovementY : true,
    lockScalingY : true,
    lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true,
		name :  `${engine_name}`,
	
    
 });

    return engine;

}








    function draw_train_tracks(ctx) {
	//var route_colors = ['blue', 'red', 'green', 'gold', 'purple', 'cyan'];
	//var route_numbers = [801, 802, 803, 804, 805, 806];
	//var route_names = ['A', 'B', 'C', 'L', 'D', 'E'];
	//var no_of_stops = [21,14,14,27,8,19]
	//var dist_bet_stops = 800/20;
	//var start_stops = [[2,'    7th/','  Metro'], [2,'   North','Hollywood'], [1,'Redondo', ''], [1,' Atlantic', ''], [2,'Wilshire/','Western'], [2,'  Santa',' Monica']];
	//var end_stops = [[2,'   Long','  Beach'], [1,'','  Union'], [1,'',' Norwalk'], [2,'   Apu/','  Citrus'], [1,'','  Union'], [2,'    7th/', '  Metro']];

	
	for (var i=0 ; i < route_numbers.length; i++){
	    
	    ctx.strokeStyle=route_colors[i];
	    ctx.fillStyle=route_colors[i];
	    
	    //Name start stops
	    ctx.font = "20px Arial";
	    ctx.fillText(start_stops[i][1], 47 + (2*i)*100 +15,50);
	    if (start_stops[i][0]==2){
		ctx.fillText(start_stops[i][2], 47 + (2*i)*100 +15,70);}

	    //Draw stations segments

	    for (var j=0; j<2; j++){
		ctx.beginPath();
		ctx.lineWidth = 30;
		ctx.lineCap = 'round';
		ctx.moveTo(50 + (2*i+j)*100, 110);
		ctx.lineTo(50 +  (2*i+j)*100, 110+(no_of_stops[i]-1)*(dist_bet_stops));
		ctx.stroke();
		ctx.closePath();


		//Draw tracks 
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.lineCap = 'butt';
		if (j==0){var l=1;}
		else{var l=-1;}
		ctx.moveTo(50 + 30*(l) + (2*i+j)*100, 110-10);
		ctx.lineTo(50 + 30*(l)+ (2*i+j)*100, 110+(no_of_stops[i]-1)*(dist_bet_stops)+10);
		ctx.stroke();
		ctx.closePath();
		   
		
		//Draw stops
		for (var k=0; k < no_of_stops[i]; k++){
		    ctx.beginPath();
		    ctx.lineWidth = 10;
		    ctx.fillStyle='white';
		    ctx.arc(50+  (2*i+j)*100, 110 + k*dist_bet_stops, 10, 0, Math.PI * 2, true);
		    
		    ctx.fill();
		   

		}
               
	        //Draw direction arrows	
		if (l==1){

		    arrowhead(ctx, 50 + (2*i+j)*100, 110+(no_of_stops[i]-1)*(dist_bet_stops)+5,-8,6,route_colors[i]);
		
		    arrowhead(ctx, 50 + (2*i+j)*100, 110+5,-8,6,route_colors[i]);
		}
		else{
		    arrowhead(ctx, 50 + (2*i+j)*100,110+(no_of_stops[i]-1)*(dist_bet_stops)-5,8,6,route_colors[i]);
		    arrowhead(ctx, 50 + (2*i+j)*100,110-5,8,6,route_colors[i]);
		}
	    }

	   


	    //Name end stops
	    ctx.fillStyle=route_colors[i];
	    ctx.font = "20px Arial";
	    if (end_stops[i][0]==2){
		    ctx.fillText(end_stops[i][1], 47 + (2*i)*100 +15,140+(no_of_stops[i]-1)*(dist_bet_stops)+20);}
	    ctx.fillText(end_stops[i][2], 47 + (2*i)*100 +15,160+(no_of_stops[i]-1)*(dist_bet_stops)+20);

	}


	
    }


// A utility function to draw triangular arrow heads

function arrowhead(ctx, arrow_head_x, arrow_head_y,
		     height, half_base, color) {
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.moveTo(arrow_head_x, arrow_head_y);
  ctx.lineTo(arrow_head_x - half_base, arrow_head_y + height);
  ctx.lineTo(arrow_head_x + half_base, arrow_head_y + height);
  ctx.fill();
}

// A utility function to draw rounded rectangles


function roundedRect(ctx, x, y, width, height, radius,color) {
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.closePath();
  ctx.fill();
}







