window.globals = window.globals || {};
window.globals.utilities = window.globals.utilities || {};


// ///////////////////////////////////////////////////////////////////////
// 
// GLOBAL FUNCTION TO FIRE OFF THE MODAL!
//
// GIVE ME AN OBJECT WITH 2 ATTRS:
// 1. HEADER - PLAIN TEXT
// 2. BODY - HTML OR TEXT...DON'T CARE
//
// ///////////////////////////////////////////////////////////////////////
window.globals.utilities.show_modal = function show_modal(title, body, large){

	var data = {
		"title": title,
		"body": body
	};
	
	if(large){
		data.large = true;
	}

	var html = window.templates["modal.html"].render(data);
	$("#the_modal").html(html).modal();
}




// ///////////////////////////////////////////////////////////////////////
// TOGGLER:
//
// Quick and dirty function for a hide / show-more button to use.
//
// Works by toggling visibility on the first sibling class of `.toggler` to on
// and `.anti-toggler`
//
// ///////////////////////////////////////////////////////////////////////
window.globals.utilities.toggler = function(el, ev){
	
	$(ev.target.parentElement.querySelector(".toggler")).fadeToggle()
	$(ev.target.parentElement.querySelector(".anti-toggler")).fadeToggle()
	
	if(ev.target.innerText == "+"){
		ev.target.innerText = "-";
	} else {
		ev.target.innerText = "+";
	}
	
}







// //////////////////////////////////////
// TAKE A 2 D ARRAY AND FORCE IT TO DOWNLOAD
// //////////////////////////////////////
window.globals.utilities.array_to_download = function(data, filename) {
    var buffer;

    if (typeof data === "object") {
        data = data.join("\n");
        buffer = data;
    } else {
        // FIND OUR RTRN CHR
        var b = String.fromCharCode(10);
        // CREATE OUR REGEXP
        var rxp = new RegExp(b, "gi");
        // CLEAN UP THE QUOTE MARKS
        data = data.replace(/\"/gi, '""');
        // SET A QUOTE AT THE BEGINNING & END OF EACH LINE
        data = data.replace(/(^|$)/gi, '"');
        // DO WHAT A NORMAL REGEXP CAN'T DO UNFORTUNATELY...
        data = data.replace(rxp, '"' + b + '"');
        // PUT "," WHERE EACH TAB IS        
        data = data.replace(/\t/gi, '","');
        // PUSH THE DATA TO A CLEAN BUFFER
        buffer = data;
    }

    var blob = new Blob([buffer], {
        "type": "text/csv;charset=utf8;"
    });

    var link = document.createElement("a");
    link.setAttribute("href", window.URL.createObjectURL(blob));
    link.setAttribute("download", filename);

    link.click();
}


// //////////////////////////////////////
// CONVERT AN HTML TABLE INTO A 2d ARRAY
// //////////////////////////////////////
window.globals.utilities.table_to_array = function(table) {
    return Array.from(table.rows)
        .map(function (tr) {
            return Array.from(tr.cells).map(function (td) {
                return JSON.stringify(td.innerText);
            });
        });
}



// //////////////////////////////////////
// SORT ANY TABLE GIVEN A TH ELEMENT
// //////////////////////////////////////
window.globals.utilities.sort_table = function(th) {

    var getCellValue = function (tr, idx) {
        return tr.children[idx].innerText || tr.children[idx].textContent;
    }

    var comparer = function (idx, asc) {
        return function (a, b) {
            return function (v1, v2) {
                return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
            }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
        }
    };

    // do the work...
    var table = th.closest('table').children[1]

    Array.from(table.querySelectorAll('tr'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(function (tr) {
            table.appendChild(tr)
        });

}

// //////////////////////////////////////
// CONVERT ARRAY OF OBJECTS INTO A 2D ARRAY
// //////////////////////////////////////
window.globals.utilities.objects_to_array = function(ary) {
    return [Object.keys(ary[0])].concat(ary.map(function (x) {
        return Object.values(x).map(function (d) {
            return JSON.stringify(d).replace(/\\"/gi, '""');
        })
    }));
}




















	// //////////////////////////////////////
	// markCourse - Function to mark a course as complete or incomplete
	// //////////////////////////////////////
	window.globals.utilities.markCourse = function(ev, el){

	
		//
		// Get the course ID out of the event...
		//
		var id = ev.target.id;
		var checked = ev.target.checked;
		var email;
		
		if(ev.target.dataset.email){
			email = ev.target.dataset.email;
		} else {
			email = window.globals.session["email-address"];
		}
		
		if(checked){
			checked = "checked";
		} else {
			checked = "";
		}
		
		id = id.match(/[0-9]+/)[0];
	
		$.ajax({
			"url": "/api/users/" + email + "/courses/" +id+ "/status",
			"method": "POST",
			"data": {
				"checked": checked
			}
		})
	}
