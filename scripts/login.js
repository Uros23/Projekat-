var employeesUrl = ('http://services.odata.org/V3/Northwind/Northwind.svc/Employees?$format=json');
var allEmployees = [];
getEmployees();

document.getElementById('btnLogin').addEventListener('click', function(){
   login(document.getElementById('username').value, document.getElementById('pass').value, allEmployees);
 });
 

 function getEmployees() {
    allEmployees = getServiceData(employeesUrl).value;
 }
 var isOkUser;
 function login(firstName, password, allEmployees){
    for (var i in allEmployees){
        if (allEmployees[i].FirstName == firstName && allEmployees[i].LastName == password){
          isOkUser = true;
          break;
        }
      }
        if(isOkUser == true) {
          sessionStorage.setItem("isOkUser", true);
          window.location.href = 'main.html';
        }
        else{
          document.getElementById('errLogin').innerHTML = 'Neuspelo logovanje';
        }
 }

function getServiceData(url,username, password) {

    try {
        var result;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    result = JSON.parse(xmlhttp.response);
                }
                else {
                    return false;
                }
            }
        };
        xmlhttp.open("GET", url, false, username, password);
        xmlhttp.send();
        return result;
    }
    catch (err) {       
        return err;
    }
}