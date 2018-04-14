
$(document).on("pagebeforeshow", "#protein", function() {
	$.ajax({
		type: "GET", url:"dataFiles/protein.xml", dataType:"xml",
		success: function(xml) {
			loadProtein(xml);
		}
	}); //end of ajax
}); // end document.on

function loadProtein(xml) {
    console.log("in loadProtein");
    
    $("#url").html("");
    $("#url").append( 
        "<a href='" + $(xml).find("url").text() + "'>" + 
            $(xml).find("url").text() + 
        "</a>"
    );
    
    $("#protein-data").html("");
    
    $(xml).find("food").each(function () {
        img = $(this).attr("type").split(' ')[0];
        
        $("#protein-data").append(
                
                "<section data-role='collapsible'>" +
                        "<h2 class='ui-btn ui-icon-" + img.toString().toLowerCase() + 
                            " ui-btn-icon-left'>" + $(this).attr("type") + 
                        "</h2>" +
                        "<p>Food name: " + 
                            $(this).find("foodName").text() + 
                        "</p>" +
                        "<p>Calories per " + $(this).find("calories").attr("amount") + ": " +
                            $(this).find("calories").text() +
                        "</p>" +
                        "<p>Calories: " +
                            $(this).find("calories").text() +
                        "</p>" +
                        "<p>Protein: " +
                            $(this).find("protein").text() +
                        "</p>" +
                        "<p>Sodium: " +
                            $(this).find("sodium").text() +
                        "</p>" +
                        "<p>Iron: " +
                            $(this).find("iron").text() +
                        "</p>" +
                "</section>"
        );
    }); //end of .each division

    $("#protein-data").collapsibleset("refresh");
}
