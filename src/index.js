import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';

var raffles = {};
var whitelists = {};


async function connect_aleph() {
  try{
    const allInjected = await web3Enable('Alephkazam Walletconnect');

	
    const allAccounts = await web3Accounts();  
    if (allAccounts.length == 0){
      throw "error: no account";
    }
    localStorage.setItem("wallet_type", allAccounts[0].meta.source);
    localStorage.setItem("wallet_address", allAccounts[0].address);
    window.location.href = "./collector.html";
  }
  catch (err){
    console.log(err);
  }
  
  
}
window.connect_aleph = connect_aleph;





async function get_name() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("h1x").textContent = "Hi ".concat(walletName);
}
window.get_name = get_name;

async function load_creator() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  var root = document.getElementById("cr").innerHTML;
  var el = `
  <div class="shadowContainer">
            <p class="smText">
              <span>Project Status</span>. Currently Accepting WL Slots
            </p>
          </div>
          <div class="shadowContainer">
            <div class="row text-center">
              <div class="col-lg-3">
                <a class="projectDetailLink open" href="#">
                  <i class="fa-solid fa-circle-check"></i>
                  <br />
                  OPEN LIST
                </a>
              </div>
              <div class="col-lg-3">
                <a class="projectDetailLink" href="#">
                  <i class="fa-solid fa-circle-check"></i>
                  <br />
                  COLLECT ENTRIES
                </a>
              </div>
              <div class="col-lg-3">
                <a class="projectDetailLink" href="#">
                  <i class="fa-solid fa-circle-check"></i>
                  <br />
                  PICK WINNERS
                </a>
              </div>
              <div class="col-lg-3">
                <a class="projectDetailLink" href="#">
                  <i class="fa-solid fa-circle-check"></i>
                  <br />
                  NOTIFY WINNERS
                </a>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8">
              <h2 class="subHeading">Details</h2>
              <div class="shadowContainer detailsContainer">
                <div class="row text-center">
                  <div class="col-lg-4">
                    <div id="md1" class="smText odd">Feb 28, 2023</div>
                    <div  class="smText">MINT DATE</div>
                  </div>
                  <div class="col-lg-4">
                    <div id="mp" class="smText odd">
                      2.0 <img src="./img/colorful-icon.png" alt="" />
                    </div>
                    <div class="smText">MINT PRICE</div>
                  </div>
                  <div class="col-lg-4">
                    <div id="sz" class="smText odd">1,000</div>
                    <div class="smText"> SIZE</div>
                  </div>
                </div>
              </div>
              <div class="validHeader">
                <h2 class="subHeading">Valid Entries</h2>
                <a href="#"
                  >See Entry List <i class="fa-solid fa-arrow-right"></i
                ></a>
              </div>
              <div class="shadowContainer odd validContainer">
                <h1 id="valid1" class="totals">0</h1>
                <div class="row">
                  <div class="col-lg-6">
                    <div id="valid2" class="totalsContainer">0 Total Entries</div>
                  </div>
                  <div class="col-lg-6">
                    <div class="totalsContainer red">
                      0 Disqualified - Clean Bots
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <h2 class="subHeading">Schedule</h2>
              <div class="shadowContainer odd schedule">
                <div class="scheduleCotents">
                  <div class="scheduleCotent">
                    <span class="point"></span>
                    <div class="smText">REGISTRATION OPENS</div>
                    <div id="ro" class="smText odd">Jan. 30, 2023 5:14 a.m. EST</div>
                  </div>
                  <div class="scheduleCotent">
                    <span class="point"></span>
                    <div class="smText">REGISTRATION CLOSES</div>
                    <div id="rc" class="smText odd">Feb. 19, 2023 5:14 a.m. EST</div>
                  </div>
                  <div class="scheduleCotent">
                    <span class="point"></span>
                    <div class="smText">RAFFLE/PICK WINNERS</div>
                    <div id="win" class="smText odd">Feb. 21, 2023 12:14 p.m. EST</div>
                  </div>
                  <div class="scheduleCotent">
                    <span class="point"></span>
                    <div class="smText">NOTIFY WINNERS</div>
                    <div class="smText odd">Event is Ongoing</div>
                  </div>
                  <div class="scheduleCotent">
                    <span class="point"></span>
                    <div class="smText">MINT DATE</div>
                    <div id="md2" class="smText odd">Feb. 28, 2023</div>
                  </div>
                </div>
              </div>
            </div>
  `;
  var isContest = localStorage.getItem("contest");
  console.log(isContest);
  if (isContest == 1){
    document.getElementById("cr").innerHTML = root + el;
    
  
    
    
    var siz = localStorage.getItem("size");
    var mp = localStorage.getItem("mint_price");
    var md = localStorage.getItem("mint_date");
    var rs = localStorage.getItem("reg_start");
    var re = localStorage.getItem("reg_end");
    document.getElementById("ro").textContent = rs.replace("T"," "); 
    document.getElementById("rc").textContent = re.replace("T"," ");
    document.getElementById("md2").textContent = md.replace("T"," ");
    document.getElementById("win").textContent = re.replace("T"," ");
    document.getElementById("md1").textContent = md.replace("T"," ");
    document.getElementById("sz").textContent = siz;
    document.getElementById("mp").textContent = mp.concat(" ");
    document.getElementById("mp").innerHTML += `<img src="./img/colorful-icon.png" alt="" />`;
    var hasEntered = localStorage.getItem("entered");
    if (hasEntered == 1){
      document.getElementById("valid1").textContent = "1";
      document.getElementById("valid2").textContent = "1 Total Entries";
    }
  }
  else {
    document.getElementById("wlmake").style.display = "inline";
  }
  
}
window.load_creator = load_creator;

