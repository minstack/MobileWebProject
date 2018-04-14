/*
 *   myscript.js for Mobile Web Group Project
 *   Winter 2018
 *   Sung Min Yoon, Roina Soares Teles Bastos, Mohammad Nasim Naimy
 */
var students = [];
var LS_PRE = "pcomp-winter18-";
var selectedStudent;

//usda
var usdaList = new Array();
var newUsda;
var dataID;
var header;

//function to create Student object
function Student(name, stuNum, pic, login, icon) {
    this.name = name;
    this.studentNum = stuNum;
    this.pic = pic;
    this.login = login;
    this.icon = icon;
}

function Usda(classifier, contactPoint, description, distribution, modified, accessLevel, publisher) {
    this.classifier = classifier;
    this.contactPoint = contactPoint;
    this.description = description;
    this.distribution = distribution;
    this.modified = modified;
    this.accessLevel = accessLevel;
    this.publisher = publisher;
}

$(document).ready(function() {
    //usda json needs to load with home page to get the 'type'
    //node to be the header for all pages
    $.getJSON("dataFiles/ProjectData-04.json", function (data) {
        console.log(data);
        header = data.type;
        loadHeader("#main-head", header);
        loadHeader("#usda-head", header);
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
    });//json call ends
    
    //init the student json into array of student objects
    //save to local storage for later use (the json)
    $.getJSON("dataFiles/GroupMembers.json", function(data) {
        
        
        initStudentArray(data);
        localStorage.setItem(LS_PRE + "students", JSON.stringify(data));
        
        initMainNavbar(students);
        initListviewLinks();
        console.log(students);
        
    });
    
    $("#gototop").on("click", function(){
        $("html").animate({ scrollTop: 0 }, "slow");
    });
    
    $("#gototop-p").on("click", function(){
        $("html").animate({ scrollTop: 0 }, "slow");
    });
        
});

//student click on main
$(document).on("click", "ul[id='studentNav'] > li", function() {
    populateStudentInfo(students, "#student-info"
    , $(this).closest("li").attr("li-id"));
   // console.log(i);
    
});

//student click on protein
$(document).on("click", "ul[id='proteinNav'] > li", function() {
    populateStudentInfo(students, "#student-info-p"
    , $(this).closest("li").attr("li-id"));    
});

//student click on usda
$(document).on("click", "ul[id='usdaNav'] > li", function() {
    populateStudentInfo(students, "#student-info-u"
    , $(this).closest("li").attr("li-id"));    
});

//usda listview data
$(document).on("click", "ul[id='usda-data'] >li", function(){
	dataID = $(this).closest("li").attr("li-id");
        printUsda(dataID);
        console.log(dataID);
});


//protein page
$(document).on("pagebeforeshow", "#protein", function() {
        loadHeader("#protein-head", header);
	$.ajax({
		type: "GET", url:"dataFiles/protein.xml", dataType:"xml",
		success: function(xml) {
                        var phead = header + " - " + $(xml).find("foodGroupName").text();
                        loadHeader("#protein-head", phead);
                        loadProtein(xml);
		}
	}); //end of ajax
        
        initProteinNavbar(students);
}); // end document.on

//usda page
$(document).on("pagebeforeshow", "#usda", function () {
    loadData();
    $("#usda-data").listview().listview('refresh');
    initUsdaNavbar(students);
});//doc on ends



function loadProtein(xml) {
    console.log("in loadProtein");
 
    $("#url").html("");
    $("#url").append( 
        "<a class='ui-btn ui-icon-cmp ui-btn-icon-left ui-shadow ui-btn-corner-all' href='" 
            + $(xml).find("url").text() + "' target='_blank'>" + 
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
                "<p><b>Food name: </b>" + 
                    $(this).find("foodName").text() + 
                "<br>" +
                "<b>Calories per " + $(this).find("calories").attr("amount") + ":</b> " +
                    $(this).find("calories").text() +
                "<br>" +
                "<b>Protein: </b>" +
                    $(this).find("protein").text() +
                "<br>" +
                "<b>Sodium: </b>" +
                    $(this).find("sodium").text() +
                "<br>" +
                "<b>Iron: </b>" +
                    $(this).find("iron").text() +
                "</p>" +
            "</section>"
        );
    }); //end of .each division

    $("#protein-data").collapsibleset("refresh");
}


function loadData() {
    $("#usda-data").html();
    $("#datalist").html();
    
    for (i = 0; i < usdaList.length; i++) {
        $("#usda-data").append("<li li-id='"+[i]+"'><a href='#datapopup' data-rel='popup'>"+ usdaList[i].classifier +"</a></li>");
    }
}

function printUsda(id){
    $("#usdaDataHeader").html("<h5 class='ui-title'>USDA ID: "+usdaList[id].classifier+"</h5>");
    $("#datalist").html(
            "<p><b>Description: </b>"+ usdaList[id].description +"</p>"+
            "<p><b>Contact Name: </b>"+ usdaList[id].contactPoint.fn +"</p>"+
            "<p><b>Contact Email: </b><a class='ui-btn ui-shadow ui-btn-inline "
                +usdaList[id].contactPoint.icon+" ui-btn-icon-right' href='"
                +usdaList[id].contactPoint.hasEmail+"'>"+ 
                usdaList[id].contactPoint.hasEmail.split('mailto:')[1] +"</a></p>"+
            "<p><b>Distribution Media Type: </b>"+ usdaList[id].distribution[0].mediaType +"</p>"+
            "<p><b>Distribution Download URL: </b><a href='"+ 
                usdaList[id].distribution[0].downloadURL +"' target='_blank'>"+
                usdaList[id].distribution[0].downloadURL+"</a></p>"+
            "<p><b>Modified date: </b>"+ usdaList[id].modified +"</p>"+
            "<p><b>Access Level: </b>"+ usdaList[id].accessLevel +"</p>"+
            "<p><b>Publisher: </b>"+ usdaList[id].publisher.name +"</p>"  
            );
}

