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
    populateStudentInfo(students, "#student-info"
    , $(this).closest("li").attr("li-id"));
   // console.log(i);
    
});

$(document).on("click", "ul[id='proteinNav'] > li", function() {
    populateStudentInfo(students, "#student-info-p"
    , $(this).closest("li").attr("li-id"));    
});

$(document).on("click", "ul[id='usdaNav'] > li", function() {
    populateStudentInfo(students, "#student-info-u"
    , $(this).closest("li").attr("li-id"));    
});


$(document).on("pagecreate", "#home", function (){
   
    //init the student json into array of student objects
    //save to local storage for later use (the json)
    $.getJSON("dataFiles/GroupMembers.json", function(data) {
        
        initStudentArray(data);
        localStorage.setItem(LS_PRE + "students", JSON.stringify(data));
        
        initMainNavbar(students);
        initListviewLinks();
        console.log(students);
    });
    
    
});

$(document).on("pagecreate", "#usda", function (){
   
    initUsdaNavbar(students);
});

$(document).on("pagecreate", "#protein", function (){
   
    initProteinNavbar(students);
    
});
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
    });
    
    $("#home-content").append(content);
    
    $("[data-role='listview']").listview();
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
        
        navHtml += "<li li-id='"+i+"'><a href='" + popupLink + "' data-rel='popup' class='ui-btn ui-icon-group-dev ui-btn-icon-left'> " 
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
            + "</tr>";
            
        table += row;
    }
    
    table += "</table>";
    
    return table;
}