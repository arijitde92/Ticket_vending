var ticket_num, fname, lname, email, phone_num, movie_name;
var text = "";
function buyTicket () {
    const ticket = {
        movieName:$("#movieName").val(),
        quantity:$("#quantity").val(),
        firstName:$("#firstName").val(),
        lastName:$("#lastName").val(),
        phone:$("#phone").val(),
        email:$("#email").val()
    }
    $.get("/save",ticket,function(){
        getAll();
    });
    $("#movieName").val(""); // clear the input fields
    $("#quantity").val("");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#phone").val("");
    $("#email").val("");
    deleteAllError();
}
function getAll(){
    $.get("/getAll",function(data){
        formatData(data);
    });
}
function formatData(tickets){
    let out = "<table>" +
        "<tr>" +
        "<th>Movie Name</th><th>Quantity</th>"+"<th>First Name</th><th>Last Name</th>"+"<th>Phone Number</th><th>Email</th>"+
        "</tr>";
    for(const ticket of tickets){
        out += "<tr><td>" + ticket.movieName +
            "</td><td>" + ticket.quantity +
            "</td><td>" + ticket.firstName +
            "</td><td>" + ticket.lastName +
            "</td><td>" + ticket.phone +
            "</td><td>" + ticket.email + "</td></tr>";
    }
    $("#displayDiv").html(out);
}
function deleteCustomers(){
    $.get("/deleteAll", function(){
        getAll();
    });
}
function validate() {
    let isValid = true;
    let movie_name = $("#movieName").val();
    if(movie_name=="none")
    {
        $("#movieErr").html("Please select movie name");
        isValid = false;
    }
    let ticket_num = $("#quantity").val();
    if(isNaN(ticket_num) || ticket_num < 1 || ticket_num > 10) {
        $("#ticketErr").html("Number of tickets must be between 1 and 10");
        isValid = false;
    }
    let fname = $("#firstName").val();
    if(fname=="")
    {
        $("#fnameErr").html("Please enter first name");
        isValid = false;
    }
    let lname = $("#lastName").val();
    if(lname=="")
    {
        $("#lnameErr").html("Please enter last name");
        isValid = false;
    }
    let phone_num = $("#phone").val();
    let phoneno = /^\d{8}$/;
    if(!phone_num.match(phoneno))
    {
        $("#numberErr").html("Invalid Phone number format");
        isValid = false;
    }
    let email = $("#email").val();
    let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(!email.match(mailformat)) {
        $("#emailErr").html("Invalid Email format");
        isValid = false;
    }
    if(isValid)
    {
        buyTicket();
        deleteAllError();
    }
}
function deleteAllError() {
    $("#movieErr").html("");
    $("#ticketErr").html("");
    $("#fnameErr").html("");
    $("#lnameErr").html("");
    $("#numberErr").html("");
    $("#emailErr").html("");
}