async function load_leaderboard() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  var hasEntered = localStorage.getItem("entered");
  console.log("hui");
  var gp = localStorage.getItem("goodpoints")
  console.log(gp);
  var root = document.getElementById("point_body");
  var el = document.createElement("tr");
  el.innerHTML = ` <tr >
  <td >
    <div style="margin-left: 4%;">
      Zias
    </div>
  </td>
  
  <td>
    <div>
        12
    </div>
  </td>
  <td>
    <div style="display:block;width: 100%;text-align:center;">
        1
    </div>
    
  </td>
</tr>`
  var childlist = el.children;
  var el1 = childlist[0].children[0];
  var el2 = childlist[1].children[0];
  var el3 = childlist[2].children[0];
  el1.textContent = "You";
  el1.style.color = "red";
  el2.textContent = localStorage.getItem("goodpoints");
  el2.style.color = "red";
  el3.textContent = "420";
  el3.style.color = "red";
  if (localStorage.getItem("goodpoints") == "15"){
    el3.textContent = "68";
  }
  console.log(el1);
  console.log(el2);
  console.log(el3);
  root.appendChild(el);
  
  
}
window.load_leaderboard = load_leaderboard;

async function load_earn() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  var wallet = localStorage.getItem("wallet");
  if (wallet == "Stoic"){
    document.getElementById("stoic_top").textContent = "Completed";
    document.getElementById("stoic_all").textContent = "Completed";
    document.getElementById("plug_top").textContent = "You Are Using Stoic";
    document.getElementById("plug_all").textContent = "You Are Using Stoic";
    document.getElementById("bitf_top").textContent = "You Are Using Stoic";
    document.getElementById("bitf_all").textContent = "You Are Using Stoic";
  }
  else if (wallet == "Plug"){
    document.getElementById("plug_top").textContent = "Completed";
    document.getElementById("plug_all").textContent = "Completed";
    document.getElementById("stoic_top").textContent = "You Are Using Plug";
    document.getElementById("stoic_all").textContent = "You Are Using Plug";
    document.getElementById("bitf_top").textContent = "You Are Using Plug";
    document.getElementById("bitf_all").textContent = "You Are Using Plug";
  }
  else if (wallet == "Bitfinity"){
    document.getElementById("bitf_top").textContent = "Completed";
    document.getElementById("bitf_all").textContent = "Completed";
    document.getElementById("plug_top").textContent = "You Are Using Bitfinity";
    document.getElementById("plug_all").textContent = "You Are Using Bitfinity";
    document.getElementById("stoic_top").textContent = "You Are Using Bitfinity";
    document.getElementById("stoic_all").textContent = "You Are Using Bitfinity";
  }
  else {}
  var hasEntered = localStorage.getItem("entered");
  if (hasEntered == 1){
    document.getElementById("join_list_top").textContent = "Completed";
    document.getElementById("join_list_all").textContent = "Completed";
  }
  
}
window.load_earn = load_earn;

