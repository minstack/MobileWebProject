/*
 *   myscript.js for Mobile Web Group Project
 *   Sung Min Yoon, Roina Soares Teles Bastos, Mohammad Nasim Naimy
 */
















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