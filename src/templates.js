window.templates = {
    "admin\/courses\/index.html": "<div class=\"col-md-12\" id=\"user-table-target\"><\/div>\r\n\r\n<div class=\"col-md-12\">\r\n\t<form class=\"form-horizontal\">\r\n\t<fieldset>\r\n\r\n\t<!-- Text input-->\r\n\t<div class=\"form-group\">\r\n\t  <label style=\"text-align: left;\" class=\"col-md-12 control-label\" for=\"textinput\">Text Input<\/label>  \r\n\t  <div class=\"col-md-12\">\r\n\t\t<input id=\"textinput\" name=\"textinput\" type=\"text\" placeholder=\"placeholder\" class=\"form-control input-md\">\r\n\t  <\/div>\r\n\t<\/div>\r\n\r\n\t<!-- Button -->\r\n\t<div class=\"form-group\">\r\n\t  <label class=\"col-md-2 control-label\" for=\"singlebutton\">Single Button<\/label>\r\n\t  <div class=\"col-md-4\">\r\n\t\t<button id=\"singlebutton\" name=\"singlebutton\" class=\"btn btn-primary\">Button<\/button>\r\n\t  <\/div>\r\n\t<\/div>\r\n\r\n\t<\/fieldset>\r\n\t<\/form>\r\n<\/div>\r\n\r\n\r\n<script>\r\n\r\n\t$(document).ready(function(){\r\n\t\trenderUserAdminTable();\r\n\t})\r\n\r\n\r\n\r\n\t\/\/\r\n\t\/\/ tsk, tsk, tsk...\r\n\t\/\/\r\n\tfunction renderUserAdminTable(){\r\n\t\t$.get(\"\/api\/users\")\r\n\t\t.done(function(data){\r\n\t\t\t$(\"#user-table-target\").html(templates[\"admin\/courses\/table.html\"].render(data.results))\r\n\t\t});\r\n\t}\r\n\t\r\n\t\r\n\t\/\/\r\n\t\/\/\r\n\t\/\/\r\n\tfunction delete_user(email){\r\n\t\t$.ajax({\r\n\t\t\t\"method\": \"DELETE\",\r\n\t\t\t\"url\": \"\/api\/users\/\" + email\r\n\t\t}).done(function(d){\r\n\t\t\t\/\/\r\n\t\t\tconsole.log(d);\r\n\t\t\t\r\n\t\t\t\/\/\r\n\t\t\trenderUserAdminTable();\r\n\t\t\t\r\n\t\t})\r\n\t}\r\n\r\n<\/script>",
    "admin\/courses\/table.html": "<table class=\"table table-bordered\" id=\"course-table\">\r\n\t<thead>\r\n\t\t<tr>\r\n\t\t\t<th style=\"text-align: center;\">E-Mail<\/th>\r\n\t\t\t<th style=\"text-align: center;\">Created<\/th>\r\n\t\t\t<th style=\"text-align: center;\">Roles<\/th>\r\n\t\t\t<th><\/th>\r\n\t\t<\/tr>\r\n\t<\/thead>\r\n\t<tbody>\r\n\t\t{{#data}}\r\n\t\t\t<tr>\r\n\t\t\t\t<td style=\"text-align: center;\">{{email}}<\/td>\r\n\t\t\t\t<td style=\"text-align: center;\">{{created}}<\/td>\r\n\t\t\t\t<td style=\"text-align: center;\">{{role_name}}<\/td>\r\n\t\t\t\t<td> <a class=\"btn btn-danger\" onClick=\"delete_user('{{email}}', this)\" href=\"#\" id=\"{{email}}\" class=\"delete-me\">DELETE<\/a><\/td>\r\n\t\t\t<\/tr>\r\n\t\t{{\/data}}\r\n\t<\/tbody>\r\n<\/table>",
    "admin\/index.html": "<h1 style=\"margin-top: 100px\">Site Administration<\/h1>\r\n<hr \/>\r\n<div class=\"col-md-12\">\r\n    <!-- CONTAINER FOR INSTRUCTIONS -->\r\n    <div class=\"col-md-2\" role=\"main\">\r\n        <!-- Nav tabs -->\r\n        <ul class=\"nav nav-pills nav-stacked\" role=\"tablist\">\r\n            <li role=\"presentation\" class=\"active\">\r\n                <a href=\"#users\" aria-controls=\"users\" role=\"tab\" data-toggle=\"tab\">Users<\/a>\r\n            <\/li>\r\n            <li role=\"presentation\">\r\n                <a href=\"#courses\" aria-controls=\"courses\" role=\"tab\" data-toggle=\"tab\">Courses<\/a>\r\n            <\/li>\r\n            <li role=\"presentation\">\r\n                <a href=\"#roles\" aria-controls=\"roles\" role=\"tab\" data-toggle=\"tab\">Roles<\/a>\r\n            <\/li>\r\n            <li role=\"presentation\">\r\n                <a href=\"#reports\" aria-controls=\"reports\" role=\"tab\" data-toggle=\"tab\">Reports<\/a>\r\n            <\/li>\r\n        <\/ul>\r\n    <\/div>\r\n    <!-- CONTAINER FOR TATTLER TABLE-->\r\n    <div class=\"col-md-10\">\r\n        <!-- Tab panes -->\r\n        <div class=\"tab-content\">\r\n            <div role=\"tabpanel\" class=\"tab-pane active\" id=\"users\">\r\n                {{> admin\/users\/index.html}}\r\n            <\/div>\r\n            <div role=\"tabpanel\" class=\"tab-pane\" id=\"courses\">\r\n                {{> create_vendor}}\r\n            <\/div>\r\n            <div role=\"tabpanel\" class=\"tab-pane\" id=\"roles\">\r\n                {{> apv_match}}\r\n            <\/div>\r\n            <div role=\"tabpanel\" class=\"tab-pane\" id=\"reports\">\r\n                {{> apv_match}}\r\n            <\/div>\r\n        <\/div>\r\n    <\/div>\r\n<\/div>\r\n",
    "admin\/users\/edit.html": "\t<h3 style=\"text-align: left; border-width: 0 0 2px; border-color: lightgray;\">Create User: \t\t\t\t\r\n\t\t<input \r\n\t\t\tstyle=\"font-size: 20px; outline: 0; border-width: 0 0 0px; border-color: lightgray; width: 60%;\"\r\n\t\t\ttype=\"email\" \r\n\t\t\tid=\"createUserEmail\" \r\n\t\t\tname=\"createUserEmail\" \r\n\t\t\tplaceholder=\"(Enter Argentic Email Address Here)\" \r\n\t\t\trequired=\"\" \r\n\t\t\tautofocus=\"\" \r\n\t\t\tpattern=\".*argenticmgmt.*\"\r\n\t\t\/>\r\n\t\t<span role=\"button\" onclick=\"create_user()\" style=\"outline: 0; border-width: 0 0 2px; border-color: lightgray;\" class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"><\/span>\r\n\t<\/h3>\r\n\r\n",
    "admin\/users\/index.html": "<div class=\"col-md-12\" id=\"user-table-target\">\r\n\r\n<\/div>\r\n\r\n<div class=\"col-md-12\">\r\n\t{{> admin\/users\/edit.html}}\r\n<\/div>\r\n\r\n\r\n<script>\r\n\r\n\t$(document).ready(function(){\r\n\t\trenderUserAdminTable();\r\n\t})\r\n\r\n\r\n\r\n\t\/\/\r\n\t\/\/ tsk, tsk, tsk...\r\n\t\/\/\r\n\tfunction renderUserAdminTable(){\r\n\t\r\n\t\t\/\/\r\n\t\t\/\/ Get a list of users\r\n\t\t\/\/ and a list of all available roles\r\n\t\t\/\/ then merge the two together so every\r\n\t\t\/\/ user has all possible roles,\r\n\t\t\/\/ and has them checked when they are that role\r\n\t\t\/\/\r\n\t\t$.when(\r\n\t\t\t$.get(\"\/api\/users\"),\r\n\t\t\t$.get(\"\/api\/roles\")\r\n\t\t).then(function(users, roles){\r\n\t\t\r\n\t\t\troles = roles[0].results.data;\r\n\t\t\tusers = users[0].results.data;\r\n\t\t\t\r\n\t\t\t\/\/\r\n\t\t\t\/\/ Create a hash map so\r\n\t\t\t\/\/ we can more easily work with\r\n\t\t\t\/\/ users before converting it back\r\n\t\t\t\/\/ to a straight array\r\n\t\t\t\/\/\r\n\t\t\tvar user_map = {};\r\n\t\t\tusers.forEach(function(user){\r\n\t\t\t\r\n\t\t\t\t\/\/ Load the map\r\n\t\t\t\tuser_map[user.email] = user_map[user.email] || user;\r\n\t\t\t\t\r\n\t\t\t\t\/\/ Give everyone a place to keep roles (mmm...roles)\r\n\t\t\t\tuser_map[user.email].roles = user_map[user.email].roles || {};\r\n\r\n\t\t\t\t\/\/ Loop through the list of all roles (I'm aware this is duplicative, but it is expedient and works...)\r\n\t\t\t\troles.forEach(function(role){\r\n\t\t\t\t\t\/\/ Give the user that role if it doesn't already exist\r\n\t\t\t\t\tuser_map[user.email].roles[role._id] = user_map[user.email].roles[role._id] || JSON.parse(JSON.stringify(role));\r\n\t\t\t\t\t\r\n\t\t\t\t\t\/\/\r\n\t\t\t\t\t\/\/ Set an attribute \"checked\" on the user's role, if the user's role_id = the role's id\r\n\t\t\t\t\t\/\/ N.B. users are duplicated because they can have more than 1 role...\r\n\t\t\t\t\t\/\/ This process clears that up\r\n\t\t\t\t\t\/\/\r\n\t\t\t\t\tif(role._id == user.role_id){\r\n\t\t\t\t\t\tuser_map[user.email].roles[role._id].checked = true;\r\n\t\t\t\t\t}\r\n\t\t\t\t});\r\n\t\t\t});\r\n\t\t\t\r\n\t\t\tusers = Object.values(user_map)\r\n\t\t\t\t\r\n\t\t\tusers.forEach(function(user){\r\n\t\t\t\t\tuser.roles = Object.values(user.roles);\r\n\t\t\t\t});\r\n\t\t\t\t\r\n\t\t\tconsole.log(user_map,users);\r\n\t\t\t$(\"#user-table-target\").html(templates[\"admin\/users\/table.html\"].render({data: users}));\r\n\t\t\r\n\t\t});\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\r\n\t\/\/ DELETE USER\r\n\t\/\/ \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\r\n\tfunction delete_user(email){\r\n\t\t$.ajax({\r\n\t\t\t\"method\": \"DELETE\",\r\n\t\t\t\"url\": \"\/api\/users\/\" + email\r\n\t\t}).done(function(d){\r\n\t\t\trenderUserAdminTable();\r\n\t\t})\r\n\t}\r\n\t\r\n\t\/\/ \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\r\n\t\/\/ (UN)LINK USER TO ROLE\r\n\t\/\/ \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\r\n\tfunction handle_check(el, ev){\r\n\r\n\t\tif(ev.target.checked === false){\r\n\t\t\tvar method = \"DELETE\"\r\n\t\t} else {\r\n\t\t\tvar method = \"POST\"\r\n\t\t}\r\n\r\n\t\t$.ajax({\r\n\t\t\t\"method\": method,\r\n\t\t\t\"url\": `\/api\/users\/${ev.target.dataset.email}\/roles\/${ev.target.dataset.role}`\r\n\t\t})\r\n\t\t.done(function(d){\r\n\t\t\tconsole.log(d);\r\n\t\t})\r\n\t\t.error(function(e){\r\n\t\t\tconsole.log(e);\r\n\t\t})\r\n\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\r\n\t\/\/ CREATE USER\r\n\t\/\/ \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\r\n\tfunction create_user(){\r\n\t\tvar email = document.querySelector(\"#createUserEmail\").value;\r\n\t\r\n\t\t$.ajax({\r\n\t\t\t\"method\": \"POST\",\r\n\t\t\t\"url\": `\/api\/users\/${email}`\r\n\t\t})\r\n\t\t.done(function(d){\r\n\t\t\tconsole.log(d);\r\n\t\t\trenderUserAdminTable();\r\n\t\t})\r\n\t\t.error(function(e){\r\n\t\t\tconsole.log(e);\r\n\t\t})\r\n\t\r\n\t}\r\n<\/script>",
    "admin\/users\/table.html": "<!--\r\n<table class=\"table table-bordered\" id=\"course-table\">\r\n\t<thead>\r\n\t\t<tr>\r\n\t\t\t<th style=\"text-align: center;\">E-Mail<\/th>\r\n\t\t\t<th style=\"text-align: center;\">Created<\/th>\r\n\t\t\t<th style=\"text-align: center;\">Roles<\/th>\r\n\t\t\t<th><\/th>\r\n\t\t<\/tr>\r\n\t<\/thead>\r\n\t<tbody>\r\n\t\t{{#data}}\r\n\t\t\t<tr>\r\n\t\t\t\t<td style=\"text-align: center;\">{{email}}<\/td>\r\n\t\t\t\t<td style=\"text-align: center;\">{{created}}<\/td>\r\n\t\t\t\t<td style=\"text-align: center;\">{{role_name}}<\/td>\r\n\t\t\t\t<td> <a class=\"btn btn-danger\" onClick=\"delete_user('{{email}}', this)\" href=\"#\" id=\"{{email}}\" class=\"delete-me\">DELETE<\/a><\/td>\r\n\t\t\t<\/tr>\r\n\t\t{{\/data}}\r\n\t<\/tbody>\r\n<\/table>\r\n\r\n-->\r\n\r\n{{#data}}\r\n\t<div class=\"col-md-9 card\">\r\n\t\r\n\t\t<div class=\"faq col-xs-12\">\r\n            <div class=\"left-faq col-lg-3 col-md-3 col-sm-3 col-xs-3\">\r\n                User Id\r\n            <\/div>\r\n            <div class=\"right-faq col-lg-9 col-md-9 col-sm-9 col-xs-9\">\r\n\t\t\t\t{{email}}\r\n            <\/div>\r\n        <\/div>\r\n\t\t\r\n\t\t<div class=\"faq col-xs-12\">\r\n            <div class=\"left-faq col-lg-3 col-md-3 col-sm-3 col-xs-3\">\r\n                Created\r\n            <\/div>\r\n            <div class=\"right-faq col-lg-9 col-md-9 col-sm-9 col-xs-9\">\r\n\t\t\t\t{{created}}\r\n            <\/div>\r\n        <\/div>\r\n\t\t\r\n\t\t<div class=\"faq col-xs-12\">\r\n            <div style=\"vertical-align: middle\" class=\"left-faq col-lg-3 col-md-3 col-sm-3 col-xs-3\">\r\n                Roles\r\n            <\/div>\r\n            <div class=\"right-faq col-lg-9 col-md-9 col-sm-9 col-xs-9\">\r\n\t\t\t\t{{#roles}}\r\n\t\t\t\t\t<div style=\"margin-top: 0px;\" class=\"checkbox\">\r\n\t\t\t\t\t\t<label for=\"roles-{{email}}-{{_id}}\">\r\n\t\t\t\t\t\t\t<input data-email=\"{{email}}\" data-role=\"{{_id}}\" oninput=\"handle_check(this,event)\" {{#checked}}checked{{\/checked}} type=\"checkbox\" name=\"roles-{{email}}-{{_id}}\" id=\"roles-{{email}}-{{_id}}\" value=\"{{name}}\">\r\n\t\t\t\t\t\t\t{{name}}\r\n\t\t\t\t\t\t<\/label>\r\n\t\t\t\t\t<\/div>\r\n\t\t\t\t{{\/roles}}\r\n            <\/div>\r\n        <\/div>\r\n\r\n\t\t<div class=\"faq col-xs-12\">\r\n            <div class=\"left-faq col-lg-3 col-md-3 col-sm-3 col-xs-3\">\r\n                Delete\r\n            <\/div>\r\n            <div class=\"right-faq col-lg-9 col-md-9 col-sm-9 col-xs-9\">\r\n\t\t\t\t<a onClick=\"delete_user('{{email}}', this)\" href=\"#\" id=\"{{email}}\" class=\"delete-me\">CLICK HERE<\/a>\r\n            <\/div>\r\n        <\/div>\r\n\r\n\t\t\r\n\t<\/div>\r\n{{\/data}}",
    "course\/course-table.html": "\r\n\r\n<thead>\r\n\t<tr>\r\n\t\t<th>Course ID<\/th>\r\n\t\t<th>Course Name<\/th>\r\n\t\t<th>Due Date<\/th>\r\n\t\t<th>Complete<\/th>\r\n\t<\/tr>\r\n<\/thead>\r\n<tbody>\r\n\t{{#data}}\r\n\t\t<tr>\r\n\t\t\t<td style=\"text-align: center;\">{{_id}}<\/td>\r\n\t\t\t<td style=\"text-align: left;\">{{name}}<\/td>\r\n\t\t\t<td style=\"text-align: left;\">{{#due}}{{due}}{{\/due}}{{^due}}N\/A{{\/due}}<\/td>\r\n\t\t\t<td style=\"text-align: left;\">\r\n\t\t\t\t<label class=\"switch\">\r\n\t\t\t\t\t<input {{status}} onchange=\"markCourse(event, this)\" id=\"course-{{_id}}\" type=\"checkbox\" \/>\r\n\t\t\t\t\t<span class=\"slider\"><\/span>\r\n\t\t\t\t<\/label>\r\n\t\t\t<\/td>\r\n\t\t<\/tr>\r\n\t{{\/data}}\r\n<\/tbody>",
    "course\/index.html": "<!-- css stolen from  https:\/\/www.w3schools.com\/howto\/tryit.asp?filename=tryhow_css_switch -->\r\n\r\n\r\n<style>\r\n.switch {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 60px;\r\n  height: 34px;\r\n}\r\n\r\n.switch input { \r\n  opacity: 0;\r\n  width: 0;\r\n  height: 0;\r\n}\r\n\r\n.slider {\r\n  position: absolute;\r\n  cursor: pointer;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: #ccc;\r\n  -webkit-transition: .4s;\r\n  transition: .4s;\r\n}\r\n\r\n.slider:before {\r\n  position: absolute;\r\n  content: \"\";\r\n  height: 26px;\r\n  width: 26px;\r\n  left: 4px;\r\n  bottom: 4px;\r\n  background-color: white;\r\n  -webkit-transition: .4s;\r\n  transition: .4s;\r\n}\r\n\r\ninput:checked + .slider {\r\n  background-color: #2196F3;\r\n}\r\n\r\ninput:focus + .slider {\r\n  box-shadow: 0 0 1px #2196F3;\r\n}\r\n\r\ninput:checked + .slider:before {\r\n  -webkit-transform: translateX(26px);\r\n  -ms-transform: translateX(26px);\r\n  transform: translateX(26px);\r\n}\r\n\r\n\/* Rounded sliders *\/\r\n.slider.round {\r\n  border-radius: 34px;\r\n}\r\n\r\n.slider.round:before {\r\n  border-radius: 50%;\r\n}\r\n\r\n<\/style>\r\n\r\n<h1 style=\"margin-top: 100px;\">Hello {{email-address}}<\/h1>\r\n\r\n<p class=\"lead\">\r\n\tBelow is a list of courses and what not that you're responsible for:\r\n<\/p>\r\n\r\n<table class=\"table table-bordered\" id=\"course-table\"><\/table>\r\n\r\n\r\n<script>\r\n\t\/\/\r\n\t\/\/ Load courses first...\r\n\t\/\/\r\n\t$.get(\"\/api\/users\/\" + window.globals.session[\"email-address\"] + \"\/courses\/\")\r\n\t.done(function(courses){\r\n\t\t$(\"#course-table\").html(window.templates[\"course\/course-table.html\"].render({\"data\": courses.results.data}));\r\n\t})\r\n\t.error(function(err){\r\n\t\tconsole.log(\"ERR\",err);\r\n\t})\r\n\r\n\r\n\t\/\/\r\n\t\/\/ Function to record what the user changed\r\n\t\/\/\r\n\tfunction markCourse(ev, el){\r\n\t\r\n\t\t\/\/\r\n\t\t\/\/ Get the course ID out of the event...\r\n\t\t\/\/\r\n\t\tvar id = ev.target.id;\r\n\t\tvar checked = ev.target.checked;\r\n\t\t\r\n\t\tif(checked){\r\n\t\t\tchecked = \"checked\";\r\n\t\t} else {\r\n\t\t\tchecked = \"\";\r\n\t\t}\r\n\t\t\r\n\t\tid = id.match(\/[0-9]+\/)[0];\r\n\t\r\n\t\t$.ajax({\r\n\t\t\t\"url\": \"\/api\/users\/\" +window.globals.session[\"email-address\"]+ \"\/courses\/\" +id+ \"\/status\",\r\n\t\t\t\"method\": \"POST\",\r\n\t\t\t\"data\": {\r\n\t\t\t\t\"checked\": checked\r\n\t\t\t}\r\n\t\t})\r\n\t}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<\/script>",
    "index\/email-form.html": "<div class=\"\">\r\n  <form id=\"emailForm\" name=\"emailForm\" class=\"form-signin\" method=\"POST\" action=\"\/api\/validate?__redirect__=\/training\/\">\r\n\t<label for=\"inputEmail\" class=\"sr-only\">Email address<\/label>\r\n\t<input \r\n\t\ttype=\"email\" \r\n\t\tid=\"inputEmail\" \r\n\t\tname=\"inputEmail\" \r\n\t\tclass=\"form-control\" \r\n\t\tplaceholder=\"Email address\" \r\n\t\trequired=\"\" \r\n\t\tautofocus=\"\" \r\n\t\tpattern=\".*argenticmgmt.*\"\r\n\t\t\r\n\t><\/input>\r\n\t<button style=\"margin-top: 20px;\" class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in<\/button>\r\n  <\/form>\r\n<\/div>",
    "index\/new.html": "<div class=\"row\" style=\"margin-top: 200px;\">\r\n\t<h1 class=\"cover-heading\">Don't Be A Dummy.<br\/> Document Your Training<\/h1>\r\n\t<p class=\"lead\">Fill out your e-mail address below and hit SUBMIT<br \/>You'll get an e-mail giving you access.<\/p> \r\n\r\n\t{{> index\/email-form.html}}\r\n<\/div>",
    "index\/pending.html": "<div class=\"row\" style=\"margin-top: 200px;\">\r\n\t<h1 class=\"cover-heading\">Thanks! You Should Get an E-Mail Shortly<\/h1>\r\n\t<p class=\"lead\">If not, <code>CHECK YOUR SPAM!<\/code> Not there? Fill out your e-mail address below and hit SUBMIT<br \/>If you're still having problems; that sucks...<\/p> \r\n\r\n\t{{> index\/email-form.html}}\r\n<\/div>",
    "index\/valid.html": "<div class=\"row\" style=\"margin-top: 200px;\">\r\n\t<h1 class=\"cover-heading\">You are logged in as {{email-address}}<\/h1>\r\n\t<p class=\"lead\">Click on <a href=\".\/courses\">COURSES<\/a> to see what courses you are responsible for.<\/p> \r\n<\/div>",
    "main.html": "    <nav class=\"navbar navbar-default navbar-fixed-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n            <span class=\"sr-only\">Toggle navigation<\/span>\r\n            <span class=\"icon-bar\"><\/span>\r\n            <span class=\"icon-bar\"><\/span>\r\n            <span class=\"icon-bar\"><\/span>\r\n          <\/button>\r\n          <a class=\"navbar-brand\" href=\"\/training\/\">Project name<\/a>\r\n        <\/div>\r\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\r\n          <ul class=\"nav navbar-nav\">\r\n            <li {{#state.home}}class=\"active\"{{\/state.home}}><a href=\"\/training\/\">Home<\/a><\/li>\r\n\t\t\t{{#valid}}\r\n            <li {{#state.courses}}class=\"active\"{{\/state.courses}}><a href=\"\/training\/courses\">Courses<\/a><\/li>\r\n\t\t\t<li {{#state.admin}}class=\"active\"{{\/state.admin}}><a href=\"\/training\/admin\">Admin<\/a><\/li>\r\n\t\t\t<li><a href=\"\/api\/validate\/reset\">Log Out<\/a><\/li>\r\n            {{\/valid}}\r\n          <\/ul>\r\n        <\/div><!--\/.nav-collapse -->\r\n      <\/div>\r\n    <\/nav>\r\n\t\r\n\t<!--\r\n    <div class=\"site-wrapper\">\r\n      <div class=\"site-wrapper-inner\">\r\n        <div class=\"cover-container\">\r\n          <div class=\"inner cover\">\r\n\t-->\r\n\t<div class=\"container\">\r\n\t\t<div id=\"state-message\">\r\n\t\t\t{{> partial}}\r\n\t\t<\/div>\r\n\t<\/div>\r\n    <!--\r\n\t\t  <\/div>\r\n        <\/div>\r\n      <\/div>\r\n    <\/div>\r\n\t-->\r\n"
}