async function load_wallet() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  
}
window.load_wallet = load_wallet;

async function load_club() {
  
  
  navigator.geolocation.getCurrentPosition(success);
  await new Promise(r => setTimeout(r, 2000));
  document.getElementById("inf").style.visibility = "visible";
  document.getElementById("nf").textContent = "None Found"
  
}
window.load_club = load_club;

function success(pos) {
  const crd = pos.coords;
  var lat = crd.latitude.toString();
  var lon = crd.longitude.toString();
  
  document.getElementById("geo").textContent = "Your Location: ".concat(lat.concat(", ").concat(lon));
  var map = L.map('map').setView([crd.latitude, crd.longitude], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
  var marker = L.marker([crd.latitude, crd.longitude]).addTo(map);
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

async function load_cal() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  var rc = localStorage.getItem("reg_end");
  document.getElementById("icpvg1").textContent = rc.replace("T"," ");
  var spots = localStorage.getItem("winners");
  document.getElementById("icpvg2").textContent = "    ".concat(spots).concat("   ");
  var nat = localStorage.getItem("nature");
  document.getElementById("icpvg3").textContent = (document.getElementById("icpvg3").textContent).concat(": ").concat(nat);
  var hasEntered = localStorage.getItem("entered");
  if (hasEntered != 1){
    document.getElementById("icpvg4").textContent = "Not Entered";
  }
}
window.load_cal = load_cal;

async function load_explore() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  var isContest = localStorage.getItem("contest");
  if (isContest == 1){
    var hasEntered = localStorage.getItem("entered");
    if (hasEntered != 1){
      document.getElementById("icpvg").textContent = "REGISTER";
    }
    else {
      document.getElementById("icpvg").textContent = "REGISTERED";
    }
    
  }
  
  
  
}
window.load_explore = load_explore;

async function load_act() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  var hasEntered = localStorage.getItem("entered");
  if (hasEntered == 1){
    document.getElementById("icpv_tr").style.display = "table-row";
    var md = localStorage.getItem("mint_date");
    var mp = localStorage.getItem("mint_price");
    var win = localStorage.getItem("winners");
    document.getElementById("icpvg1").textContent = md.replace("T"," ");
    document.getElementById("icpvg2").textContent = mp.concat(" ICP");
    document.getElementById("icpvg3").textContent = win.concat(" Spots");
  }
}
window.load_act = load_act;

async function load_list() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  var hasEntered = localStorage.getItem("entered");
  
  if (hasEntered == 1){
    document.getElementById("icpvg").style.display = "table-row";
    document.getElementById("stat_change").textContent = "Registered ";
    document.getElementById("reg_change").textContent = "Registered Today";
    var md = localStorage.getItem("mint_date");
    document.getElementById("icpvg2").textContent = md.replace("T", " ");
    console.log(hasEntered);
    var e = document.getElementById("stat_change");
    var el = document.createElement('img');
    el.src = "./img/project-table-icon-1.svg";
    el.class = "projectUserIcon";
    e.appendChild(el);
    console.log(el);
    
    
  }
}
window.load_list = load_list;

