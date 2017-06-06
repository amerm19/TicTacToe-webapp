function GetURLParam(strParam){
	var pageUrl = window.location.search.substring(1);
	var strUrlList = pageUrl.split("&");
	for(var i = 0; i < strUrlList.length; i++){
		var paramName = strUrlList[i].trim().split("=");
		if (paramName[0] == strParam){
			return paramName[1].trim();
		}
	}
}
function player_turn(turn_list){
	if(turn_list.length === 0 || turn_list[turn_list.length-1] == "O"){
		return 1;
	}else if(turn_list[turn_list.length-1] == "X"){
		return 2;
	}
}
function is_winner(){
	if($("#A0").text() == "X" && $("#A1").text() == "X" && $("#A2").text() == "X" || 
	   $("#B0").text() == "X" && $("#B1").text() == "X" && $("#B2").text() == "X" ||
	   $("#C0").text() == "X" && $("#C1").text() == "X" && $("#C2").text() == "X" ||
	   $("#A0").text() == "X" && $("#B0").text() == "X" && $("#C0").text() == "X" ||
	   $("#A1").text() == "X" && $("#B1").text() == "X" && $("#C1").text() == "X" ||
	   $("#A2").text() == "X" && $("#B2").text() == "X" && $("#C2").text() == "X" ||
	   $("#A0").text() == "X" && $("#B1").text() == "X" && $("#C2").text() == "X" ||
	   $("#A2").text() == "X" && $("#B1").text() == "X" && $("#C0").text() == "X"){
	   		return 1;
	   }else if(
	   $("#A0").text() == "O" && $("#A1").text() == "O" && $("#A2").text() == "O" || 
	   $("#B0").text() == "O" && $("#B1").text() == "O" && $("#B2").text() == "O" ||
	   $("#C0").text() == "O" && $("#C1").text() == "O" && $("#C2").text() == "O" ||
	   $("#A0").text() == "O" && $("#B0").text() == "O" && $("#C0").text() == "O" ||
	   $("#A1").text() == "O" && $("#B1").text() == "O" && $("#C1").text() == "O" ||
	   $("#A2").text() == "O" && $("#B2").text() == "O" && $("#C2").text() == "O" ||
	   $("#A0").text() == "O" && $("#B1").text() == "O" && $("#C2").text() == "O" ||
	   $("#A2").text() == "O" && $("#B1").text() == "O" && $("#C0").text() == "O"){
	   		return 2;
	   }else if(
	   $.trim($("#A0").html()) != '' && $.trim($("#A1").html()) != '' && $.trim($("#A2").html()) != '' &&
	   $.trim($("#B0").html()) != '' && $.trim($("#B1").html()) != '' && $.trim($("#B2").html()) != '' &&
	   $.trim($("#C0").html()) != '' && $.trim($("#C1").html()) != '' && $.trim($("#C2").html()) != ''){
	   		return 0;
	   }
}
$(document).ready(function(){
	var turn_list = [];
	var player = 1;
	var p1_score = parseInt(GetURLParam("p1_score"));
	var p2_score = parseInt(GetURLParam("p2_score"));
	var p1_name = GetURLParam("p1");
	var p2_name = GetURLParam("p2");
	$("#player1").text(p1_name);
	$("#player2").text(p2_name);
	$("#p1").text(p1_name);
	$("#p2").text(p2_name);
	$("#p1_score").text(p1_score);
	$("#p2_score").text(p2_score);
    $("#A0, #A1, #A2, #B0, #B1, #B2, #C0, #C1, #C2").mouseenter(function(){
        $(this).css("background-color", "lightgray");
    });
    $("#A0, #A1, #A2, #B0, #B1, #B2, #C0, #C1, #C2").mouseleave(function(){
        $(this).css("background-color", "white");
    });
    $("#new_game").mouseenter(function(){
    	$(this).css("box-shadow", "10px 10px 5px #888");
    });
    $("#new_game").mouseleave(function(){
    	$(this).css("box-shadow", "0px 0px 0px #888");
    });
    $("#A0, #A1, #A2, #B0, #B1, #B2, #C0, #C1, #C2").click(function(){
    	if($.trim($(this).html())==''){
    		player = player_turn(turn_list);
    		if(player == 1){
    	    	$("#player2").css("background", "lightgray");
    			$("#player1").css("background", "white");
    			turn_list.push("X");
    			$(this).text("X");
    		}else if(player == 2){
    		    $("#player1").css("background", "lightgray");
    			$("#player2").css("background", "white");
    			turn_list.push("O");
    			$(this).text("O");
    		}
    	}
    	var winner = is_winner();
    	if(winner == 1){
    		alert(p1_name+" Wins!");
    		$("#A0, #A1, #A2, #B0, #B1, #B2, #C0, #C1, #C2").off();
    		$("#p1_score").text(p1_score+=1);
    	}else if(winner == 2){
    		alert(p2_name+" Wins!");
    		$("#A0, #A1, #A2, #B0, #B1, #B2, #C0, #C1, #C2").off();
    		$("#p2_score").text(p2_score+=1);
    	}else if(winner == 0){
    		alert("Draw, please play again!");
    		$("#A0, #A1, #A2, #B0, #B1, #B2, #C0, #C1, #C2").off();
    	}
    });
    $("#form1").submit(function(event){
    	if($("#p1_input").val() == '' || $("#p2_input").val() == ''){
    		event.preventDefault();
    		alert("Please enter both the players info.");
    	}else{
    		$("#form1").append("<input type='hidden' name='p1' value="+$("#p1_input").val()+">");
    		$("#form1").append("<input type='hidden' name='p2' value="+$("#p2_input").val()+">");
    	}
    });
    $("#form2").submit(function(){
    	$(this).append("<input type='hidden' name='p1' value="+p1_name+">");
    	$(this).append("<input type='hidden' name='p2' value="+p2_name+">");
    	$(this).append("<input type='hidden' name='p1_score' value="+p1_score+">");
    	$(this).append("<input type='hidden' name='p2_score' value="+p2_score+">");
    });
});