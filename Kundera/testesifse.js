$('#submit1, #submit2').click(function () {
    if (this.id == 'submit1') {
        alert('Submit 1 clicked');
    }
    else if (this.id == 'submit1') {
        alert('Submit 2 clicked');
    }
});
//-----------------------------------------------------------------

if($("input[@name='class']:checked").val() == 'A')

//------------------------------------------------------------------

$("#id").click(function()
{
   $(this).data('clicked', true);
});

if($("#id").data('clicked'))
{
   // code here 
}

//---------------------------------------------------------------------

jQuery(':button').click(function () {
    if (this.id == 'button1') {
        alert('Button 1 was clicked');
    }
    else if (this.id == 'button2') {
        alert('Button 2 was clicked');
    }
});

//----------------------------------------------
var list = new Array();
$.getJSON("json.js", function(data) {
    $.each(data, function(i, item) {
        console.log(item.text);
        list.push(item.text);
    });
    console.log(list.length);
});