async function flush() {
  localStorage.setItem("entered", 0);
  localStorage.setItem("disco", 0);
  localStorage.setItem("contest", 0);
  localStorage.setItem("nature", "");
  localStorage.setItem("winners", "");
  localStorage.setItem("entrants", "");
  localStorage.setItem("prize", "");
  localStorage.setItem("size", "");
  localStorage.setItem("mint_price", "");
  localStorage.setItem("mint_date", "");
  localStorage.setItem("reg_start", "");
  localStorage.setItem("reg_end", "");
  localStorage.setItem("announce", "");
  localStorage.setItem("chat", "");
  console.log(0);
}
window.flush = flush;

async function get_comm() {
  var com;
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  console.log(queryString);
  com = queryString;
  console.log(com);
  document.getElementById("h1x").textContent = "Welcome to ".concat(com);
}
window.get_comm = get_comm;

//const get_principal_button = document.getElementById("buttong");
//get_principal_button.addEventListener("click", () => validateForm()); 6h3bq-bge62-mfjmc-bm2k4-bey4l-onpo7-anosw-5mcej-nczqy-j2bwx-dae

async function add_whitelist() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
    addValueToWhiteList(queryString, localStorage.getItem("wallet_address"));
    
    document.getElementById("awl").textContent = "Applied for Whitelist";
    document.getElementById('awl').removeAttribute("onclick");
    document.getElementById('awl').style.cursor = "default";
    document.getElementById('awl').style.color = "black";
    localStorage.setItem("entered", 1);
    localStorage.setItem("goodpoints", 15);
    console.log(whitelists);
    
  }
window.add_whitelist = add_whitelist;

async function load_comm() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
    addValueToWhiteList(queryString, localStorage.getItem("wallet_address"));
    var isContest = localStorage.getItem("contest");
    if (isContest == 1){
      var hasEntered = localStorage.getItem("entered");
      if (hasEntered == 1){
        document.getElementById("awl").textContent = "Applied for Whitelist";
        document.getElementById('awl').removeAttribute("onclick");
        document.getElementById('awl').style.cursor = "default";
        document.getElementById('awl').style.color = "black";
      }
    }
    else {
      document.getElementById("awl").textContent = "No Whitelisting Ongoing";
      document.getElementById('awl').removeAttribute("onclick");
      document.getElementById('awl').style.cursor = "default";
      document.getElementById('awl').style.color = "black";
    } 
    
    
   
  }
window.load_comm = load_comm;

async function to_listpage() {
  window.location.href="./lists-joined.html";
}
window.to_listpage = to_listpage;

async function to_commpage() {
  window.location.href="./community_page.html?icpverse_genesis";
}
window.to_commpage = to_commpage;

async function to_creatorpage() {
  window.location.href="./creator.html";
}
window.to_creatorpage = to_creatorpage;

async function to_createpage() {
  window.location.href="./event_create.html?icpverse_genesis";
}
window.to_createpage = to_createpage;

async function to_announcementpage() {
  window.location.href="./announcement.html?icpverse_genesis";
}
window.to_announcementpage = to_announcementpage;

async function to_holderpage() {
  var wal = localStorage.getItem("wallet");
  console.log(wal);
  if (wal == "Plug"){
    const ghost_canister = "xzcnc-myaaa-aaaak-abk7a-cai";
    const whitelist = [ghost_canister];
    try {
      await window.ic.plug.requestConnect({
        whitelist,
      });
      window.location.href="./holder_club.html?icpverse_genesis";
    } catch (e) {
      console.log(e);
    }
  }
  if (wal == "Bitfinity"){
    try {
      const publicKey = await window.ic.infinityWallet.requestConnect();
      console.log(`The connected user's public key is:`, publicKey);
      const nnsCanisterId = "xzcnc-myaaa-aaaak-abk7a-cai";
  
    // Whitelist
    const whitelist = [nnsCanisterId];
    await window.ic.infinityWallet.requestConnect({
      whitelist,
    });
    window.location.href="./holder_club.html?icpverse_genesis";
    } catch (e) {
      console.log(e);
    }
  }
  
}
window.to_holderpage = to_holderpage;

async function to_clubpage() {
  window.location.href="./club.html?icpverse_genesis";
}
window.to_clubpage = to_clubpage;

