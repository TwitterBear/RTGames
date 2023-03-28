var numSlots = 0;

function start()
{
	setTimeout(() => scroll("slot1"), 0);
	setTimeout(() => scroll("slot2"), 500);
	setTimeout(() => scroll("slot3"), 1000);
}

function scroll(id)
{
	var slot = document.getElementById(id);
	var res = Math.round(Math.random() * numSlots + 1);
	Array.from(slot.children).forEach((c)=>{
		c.style.top = "-" + (res * 4) + "rem";
	});
}

function buildWheels()
{
	var from = document.getElementById("from");
	var to = document.getElementById("to");
	
	var iFrom = from.value;
	var iTo = to.value;
	var numValues = iTo - iFrom + 1;
	numSlots = 0;
	
	while(numSlots < 200)
	{
		numSlots += numValues;
	}
	
	createWheel("slot1", iFrom, numValues, numSlots);
	createWheel("slot2", iFrom, numValues, numSlots);
	createWheel("slot3", iFrom, numValues, numSlots);
	
	// for(var i = 0; i < numSlots; i++)
	// {
		// var div = document.createElement("div");
		// div.classList.add("entry");
		// div.innerText = i;
		// document.getElementById("slot1").appendChild(div);
	// }
	
	// for(var i = 0; i < numSlots; i++)
	// {
		// var div = document.createElement("div");
		// div.classList.add("entry");
		// div.innerText = i;
		// document.getElementById("slot2").appendChild(div);
	// }
	
	// for(var i = 0; i < numSlots; i++)
	// {
		// var div = document.createElement("div");
		// div.classList.add("entry");
		// div.innerText = i;
		// document.getElementById("slot3").appendChild(div);
	// }
	
}

function createWheel(id, from, vals, size)
{
	var spread = document.querySelector('input[name="spread"]:checked').value;
	document.getElementById(id).textContent = "";
	var map = new Map();
	var section = 1;
	
	if (spread == 2)
	{
		section = vals;
	}
		
	var currMax = vals;
	var currMin = Math.abs(from);
	var currVal = Math.abs(from);
	var skip = false;
	for(var i = 0; i < size; i++)
	{
		var div = document.createElement("div");
		div.classList.add("entry");
		
		if (!map.has(Math.abs(currVal)))
		{
			map.set(Math.abs(currVal), 0);
		}
		map.set(Math.abs(currVal), Math.abs(map.get(Math.abs(currVal))) + 1);
		div.innerText = currVal++;
		document.getElementById(id).appendChild(div);
					
		if (currVal > currMax)
		{
			if (spread == 1)
			{
				currVal = from;
				if (currMax == section)
				{
					currMax = vals;
				}
				else
				{
					currMax -= section;
				}
			}
			else if (spread == 2)
			{
				currVal = from;
			}
			else if (spread == 3)
			{
				if (currMin > +vals - +section)
				{
					currMin = Math.abs(from);
				}
				else
				{
					currMin = currMin + section;
				}
				currVal = currMin;
			}
			else if (spread == 4)
			{
				if (currMin > +vals - +section)
				{
					if (!skip)
					{
						currMin = Math.abs(from);
						skip = true;
					}
					else
					{
						skip = false;
					}
				}
				else
				{
					currMin = currMin + section;
				}
				currVal = currMin;
			}
		}
	}
	
	buildSpreadTable(map, size);
}

function buildSpreadTable(map, total)
{
	var it = map[Symbol.iterator]();
	document.getElementById("spread_table_values").textContent = "";
	
	for (const [key, value] of map) {
		var div = document.createElement("div");
		div.innerText = key + ": " + (Math.abs(value) * 100 / total).toFixed(2) + "%";
		document.getElementById("spread_table_values").appendChild(div);
	}
}