function populateStudentInfo(students, infoId, i) {
    var studentInfo = getJQMTable({
        theads: ["Name:", "Student#:", "Login:"],
        fields: [students[i].name, students[i].studentNum, students[i].login]
    });
    
    $(infoId).html(studentInfo);
    $(infoId).append("<img src='images/" + students[i].pic 
                                + "' alt='"+ students[i].name +"'>");
}

function initListviewLinks() {
    
    var content = getListview({
        label: ["USDA", "Protein Food Group"],
        icons: ["../css/images/usda.png", "../css/images/protein.png"],
        links: ["#usda", "#protein"]
     }, "slide", "ui-overlay-shadow"
    );
    
    $("#home-content").append(content);
    
    $("[data-role='listview']").listview();
}
    
function loadHeader(headId, content) {
    $(headId).html(content);
}

function initProteinNavbar(students){
    initNav(students, "#protein-nav", "proteinNav", "#studentp");
}

function initUsdaNavbar(students){
    initNav(students, "#nav-usda", "usdaNav", "#studentu");
}

function initMainNavbar(students) {
    initNav(students, "#main-nav", "studentNav", "#student");
}

//the general function to setup nav bar in footer
function initNav(students, id, ulId, popupLink) {
    var navHtml = "";    
    
    for (var i = 0; i < students.length; i++) {
        var tempArr = students[i].name.split(" ");
        
        var navText = getFirstInitialAndLastName(tempArr);
        
        navHtml += "<li li-id='"+i+"'><a href='" + popupLink 
                + "' data-rel='popup' class='ui-btn ui-btn-icon-left " 
                + students[i].icon + "'> " 
                + navText + "</a></li>";
    }
    
    $(id).html(
       "<ul id='" + ulId + "'>"
            +navHtml          
       +"</ul>"            
    );
    
    $(id).navbar("destroy");
    $(id).navbar();
}

function getFirstInitialAndLastName(strArr) {
    
    return strArr[0].substr(0,1) + ". " + strArr[strArr.length-1];
}

function initStudentArray(data) {
    var temp = data.students;
        
    for (var i=0; i < temp.length; i++) {
        students.push(
            new Student(
                temp[i].fullName,
                temp[i].studentNumber,
                temp[i].studentPic,
                temp[i].studentLogin,
                temp[i].icon                      
            )
        );
    }
}

//returns a listview (html string) based on the given content object
function getListview(listviewContent, transition, cssclass) {
    var lbls = listviewContent.label;
    var icons = listviewContent.icons;
    var links = listviewContent.links;
    var listview = "<ul data-role='listview' data-inset='true' class='" + cssclass + "'>";
    
    for (var i=0; i < lbls.length; i++) {
        listview += "<li li-id='" + lbls[i] +"'><a href='" + links[i] 
                    + "' data-transition='" + transition + "'>"
                + "<img src='images/" + icons[i] 
                + "' class='ui-li-icon'>"
                + lbls[i]
                + "</a></li>";
    }
    
    return (listview += "</ul>");

}

//returns a html table (string) based on the content object
//which include table headings and content fields
function getJQMTable(content) {
    var headers = content.theads;
    var fields = content.fields;
    var table = "<table data-role='table'>";
    var row;
    for (var i = 0; i < headers.length; i++) {
        row = "<tr>"
            + "<th>" + headers[i] + "</th>"
            + "<td>" + fields[i] + "</td>"
            + "</tr>";
            
        table += row;
    }
    
    table += "</table>";
    
    return table;
}

//scroll to contents of expanded if contents overflows past bottom of page
$(document).on("collapsibleexpand", function(e){
    smart_scroll(e.target, 45); 
});

//retreived from https://github.com/jquery/jquery-mobile/issues/5394
// scroll an element fully into view
//
// if fully visible: do nothing
// if partly visible: scroll as little as to make it fully visible
// if larger than viewport: scroll to top of screen
function smart_scroll(el, offset){ 


offset = offset || 0; // manual correction, if other elem (eg. a header above) should also be visible

var air         = 15; // above+below space so element is not tucked to the screen edge

var el_height   = $(el).height()+ 2 * air + offset;
var el_pos      = $(el).offset();
var el_pos_top  = el_pos.top - air - offset;

var vport_height = $(window).height();
var win_top      = $(window).scrollTop();

//  alert("el_pos_top:"+el_pos_top+"  el_height:"+el_height+"win_top:"+win_top+"  vport_height:"+vport_height);

var hidden = (el_pos_top + el_height) - (win_top + vport_height);

if ( hidden > 0 ) // element not fully visible
    {
    var scroll;

    if(el_height > vport_height) scroll = el_pos_top;       // larger than viewport - scroll to top
    else                         scroll = win_top + hidden; // smaller than vieport - scroll minimally but fully into view

    $('html, body').animate({ scrollTop: (scroll) }, 200); 
    }

}