(function(){
  let num = 0;
  let prevVal = "";
  if(localStorage.getItem("hyapi") == null){
    localStorage.setItem("hyapi", prompt("Enter a Hypixel API key (/api on mc.hypixel.net):", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"))
  }
  setInterval(function() {
    document.querySelector("input").style.left = Math.floor((innerWidth - 600) / 2).toString() + "px";
    document.querySelector("p").style.left = Math.floor((innerWidth - 1200) / 2).toString() + "px";
  }, 10);
  setInterval(async function () {
    if(document.querySelector("input").value !== prevVal){
      prevVal = document.querySelector("input").value;
      let valCache = prevVal;
      document.querySelector("p").innerHTML = "Loading...";
      await sleep(500);
      if(valCache === prevVal){
        fetch("https://api.hypixel.net/player?name=" + prevVal + "&key=" + localStorage.getItem("hyapi"))
        .then(r => r.json())
        .then(j => {
          if(j.player == null){
            document.querySelector("p").innerHTML = "Player not found";
          } else {
            let xp = j.player.stats.Bedwars.Experience;
            let lvl = 0;
            let done = false;
            while(!done){
              xp -= 500;
              if(!(xp < 0))
              lvl++;
              xp -= 1000;
              if(!(xp < 0))
              lvl++;
              xp -= 2000;
              if(!(xp < 0))
              lvl++;
              xp -= 3500;
              if(!(xp < 0))
              lvl++;
              for(let i = 0; i < 96; i++){
                xp -= 5000;
                if(!(xp < 0)){
                  lvl++;
                } else {
                  done = true;
                }
              }
            }
            document.querySelector("p").innerHTML = "BW lvl: " + lvl.toString();
          }
        });
      }
    }
  }, 10);
  function sleep(ms){
    return new Promise(r => setTimeout(r, ms));
  }
})();
