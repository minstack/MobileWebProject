/*
 *   myscript.js for Mobile Web Group Project
 *   Sung Min Yoon, Roina Soares Teles Bastos, Mohammad Nasim Naimy
 */
var students = [];
var LS_PRE = "pcomp-winter18-";
var selectedStudent;

//function to create Student object
function Student(name, stuNum, pic, login) {
    this.name = name;
    this.studentNum = stuNum;
    this.pic = pic;
    this.login = login;
}

$(document).on("click", "ul[id='studentNav'] > li", function() {
      var i = $(this).closest("li").attr("li-id");
    console.log(i);
    var studentInfo = getJQMTable({
        theads: ["Name:", "Student#:", "Login:"],
        fields: [students[i].name, students[i].studentNum, students[i].login]
    });
    
    $("#student-info").html(studentInfo);
    $("#student-info").append("<img src='images/" + students[i].pic 
                                + "' alt='"+ students[i].name +"'>");
});


$(document).on("pagecreate", "#home", function (){
   
    //init the student json into array of student objects
    //save to local storage for later use (the json)
    $.getJSON("dataFiles/GroupMembers.json", function(data) {
        
        initStudentArray(data);
        localStorage.setItem(LS_PRE + "students", JSON.stringify(data));
        
        initMainNavbar(students);
        
        console.log(students);
    });
    
    
});

function initMainNavbar(students) {
    initNav(students, "#main-nav", "studentNav");
}

//the general function to setup nav bar in footer
function initNav(students, id, ulId) {
    var navHtml = "";
    var popupLink = "#student";
    
    for (var i = 0; i < students.length; i++) {
        navHtml += "<li li-id='"+i+"'><a href='" + popupLink + "' data-rel='popup' class='ui-btn ui-icon-group-dev ui-btn-icon-left'> " 
                + students[i].name + "</a></li>"
    }
    
    $(id).html(
       "<ul id='" + ulId + "'>"
            +navHtml          
       +"</ul>"            
    );
    
    $(id).navbar("destroy");
    $(id).navbar();
}
function initStudentArray(data) {
    var temp = data.students;
        
    for (var i=0; i < temp.length; i++) {
        students.push(
            new Student(
                temp[i].fullName,
                temp[i].studentNumber,
                temp[i].studentPic,
                temp[i].studentLogin
            )
        );
    }
}

//returns a listview (html string) based on the given content object
function getListview(listviewContent) {
    var lbls = listviewContent.label;
    var icons = listviewContent.icons;
    var links = listviewContent.links;
    var listview = "<ul data-role='listview' data-inset='true'>";
    
    for (var i=0; i < lbls.length; i++) {
        listview += "<li li-id='" + lbls[i] +"'><a href='" + links[i] + "'>"
                + "<img src='images/" + icons[i] + "' class='ui-li-icon'>"
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
            + "</tr>"
            
        table += row;
    }
    
    table += "</table>"
    
    return table;
}