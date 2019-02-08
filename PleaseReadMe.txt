The Demo contains,
ProductManagementSystem - UI (Developed in Angular)
ProductManagementSystemDAL - Data Access Layer
ProductManagementSystemWebApi - API

*** Database ***
Database used is MS SQL Server
1) Attached the scripts to create database, create tables and insert statements

*** Steps to Run ProductManagementSystemWebApi ***
ProductManagementSystemWebApi is developed in .Net Framework 4.6.1 in visual studio 2015
1) Open Solution ProductManagementSystemWebApi.sln. ProductManagementSystemDAL.csproj is already attached in this solution.
2) Right click on the solution -> Restore NuGet Packages (This will download all the dependencies used in the project).
3) Make sure ProductManagementSystemWebApi is set as a start up project. If not then, right click on ProductManagementSystemWebApi -> set as start up project
4) Change connection string in web.config
5) Run the project and browse http://localhost:51282/api/demo/GetDemo This fetches hardcoded values to verify if API is working fine. Replace 51282 with your port.

*** Steps to run ProductManagementSystem ***
ProductManagementSystem is developed in Angular 5 in VS Code
1) Open ProductManagementSystem in VS Code or any IDE
2) Go to path where package.json file exist
3) On terminal run "npm install" (This will download all the dependencies used in the project).
4) Replace base API URL in Angular project config. i.e. replace 51282 with your port in the baseURL in .\ProductManagementSystem\src\assets\config.json file.
5) run "ng serve" and browse the url http://localhost:4200. Do not run on port other than 4200 otherwise you will face CORS issue. I have enabled CORS for 4200 port only for now.
6) You can login using two users i)admin - admin1234 ii)user - user1234. "admin" user can see all menus, whereas "user" can see only limited menus. (Authentication and Authorization on basis of credentials and role respectively.)


TO DO 
change in GlobalMembersService 