'use strict';
$(function() { 

	$("#get-lectures").on('click', function() {
		$.get("/api/lectures", function(data) {
			var result = "";
			for (var i = 0; i < data.length; i++) {
				result += "<li>Title: " + data[i].title + "<br />Subject: " + data[i].subject + "<br />ID: " + data[i]._id + "<br /><button class='lecture-attendance' id='" + data[i]._id + "'>Show Attendance</button></li>"; 
			};
			$("#display-lectures").html(result);
		});
	});

	$("ul").on('click', "button", function() {
		var id = $(this).attr("id");
		console.log(id);
		$.get("api/lectures/" + id + "/attendance", function(data) {
			$(".student-info").html("");
			var result = "";
			for (var i = 0; i < data.length; i++) {
				result += "<li class='student-info'>Student " + i + " ID: " + data[i] + "</li>";
			};
			$("#" + id).after("<ul class='student-info'>" + result + "</ul>");
			$("#" + id).text("Hide Attendance");
			$("#" + id).attr("id", id + "-hide");
		});
	});
});