async function load_announcements() {
  var new_ann = localStorage.getItem("announce");
  var lines = new_ann.split("\n"); 
  console.log(lines);
  console.log(new_ann);
  var root = document.getElementById("ann_holder");
  var i = 0;
  var el = document.createElement('div');
  while (i < lines.length){
    
    el.innerHTML = el.innerHTML.concat(lines[i]);
    var linebreak = document.createElement("br");
    el.appendChild(linebreak);
    
    i += 1;
  }
  var linebreak = document.createElement("br");
  el.appendChild(linebreak);
  el.className = "heroText3";
    root.appendChild(el);
  
  
}
window.load_announcements = load_announcements;

async function load_hclub() {
  var new_chat = localStorage.getItem("chat");
  if (new_chat == null){
    new_chat = "";
  }
  console.log(new_chat);
  navigator.geolocation.getCurrentPosition(success);
  await new Promise(r => setTimeout(r, 2000));
  document.getElementById("inf").style.visibility = "visible";
  document.getElementById("nf").textContent = "None Found"
  var lines = new_chat.split("\n"); 
  console.log(lines);
  console.log(new_chat);
  var root = document.getElementById("ann_holder");
  var i = 0;
  var el = document.createElement('div');
  var el2 = document.createElement('div');
  while (i < lines.length){
    if (lines[i].includes("@")){
      if (i != 0){
        root.appendChild(el2);
      }
      el.innerHTML = lines[i];
      el.className = "heroText6";
      root.appendChild(el);
      el2 = document.createElement('div');
      el = document.createElement('div');
      i += 1;
       
    }
    else {
      el2.innerHTML = el2.innerHTML.concat(lines[i]);
      if (i != 0){
        var linebreak = document.createElement("br");
        el2.appendChild(linebreak);
      }
      
      el2.className = "heroText3";
      
    
      i += 1;
    }
    
  }
  var linebreak = document.createElement("br");
  el2.appendChild(linebreak);
  el2.className = "heroText3";
    root.appendChild(el2);
  
  
}
window.load_hclub = load_hclub;

async function turn_discovery() {
  var el = document.getElementById("discovery");
  var disc = localStorage.getItem("disco");
  if (disc == 1){
    el.textContent = "Turn On Discovery";
    localStorage.setItem("disco", 0);
  }
  else {
    el.textContent = "Turn Off Discovery";
    localStorage.setItem("disco", 1);
  }
  
  
}
window.turn_discovery = turn_discovery;

async function publish_broadcast() {
  var bc = document.getElementById("bc").value;
  var now = new Date().toUTCString();
  bc = now.substring(4).concat(": \n").concat(bc)
  localStorage.setItem("announce", bc);
  window.location.href = "./announcement.html?icpverse_genesis";
  
}
window.publish_broadcast = publish_broadcast;

async function publish_chat() {
  var c = document.getElementById("bc").value;
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....-").concat(walletID.slice(walletID.length - 3, walletID.length));

  var now = new Date().toUTCString();
  var new_chat = walletName.concat(" @ ").concat(now.substring(4).concat(": \n").concat(c));
  var prev_chat = localStorage.getItem("chat");
  localStorage.setItem("chat", prev_chat.concat("\n").concat(new_chat));
  
  var lines = new_chat.split("\n"); 
  console.log(lines);
  console.log(new_chat);
  var root = document.getElementById("ann_holder");
  var i = 0;
  var el = document.createElement('div');
  var el2 = document.createElement('div');
  while (i < lines.length){
    if (i == 0){
      el.innerHTML = el.innerHTML.concat(lines[i]);
      el.className = "heroText6";
      root.appendChild(el);
      i += 1;
    }
    else {
      el2.innerHTML = el2.innerHTML.concat(lines[i]);
      var linebreak = document.createElement("br");
      el2.appendChild(linebreak);
      i += 1;
    }
    
    
    
    
  }
  
  el2.className = "heroText3";
    root.appendChild(el2);
    document.getElementById("bc").value = "";
}
window.publish_chat = publish_chat;

