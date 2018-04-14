/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var usdaList = new Array();
var newUsda;
var dataID;

function Usda(classifier, contactPoint, description, distribution, modified, accessLevel, publisher) {
    this.classifier = classifier;
    this.contactPoint = contactPoint;
    this.description = description;
    this.distribution = distribution;
    this.modified = modified;
    this.accessLevel = accessLevel;
    this.publisher = publisher;
}

$(document).on("pagecreate", "#usda", function () {
    $.getJSON("dataFiles/ProjectData-04.json", function (data) {
        console.log(data);
        groupdata = data.groupdata;
        for (i = 0; i < groupdata.length; i++) {
            newUsda = new Usda(
                    groupdata[i].classifier,
                    groupdata[i].contactPoint,
                    groupdata[i].description,
                    groupdata[i].distribution,
                    groupdata[i].modified,
                    groupdata[i].accessLevel,
                    groupdata[i].publisher
                    );
            usdaList.push(newUsda);
        }//loop ends
        loadData();
        $("#usda-data").listview().listview('refresh');
    });//json call ends
});//doc on ends

function loadData() {
    $("#usda-data").html();
    $("#datalist").html();
    
    for (i = 0; i < usdaList.length; i++) {
        $("#usda-data").append("<li li-id='"+[i]+"'><a href='#datapopup' data-rel='popup'>"+ usdaList[i].classifier +"</a></li>");
    }
}

$(document).on("click", "ul[id='usda-data'] >li", function(){
	dataID = $(this).closest("li").attr("li-id");
        printUsda(dataID);
        console.log(dataID);
});

function printUsda(id){
    $("#usdaDataHeader").html("<h5 class='ui-title'>"+usdaList[id].classifier+"</h5>");
    $("#datalist").html(
            "<p><b>USDA ID: </b>"+ usdaList[id].classifier +"</p>"+
            "<p><b>Description: </b>"+ usdaList[id].description +"</p>"+
            "<p><b>Contact Name: </b>"+ usdaList[id].contactPoint.fn +"</p>"+
            "<p><b>Contact Email: </b><a class='ui-btn ui-btn-inline "+usdaList[id].contactPoint.icon+" ui-btn-icon-right' href='"+usdaList[id].contactPoint.hasEmail+"'>"+ 
                usdaList[id].contactPoint.hasEmail.split('mailto:')[1] +"</a></p>"+
            "<p><b>Distribution Media Type: </b>"+ usdaList[id].distribution[0].mediaType +"</p>"+
            "<p><b>Distribution Download URL: </b><a href='"+ 
                usdaList[id].distribution[0].downloadURL +"'>"+
                usdaList[id].distribution[0].downloadURL+"</a></p>"+
            "<p><b>Modified date: </b>"+ usdaList[id].modified +"</p>"+
            "<p><b>Access Level: </b>"+ usdaList[id].accessLevel +"</p>"+
            "<p><b>Publisher: </b>"+ usdaList[id].publisher.name +"</p>"  
            );
}
