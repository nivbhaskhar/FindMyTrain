
document.addEventListener('DOMContentLoaded', function() {

    draw_train_tracks();
    
    
});

function engine_icon(ctx, x,y)
{
  //train icon 
  roundedRect(ctx, x, y, 20, 25, 4,"black");
  ctx.fillStyle='rgb(217, 217, 217)'; 
  ctx.fillRect(x,y+7,20,11);
    
  //train icon headlight
  ctx.fillStyle='yellow';
  ctx.beginPath();
  ctx.arc(x+10, y+3.5, 2, 0, Math.PI*2, false);
  ctx.fill();
}




    function draw_train_tracks() {
	var ctx = document.getElementById('train_tracks').getContext('2d');
	var route_colors = ['blue', 'red', 'green', 'gold', 'purple', 'cyan'];
	var route_numbers = [801, 802, 803, 804, 805, 806];
	var route_names = ['A', 'B', 'C', 'L', 'D', 'E'];
	var no_of_stops = [21,14,14,27,8,19]
	var dist_bet_stops = 800/20;
	var start_stops = [[2,'    7th/','  Metro'], [2,'   North','Hollywood'], [1,'Redondo', ''], [1,' Atlantic', ''], [2,'Wilshire/','Western'], [2,'  Santa',' Monica']];
	var end_stops = [[2,'   Long','  Beach'], [1,'','  Union'], [1,'',' Norwalk'], [2,'   Apu/','  Citrus'], [1,'','  Union'], [2,'    7th/', '  Metro']];

	
	for (var i=0 ; i < route_numbers.length; i++){
	    
	    ctx.strokeStyle=route_colors[i];
	    ctx.fillStyle=route_colors[i];
	    
	    //Name start stops
	    ctx.font = "20px Arial";
	    ctx.fillText(start_stops[i][1], 47 + (2*i)*100 +15,40);
	    if (start_stops[i][0]==2){
		ctx.fillText(start_stops[i][2], 47 + (2*i)*100 +15,60);}

	    //Draw stations segments

	    for (var j=0; j<2; j++){
		ctx.beginPath();
		ctx.lineWidth = 30;
		ctx.lineCap = 'round';
		ctx.moveTo(50 + (2*i+j)*100, 100);
		ctx.lineTo(50 +  (2*i+j)*100, 100+(no_of_stops[i]-1)*(dist_bet_stops));
		ctx.stroke();
		ctx.closePath();


		//Draw tracks 
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.lineCap = 'butt';
		if (j==0){var l=1;}
		else{var l=-1;}
		ctx.moveTo(50 + 30*(l) + (2*i+j)*100, 100-10);
		ctx.lineTo(50 + 30*(l)+ (2*i+j)*100, 100+(no_of_stops[i]-1)*(dist_bet_stops)+10);
		ctx.stroke();
		ctx.closePath();
		   
		
		//Draw stops
		for (var k=0; k < no_of_stops[i]; k++){
		    ctx.beginPath();
		    ctx.lineWidth = 10;
		    ctx.fillStyle='white';
		    ctx.arc(50+  (2*i+j)*100, 100 + k*dist_bet_stops, 10, 0, Math.PI * 2, true);
		    
		    ctx.fill();
		   

		}
               
	        //Draw direction arrows	
		if (l==1){

		    arrowhead(ctx, 50 + (2*i+j)*100, 100+(no_of_stops[i]-1)*(dist_bet_stops)+5,-8,6,route_colors[i]);
		
		    arrowhead(ctx, 50 + (2*i+j)*100, 100+5,-8,6,route_colors[i]);
		}
		else{
		    arrowhead(ctx, 50 + (2*i+j)*100,100+(no_of_stops[i]-1)*(dist_bet_stops)-5,8,6,route_colors[i]);
		    arrowhead(ctx, 50 + (2*i+j)*100,100-5,8,6,route_colors[i]);
		}
	    }

	    //Draw arbit engines
	    engine_icon(ctx, 50 + 30*(1)+ (2*i)*100-10, 100+(3)*(dist_bet_stops))
	    engine_icon(ctx, 50 + 30*(-1)+ (2*i+1)*100-10, 100+(4)*(dist_bet_stops))



	    //Name end stops
	    ctx.fillStyle=route_colors[i];
	    ctx.font = "20px Arial";
	    if (end_stops[i][0]==2){
		    ctx.fillText(end_stops[i][1], 47 + (2*i)*100 +15,130+(no_of_stops[i]-1)*(dist_bet_stops)+20);}
	    ctx.fillText(end_stops[i][2], 47 + (2*i)*100 +15,150+(no_of_stops[i]-1)*(dist_bet_stops)+20);

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







