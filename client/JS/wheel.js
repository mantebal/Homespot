

function setupColourWheel(){
	
	Array.from(document.getElementsByClassName("colorContainer")).forEach(function(elem){
		let mouseOff = false;
		elem.addEventListener("mouseover",function(){
			
			for (let i = 0; i < elem.childNodes.length; i++) {
				if (elem.childNodes[i] instanceof HTMLImageElement && elem.childNodes[i].className.includes("part")) {
					let newStyle = elem.childNodes[i].style.transform.replace(/0.0001/, "1");
					elem.childNodes[i].style.transform = newStyle;
					
				}        
			}
			mouseOff = false;		
		});
		elem.addEventListener("mouseout",function(){			
			for (let i = 0; i < elem.childNodes.length; i++) {
				if (elem.childNodes[i] instanceof HTMLImageElement && elem.childNodes[i].className.includes("part")) {
					let newStyle = elem.childNodes[i].style.transform.replace(/1/, "0.0001");
					elem.childNodes[i].style.transform = newStyle;
				}        
			}
			mouseOff = false;		
		});
		
	});
	Array.from(document.getElementsByClassName("part")).forEach(function(elem){
		let mouseOut = true;
		elem.addEventListener("mouseout",function(){
			mouseOut = true;
		});
		elem.addEventListener("mouseover",function(){
			if(mouseOut){
				let center = Array.from(elem.parentNode.childNodes).find(function(each){
					return each.className == "center";
				});
				changeLight(...elem.parentNode.id.split(" "),!("#000000"==elem.name),elem.name);
				center.style.background = elem.name;
				elem.parentNode.name = elem.name;
				mouseOut = false;
			}
		});
	});
	if(document.body.offsetWidth < 999){
		Array.from(document.getElementsByClassName("colorContainer")).forEach(function(elem){
			elem.style.transform = "scale(0.7)";
		});
	}
}


setupColourWheel();