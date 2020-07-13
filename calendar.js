var p = MindFusion.Scheduling;


var calendar = new p.Calendar(document.getElementById("calendar"));

calendar.theme = "peach";


calendar.render();

calendar.itemCreating.addEventListener(handleItemCreating);
calendar.itemModified.addEventListener(handleItemModified);
calendar.itemDeleting.addEventListener(handleItemDeleting);

function handleItemDeleting (sender, args )
{	
		args.cancel = true;
		showWarningTimeCount("delete not allow");
}

function handleItemCreating (sender, args )
{
	if(itemOnSunday(args.item) || itemTooLateCount(args.item))
	{
		args.cancel = true;
		showWarningTimeCount("don't consider sunday, as well as don't set any event after 8 pm");
	}
}

function handleItemModified (sender, args )
{
	if(itemOnSunday(args.item) || itemTooLateCount(args.item))
	{
		args.item.startTime = args.oldItem.startTime;
		args.item.endTime = args.oldItem.endTime;
		
		showWarningTimeCount("cannot include event Sunday or take place after 8PM");
	}
}

function itemOnSunday (item)
{
	var endTime = item.endTime.clone().addMilliseconds(-1);
	
	if(item.startTime.dayOfWeek == 0 ||
		 endTime.dayOfWeek == 0	)
		return true;
		
		var startTime = item.startTime.clone();
		
		while(startTime.compareTo(endTime) <= 0)
		{	     
			 
			 if(startTime.dayOfWeek == 0)					  
				 return true;		    
			
			 startTime.addDays(1);
		}
		
		return false;
}


function itemTooLateCount( item )
{
	if(item.startTime.hour > 20 || item.endTime.hour > 20)
		return true;
	
	return false;
}

function showWarningTimeCount (message_text)
{
	document.getElementById('alrt').innerHTML=message_text; 
    setTimeout(function() {document.getElementById('alrt').innerHTML='';},5000);
	
}
}