async function add_rafflelist() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
    addValueToRaffleList(queryString, localStorage.getItem("wallet_address"));
    
    document.getElementById("addraf").textContent = "Applied for Raffle";
    document.getElementById('addraf').removeAttribute("onclick");
    document.getElementById('addraf').style.backgroundColor = "red";
    console.log(raffles);
    
  }
window.add_rafflelist = add_rafflelist;

async function to_whitelist() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  window.location.href = "./whitelist.html?".concat(queryString);
}
window.to_whitelist = to_whitelist;

async function to_rafflelist() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  window.location.href = "./raffle.html?".concat(queryString);
}
window.to_rafflelist = to_rafflelist;

async function get_whitelist() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  document.getElementById("h1x").textContent = queryString;
}
window.get_whitelist = get_whitelist;

async function get_rafflelist() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  document.getElementById("h1x").textContent = queryString;

}
window.get_rafflelist = get_rafflelist;

async function submit_event() {
  console.log("jksjdb");
  let nat = document.getElementById("nature").value;
  let ent = document.getElementById("entrants").value;
  let win = document.getElementById("winners").value;
  let pri = document.getElementById("prize").value;
  let siz = document.getElementById("size").value;
  let mp = document.getElementById("mint_price").value;
  let md = document.getElementById("mint_date").value;
  let rs = document.getElementById("reg_start").value;
  let re = document.getElementById("reg_end").value;
  console.log(nat.length);
  console.log(ent.length);
  console.log(siz.length);
  console.log(mp.length);
  console.log(md.length);
  console.log(rs.length);
  console.log(re.length);

  var mdate = new Date(md);
  var rsdate = new Date(rs);
  var rcdate = new Date(re);

  const now = new Date().toUTCString();

  
  console.log(mdate);
  console.log(now);

  

  if (!isNumeric(ent) || !isNumeric(win) || !isNumeric(siz) || !isNumeric(mp)){
    document.getElementById("response").textContent = "Minimum Entrants, Mint Price, Size of Collection, and Winner Count need to be numbers.";
    return;
  }

  if (mdate < rcdate || rcdate < rsdate){
    document.getElementById("response").textContent = "Minting Date cannot be earlier than Registration Close Date. Close Date can't be Earlier than the Start Date.";
    return;
  }

  if (Date.parse(now) + 100000 > Date.parse(rsdate.toUTCString())){
    document.getElementById("response").textContent = "The Registration Start Date Needs to be Later than Current Time.";
    return;
  }
  
  if (((nat.length != 0 && ent.length != 0) &&   (md.length != 0 && mp.length != 0))  && ((re.length != 0  && rs.length != 0)  &&  (siz.length != 0 && win.length != 0))){
    
    console.log("you are here");
    localStorage.setItem("nature", nat);
  
    localStorage.setItem("entrants", ent);
    localStorage.setItem("prize", pri);
    localStorage.setItem("size", siz);
    localStorage.setItem("mint_price", mp);
    localStorage.setItem("mint_date", md);
    localStorage.setItem("reg_start", rs);
    localStorage.setItem("reg_end", re);
    localStorage.setItem("winners", win);
    localStorage.setItem("contest", 1);
    window.location.href = "./creator.html?icpverse_genesis";
    
  }
  else {
    document.getElementById("response").textContent = "All fields except PRIZE are MANDATORY";
  }
  
  
}
window.submit_event = submit_event;

function validateForm2() {
  let email = document.getElementById("email").value;
  let userName = document.getElementById("password").value;
  let fav = document.getElementById("nft").value;

  let url = "http://localhost:5000/api/setdetails";

  let walletID = localStorage.getItem("wallet_address");
  if (!walletID) {
    alert("Wallet address is required");
    return;
  }
  console.log(walletID);
  console.log(email);

  try {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        email: email,
        userName: userName,
        fav: fav,
        walletID: walletID,
      })
    );
    window.location.href="./confirm.html";
    //alert("We will let you know!");
  } catch (err) {
    console.log("err", JSON.stringify(err));
  }
  console.log("req");
}
window.validateForm2 = validateForm2;

