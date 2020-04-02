var url = ("https://"+window.location.hostname+"/api") || "https://lyne1-17.wbs.uni.worc.ac.uk/api";

function changeLight(username,lightId,turnOn,color){
    color = color.substring(1);
    fetch(url+"/switchLights", {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'mode':'cors'
      },
      body: JSON.stringify({ username, turnOn, lightId, color })
    });
    setTimeout(()=>{
      fetch(url+"/switchLights", {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'mode':'cors'
        },
        body: JSON.stringify({ username, turnOn, lightId, color })
      });
    },500);
}




function deleteDevice(username,deviceId,type){
  fetch(url+"/removeDevice", {
    method: 'delete',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, deviceId, type})
  });
  document.getElementById(deviceId).style.display = "none";
}