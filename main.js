/*
Bring data in from google sheets - 
By Aydin Akcasu
http://bl.ocks.org/simzou/ddddae015061db94f2fc
https://coderwall.com/p/duapqq/use-a-google-spreadsheet-as-your-json-backend
https://ctrlq.org/code/20004-google-spreadsheets-json
https://developers.google.com/gdata/samples/spreadsheet_sample

Postman:
https://spreadsheets.google.com/feeds/list/1c6NgduBK8Wh6z_K5vEUj28e2C8tU17vJurCrlxtJ27Q/od6/public/values?alt=json

Create a form from a spreadsheet template.
https://www.youtube.com/watch?v=6MMlRh_ldhQ


https://developers.google.com/apps-script/reference/forms/

Other sheets:
http://damolab.blogspot.com/2011/03/od6-and-finding-other-worksheet-ids.html
https://spreadsheets.google.com/feeds/worksheets/1c6NgduBK8Wh6z_K5vEUj28e2C8tU17vJurCrlxtJ27Q/public/full?alt=json


http://damolab.blogspot.com/2011/03/od6-and-finding-other-worksheet-ids.html
https://codepen.io/dotnetworm/pen/bZjzGk
http://damolab.blogspot.com/2011/03/google-spreadsheets-publish-to-web.html

*/



$(document).ready(function(){
	$.getJSON(url, function(json){
		var data = clean_google_sheet_json(json);
	    compile_and_insert_html('#table_template','#myTable',data);
	    compile_and_insert_html('#section_template','#mySection',data);
	    compile_and_insert_html('#grid_template','#myGrid',data);
	});

});

// Takes in template id, compiles the template to html using data json object
// and then inserts it into given div id
function compile_and_insert_html(template_id, div_id, data) {
	var template = _.template($(template_id).html());
	var template_html = template({
		'rows': data
	});
	$(div_id).html(template_html);
}


// takes in JSON object from google sheets and turns into a json formatted 
// this way based on the original google Doc
// [
// 	{
// 		'column1': info1,
// 		'column2': info2,
// 	}
// ]
function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
}