function confirm_pwd() {
  var pwd = document.getElementById("pwdWrite").value;
  if (pwd == "btcf") {
    window.location.href="./community_page.html?".concat("btcflower");
  }
  else if (pwd == "kgf") {
    window.location.href="./community_page.html?".concat("killergf");
  }
  else if (pwd == "dotw") {
    window.location.href="./community_page.html?".concat("dotweiler");
  }
  else {
    document.getElementById("response").textContent = "Password Mismatch";
  }
}
window.confirm_pwd = confirm_pwd;

function validateForm3() {
  var i = 0;
  console.log("haan bhai yehi hai");
  while (i < 6){
    let email = randomEmail();
    let userName = "";
    let fav = randomNFT();

    let url = "http://localhost:5000/api/setdetails";
    console.log("here");
    //let walletID = localStorage.getItem("walletID");

    var s1 = randomGen(5);
    var s2 = randomGen(5);
    var s3 = randomGen(5);
    var s4 = randomGen(5);
    var s5 = randomGen(5);
    var s6 = randomGen(5);
    var s7 = randomGen(5);
    var s8 = randomGen(5);
    var s9 = randomGen(5);
    var s10 = randomGen(5);
    var s11 = randomGen2(3);
    var walletID = s1.concat("-").concat(s2).concat("-").concat(s3).concat("-").concat(s4).concat("-").concat(s5).concat("-").concat(s6).concat("-").concat(s7).concat("-").concat(s8).concat("-").concat(s9).concat("-").concat(s10).concat("-").concat(s11);

    try {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          email: email,
          userName: userName,
          fav: fav,
          walletID: walletID,
        })
      );
      //window.location.href="./confirm.html";
      //alert("We will let you know!");
    } catch (err) {
      console.log("err", JSON.stringify(err));
    }
    i += 1;
}
  
}
window.validateForm3 = validateForm3;

function captcha_confirm() {
  var cap = document.getElementById("pwdWrite").value;
  if (cap == localStorage.getItem("currentCaptcha")){
    window.location.href = "welcome.html";
    localStorage.setItem("captchaTrue", "Y");
  }
  else {
    document.getElementById("response2").textContent = "Captcha Mismatch. Try Again.";
  }
  

}
window.captcha_confirm = captcha_confirm;

function captcha_test() {
  var cap = randomGen3(6);
  localStorage.setItem("currentCaptcha", cap);
  document.getElementById("response2").textContent = "Please Enter Captcha: ".concat(cap);

}
window.captcha_test = captcha_test;

function authenticate() {
  var pwd = document.getElementById("pwdWrite").value;
  var cap = document.getElementById("captchaWrite").value;
  var flag = false;
  
  if (cap == localStorage.getItem("currentCaptcha")){
    flag = true;
    localStorage.setItem("captchaTrue", "Y");
  }
  
  if (pwd == "btcf" && flag) {
    window.location.href="./community_page.html?".concat("btcflower");
  }
  else if (pwd == "kgf" && flag) {
    window.location.href="./community_page.html?".concat("killergf");
  }
  else if (pwd == "dotw" && flag) {
    window.location.href="./community_page.html?".concat("dotweiler");
  }
  else if (pwd == "icpvg" && flag) {
    window.location.href="./community_page.html?".concat("icpverse_genesis");
  }
  else {
    document.getElementById("response").textContent = "Password or Captcha Mismatch";
  }
}
window.authenticate = authenticate;


function randomGen(length){
  var result = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomGen2(length){
  var result = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length - 1; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += "e";
  return result;
}

function randomGen3(length){
  var result = '';
  var characters       = 'abcdefghijkmnopqrstuvwxyz123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomNFT(){
  
  
  var result = '';
  let coeff = (Math.floor(Math.random() * 7));
  if (coeff == 0){
    return "BAYC";
  }
  if (coeff == 1){
    return "Bored ape";
  }
  if (coeff == 2){
    return "poked studio";
  }
  if (coeff == 3){
    return "exo sama";
  }
  if (coeff == 4){
    return "Pokedbot";
  }
  if (coeff == 5){
    return "Azuki";
  }
  if (coeff == 6){
    return "BTC Flower";
  }
  if (coeff == 7){
    return "Mutant Ape YC";
  }
  return result;
}

function randomEmail(){
  var result = '';
  var characters       = 'ABCDEFGHIabcdefghijklmnopqrstuvwxyz1234567890';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  var coeff = (Math.floor(Math.random() * 23));
  if (coeff == 0){
    result=  "nft";
  }
  if (coeff == 1){
    result = "icp";
  }
  if (coeff == 2){
    result = "star";
  }
  if (coeff == 3){
    result = "cool";
  }
  if (coeff == 4){
    result = "red";
  }
  if (coeff == 5){
    result = "kawaii";
  }
  if (coeff == 6){
    result = "crypto";
  }
  if (coeff == 7){
    result = "bruh";
  }
  if (coeff == 8){
    result =  "honey";
  }
  if (coeff == 9){
    result = "dfinity";
  }
  if (coeff == 10){
    result = "cosmo";
  }
  if (coeff == 11){
    result = "punk";
  }
  if (coeff == 12){
    result = "gangsta";
  }
  if (coeff == 13){
    result = "lord";
  }
  if (coeff == 14){
    result = "slim";
  }
  if (coeff == 15){
    result = "simp";
  }
  if (coeff == 16){
    result=  "prudent";
  }
  if (coeff == 17){
    result = "noob";
  }
  if (coeff == 18){
    result = "cooler";
  }
  if (coeff == 19){
    result = "dumbass";
  }
  if (coeff == 20){
    result = "smark";
  }
  if (coeff == 21){
    result = "slick";
  }
  if (coeff == 23){
    result = "weedy";
  }
  if (coeff == 22){
    result = "bored";
  }
  coeff = (Math.floor(Math.random() * 20));

  if (coeff == 0){
    result=  result.concat("child");
  }
  if (coeff == 1){
    result = result.concat("clown");
  }
  if (coeff == 2){
    result = result.concat("shaikh");
  }
  if (coeff == 3){
    result = result.concat("yang");
  }
  if (coeff == 4){
    result = result.concat("coco");
  }
  if (coeff == 5){
    result = result.concat("fuego");
  }
  if (coeff == 6){
    result = result.concat("punkk");
  }
  if (coeff == 7){
    result = result.concat("shadow");
  }
  if (coeff == 8){
    result =  result.concat("braze");
  }
  if (coeff == 9){
    result = result.concat("flower");
  }
  if (coeff == 10){
    result = result.concat("rhyno");
  }
  if (coeff == 11){
    result = result.concat("shua");
  }
  if (coeff == 12){
    result = result.concat("akshu");
  }
  if (coeff == 13){
    result = result.concat("liz");
  }
  if (coeff == 14){
    result = result.concat("jackie");
  }
  if (coeff == 15){
    result = result.concat("khan");
  }
  if (coeff == 16){
    result=  result.concat("carl");
  }
  if (coeff == 17){
    result = result.concat("ross");
  }
  if (coeff == 18){
    result = result.concat("leon");
  }
  if (coeff == 19){
    result = result.concat("spark");
  }
  if (coeff == 20){
    result = result.concat("rafa");
  }
  var characters       = 'abcdefghijklmnopqrstuvwxyz123456789';
  var charactersLength = characters.length;
  var len = (Math.floor(Math.random() * 5));
  for ( var i = 0; i < len; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result = result.concat("@gmail.com");

  return result;
}

function addValueToWhiteList(key, value) {
  //if the list is already created for the "key", then uses it
  //else creates new list for the "key" to store multiple values in it.
  whitelists[key] = whitelists[key] || [];
  whitelists[key].push(value);
}

function addValueToRaffleList(key, value) {
  //if the list is already created for the "key", then uses it
  //else creates new list for the "key" to store multiple values in it.
  raffles[key] = raffles[key] || [];
  raffles[key].push(value);
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}