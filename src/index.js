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
    localStorage.setItem("wallet_nat", allAccounts[0].meta.source);
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
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("h1x").textContent = "Hi ".concat(walletName);
}
window.get_name = get_name;

async function switch_project() {
  var new_proj = document.getElementById("pro_name").value;
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  if (new_proj != "current" && new_proj != queryString){
    window.location.href = "./creator.html?".concat(new_proj);
  }


}
window.switch_project = switch_project;

function isAdmin() {
  var adminedProjects = [];
  adminedProjects.push("alephkazam_day1");
  adminedProjects.push("gobazzinga");
  adminedProjects.push("alephflower");
  return adminedProjects;
}

async function load_creator() {
  var walletID = localStorage.getItem("wallet_address");
  var creator_access = isAdmin(walletID);
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  

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

  if (creator_access.length == 0){
    document.getElementById("creator_menu").style.display = "none";
    document.getElementById("btns").style.display = "none";
    document.getElementById("op").innerHTML = `<div>"You don't appear to admin any project right now. Click to go <a href="./lists-joined.html">BACK</a>."</div>`;
    return;
  }


  var root2 = document.getElementById("pro_name");
  console.log(root2);
  var i = 0;
  while (i < creator_access.length){
    root2.innerHTML += `<option value="`.concat(creator_access[i]).concat(`">`.concat(creator_access[i]).concat(`</option>
    `));
    i += 1;
  }
  var root = document.getElementById("cr").innerHTML;
  
  var isContest = 0;
  console.log(isContest);
  if (isContest == 1){
    document.getElementById("cr").innerHTML = root + el;
    
  
    
    
   
    document.getElementById("ro").textContent = rs.replace("T"," "); 
    document.getElementById("rc").textContent = re.replace("T"," ");
    document.getElementById("md2").textContent = md.replace("T"," ");
    document.getElementById("win").textContent = re.replace("T"," ");
    document.getElementById("md1").textContent = md.replace("T"," ");
    document.getElementById("sz").textContent = siz;
    document.getElementById("mp").textContent = mp.concat(" ");
    document.getElementById("mp").innerHTML += `<img src="./img/colorful-icon.png" alt="" />`;
    
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
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  document.getElementById("you").textContent = walletName;
  
  console.log("hui");
  
  var youFlag = false;
  var pts = getPoints().sort(sorter).reverse();
  var i = 0;
  var root = document.getElementById("point_body");

  while (i < pts.length && i < 10){
    var el = document.createElement("tr");
    var rank;
    if (i == 0){
      rank = 1;
    }
    else {
      if (parseInt(pts[i][1]) == parseInt(pts[i - 1][1])){
        rank = rank;
      }
      else {
        rank = rank + 1;
      }
    } 
  el.innerHTML = `
    <td >
                        <div style="margin-left: 4%;">
                          `.concat(pts[i][0]).concat(`
                        </div>
                      </td>
                      
                      <td>
                        <div>
                            `.concat(pts[i][1]).concat(`
                        </div>
                      </td>
                      <td>
                        <div style="display:block;width: 100%;text-align:center;">
                            `.concat(rank.toString()).concat(`
                        </div>
                        
                      </td>
                    `)));
      
      if (pts[i][0] == "You"){
        var child = el.children[0].children[0];
        child.style.color = "red";
        child = el.children[1].children[0];
        child.style.color = "red";
        child = el.children[2].children[0];
        child.style.color = "red";
        youFlag = true;
      }
      root.appendChild(el);
      i += 1;
  }

  while (!youFlag){
    if (parseInt(pts[i][1]) == parseInt(pts[i - 1][1])){
      rank = rank;
    }
    else {
      rank = rank + 1;
    }
    var user = pts[i][0];
    if (user != "You"){
      i += 1;
    }
    else {
      
      el = document.createElement('tr');
      el.innerHTML = `
    <td >
                        <div style="margin-left: 4%;">
                          `.concat(pts[i][0]).concat(`
                        </div>
                      </td>
                      
                      <td>
                        <div>
                            `.concat(pts[i][1]).concat(`
                        </div>
                      </td>
                      <td>
                        <div style="display:block;width: 100%;text-align:center;">
                            `.concat(rank.toString()).concat(`
                        </div>
                        
                      </td>
                    `)));
      var child = el.children[0].children[0];
      child.style.color = "red";
      child = el.children[1].children[0];
      child.style.color = "red";
      child = el.children[2].children[0];
      child.style.color = "red";
      root.appendChild(el);
      youFlag = true;
    }

  }
  
 
  
  
}
window.load_leaderboard = load_leaderboard;

async function load_earn() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  document.getElementById("you").textContent = walletName;
  var wallet = localStorage.getItem("wallet_nat");
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
  
  
}
window.load_earn = load_earn;

async function load_wallet() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  
}
window.load_wallet = load_wallet;

async function load_entry() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  var creator_access = isAdmin(walletID);
  if (creator_access.length == 0){
    window.location.href = "./creator.html";
  }
  
}
window.load_entry = load_entry;

async function load_create_event() {
  var walletID = localStorage.getItem("wallet_address");
  
  var creator_access = isAdmin(walletID);
  if (creator_access.length == 0){
    window.location.href = "./creator.html";
  }
  
}
window.load_create_event = load_create_event;

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
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  document.getElementById("you").textContent = walletName;
  
  var proj = getProjects();
  var i = 0;
  var root = document.getElementById("root1");
  while (i < proj.length){
    var el = document.createElement('tr');
    el.innerHTML = `
    <td>
                            <div class="userTd">
                              <img
                                class="projectUserImg"
                                src="./img/project-user-img-3.svg"
                                alt=""
                              />
                              <div>
                                <div class="projectUserName">`.concat(proj[i][0]).concat(`</div>
                                <div class="projectUserDetails">
                                  Registered: Yesterday
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>`.concat(proj[i][2]).concat(`</td>
                          <td>`.concat(proj[i][3]).concat(`</td>
                          <td>
                            <a class="projectTableLink" href="#">REGISTER</a>
                          </td>
    `)));
    root.appendChild(el);
    i += 1;
  }

  i = 0;
  root = document.getElementById("root2");
  while (i < proj.length){
    var el = document.createElement('tr');
    el.innerHTML = `
    <td>
                            <div class="userTd">
                              <img
                                class="projectUserImg"
                                src="./img/project-user-img-3.svg"
                                alt=""
                              />
                              <div>
                                <div class="projectUserName">`.concat(proj[i][0]).concat(`</div>
                                <div class="projectUserDetails">
                                  Registered: Yesterday
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>`.concat(proj[i][2]).concat(`</td>
                          <td>`.concat(proj[i][3]).concat(`</td>
                          
    `)));
    root.appendChild(el);
    i += 1;
  }
  
}
window.load_cal = load_cal;

async function load_explore() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  document.getElementById("you").textContent = walletName;
  var root = document.getElementById("home");
  
  var i = 0;
  var proj = getProjects();
  var elr = document.createElement('div');
    elr.className = 'row cardRow';
  while (i < proj.length){
    if (i % 5 == 0 && i != 0){
      root.appendChild(elr);
      var space = document.createElement('br');
      root.appendChild(space);
      space = document.createElement('br');
      root.appendChild(space);
      elr = document.createElement('div');
      elr.className = 'row cardRow';
    }
    var el = document.createElement('div');
    el.className = "col";
    el.innerHTML = `
    <div class="exploreCardBody">
                        <div class="exploreCard">
                          <img
                            class="exploreCardImg"
                            src="./img/explore-card-img-1.png"
                            alt=""
                          />
                          <div class="exploreCardFooter">
                            <div class="exploreCardText">`
                              .concat(proj[i][0]).concat(
                            `</div>
                          </div>
                        </div>
                        <div class="exploreCardButton">
                          <a id="icpvg" class="exploreCardBtn" href="password.html">Coming Soon</a>
                        </div>
                      </div>
    `);
    
    elr.appendChild(el);
    i += 1;
  }
  while (i % 5 != 0){
    var el = document.createElement('div');
    el.className = "col";
    elr.appendChild(el);
    i += 1;
  }

  root.appendChild(elr);

  i = 0;
 root = document.getElementById("profile");

 elr = document.createElement('div');
    elr.className = 'row cardRow';
  while (i < proj.length){
    if (i % 5 == 0 && i != 0){
      root.appendChild(elr);
      var space = document.createElement('br');
      root.appendChild(space);
      space = document.createElement('br');
      root.appendChild(space);
      elr = document.createElement('div');
      elr.className = 'row cardRow';
    }
    var el = document.createElement('div');
    el.className = "col";
    el.innerHTML = `
    <div class="exploreCardBody">
                        <div class="exploreCard">
                          <img
                            class="exploreCardImg"
                            src="./img/explore-card-img-1.png"
                            alt=""
                          />
                          <div class="exploreCardFooter">
                            <div class="exploreCardText">`
                              .concat(proj[i][0]).concat(
                            `</div>
                          </div>
                        </div>
                        <div class="exploreCardButton">
                          <a id="icpvg" class="exploreCardBtn" href="password.html">Coming Soon</a>
                        </div>
                      </div>
    `);
    
    elr.appendChild(el);
    i += 1;
  }
  while (i % 5 != 0){
    var el = document.createElement('div');
    el.className = "col";
    elr.appendChild(el);
    i += 1;
  }

  root.appendChild(elr);


  
  
  
  
}
window.load_explore = load_explore;

async function load_act() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  document.getElementById("you").textContent = walletName;

  var proj = getProjects();
  var i = 0;
  var root = document.getElementById("root");
  while (i < proj.length){
    var el = document.createElement('tr');
    el.innerHTML = `
    <td>
                        <div class="userTd">
                          <img
                            class="projectUserImg"
                            src="./img/project-user-img-2.svg"
                            alt=""
                          />
                          <div>
                            <div class="projectUserName">`.concat(proj[i][0]).concat(`</div>
                            <div class="projectUserDetails">
                              Registered: Yesterday
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Registered
                        <img
                          class="projectUserIcon"
                          src="./img/project-table-icon-1.svg"
                          alt=""
                        />
                      </td>
                      <td>
                        <div class="userTd userDetails">
                          <div class="leftSide">
                            <div>Minting date:</div>
                            <div>Minting price:</div>
                            <div>Raffle:</div>
                          </div>
                          <div class="rightSide">
                            <div>`.concat(proj[i][2]).concat(`</div>
                            <div>`.concat(proj[i][4]).concat(` ICP</div>
                            <div>`.concat(proj[i][3]).concat(` spots</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a class="projectTableLink" href="#">OFFICIAL LINK</a>
                      </td>
    `))));
    root.appendChild(el);
    i += 1;
  }

}
window.load_act = load_act;

async function load_list() {
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));
  document.getElementById("dropdownMenuButton1").textContent = walletName;
  document.getElementById("you").textContent = walletName;
  var proj = getProjects();
  var root = document.getElementById("root");
  var i = 0;
  while (i < proj.length){
    var el = document.createElement('tr');
    el.innerHTML = `
    <td>
                              <div class="userTd">
                                <img
                                  class="projectUserImg"
                                  src="./img/project-user-img-2.svg"
                                  alt=""
                                />
                                <div>
                                  <a class="projectUserName" href="community_page.html?swizz_bears">`.concat(proj[i][0]).concat(`</a>
                                  <div class="projectUserDetails">
                                    Registered: Yesterday
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              Registered
                              <img
                                class="projectUserIcon"
                                src="./img/project-table-icon-1.svg"
                                alt=""
                              />
                            </td>
                            <td>`.concat(proj[i][2]).concat(`</td>
    `));
    root.appendChild(el);
    i += 1;
  }

  root = document.getElementById("root2");
  i = 0;
  while (i < proj.length){
    var el = document.createElement('tr');
    el.innerHTML = `
    <td>
                              <div class="userTd">
                                <img
                                  class="projectUserImg"
                                  src="./img/project-user-img-2.svg"
                                  alt=""
                                />
                                <div>
                                  <a class="projectUserName" href="community_page.html?swizz_bears">`.concat(proj[i][0]).concat(`</a>
                                  <div class="projectUserDetails">
                                    Registered: Yesterday
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              Registered
                              <img
                                class="projectUserIcon"
                                src="./img/project-table-icon-1.svg"
                                alt=""
                              />
                            </td>
                            <td>`.concat(proj[i][2]).concat(`</td>
    `));
    root.appendChild(el);
    i += 1;
  }

  root = document.getElementById("root3");
  i = 0;
  while (i < proj.length){
    var el = document.createElement('tr');
    el.innerHTML = `
    <td>
                              <div class="userTd">
                                <img
                                  class="projectUserImg"
                                  src="./img/project-user-img-2.svg"
                                  alt=""
                                />
                                <div>
                                  <a class="projectUserName" href="community_page.html?swizz_bears">`.concat(proj[i][0]).concat(`</a>
                                  <div class="projectUserDetails">
                                    Registered: Yesterday
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              Registered
                              <img
                                class="projectUserIcon"
                                src="./img/project-table-icon-1.svg"
                                alt=""
                              />
                            </td>
                            <td>`.concat(proj[i][2]).concat(`</td>
    `));
    root.appendChild(el);
    i += 1;
  }

  console.log(proj[1]);
  
}
window.load_list = load_list;

function getProjects() {
  var plist = [];
  plist.push(["Gobazzinga Tokens", "Not Registered", "March 14, 2023", "500", "2", "https://google.com"]);
  plist.push(["Cosmic Rafts v2.0", "Not Registered", "March 30, 2023", "1000", "10", "https://google.com"]);
  plist.push(["Hentai Arts", "Not Registered", "March 31, 2023", "200", "6.9", "https://google.com"]);
  plist.push(["BTC Flower", "Not Registered", "April 3, 2023", "7777", "30", "https://google.com"]);
  plist.push(["ETH Flower", "Not Registered", "April 3, 2023", "8888", "25", "https://google.com"]);
  plist.push(["Phantasm", "Not Registered", "April 7, 2023", "10000", "3", "https://google.com"]);
  return plist;
}

function getPoints() {
  var plist = [];
  plist.push(["User A", "3"]);
  plist.push(["User B", "23"]);
  plist.push(["User C", "1"]);
  plist.push(["User D", "13"]);
  plist.push(["User E", "25"]);
  plist.push(["User F", "16"]);
  plist.push(["User G", "7"]);
  plist.push(["User H", "43"]);
  plist.push(["User I", "13"]);
  plist.push(["User J", "13"]);
  plist.push(["User K", "5"]);
  plist.push(["User L", "18"]);
  plist.push(["You", "2"]);
  return plist;
}

function getAnnouncements() {
  var alist = [];
  alist.push(["Hi", "April 3, 2023"]);
  alist.push(["This is the beginning. \n Of this project", "April 4, 2023"]);
  alist.push(["Hope You Like It", "April 6, 2023"]);
 
  return alist;
}

function sorter(a, b) {
  var x;
  var y;
  if (isNumeric(parseInt(a[1]))){
    x = parseInt(a[1]);
  }
  else {
    //console.log(parseInt(a[1]));
    x = 0
  }
  if (isNumeric(parseInt(b[1]))){
    y = parseInt(b[1]);
  }
  else {
    y = 0
  }
  if (x === y) {
      return 0;
  }
  else {
      return (x < y) ? -1 : 1;
  }
}

async function flush() {
  localStorage.setItem("wallet_address", "");
  localStorage.setItem("wallet_nat", "");
  localStorage.setItem("current_captcha", "dhsgfgakg");
  localStorage.setItem("captcha_true", "");
  localStorage.setItem("nat_aleph", "");
  localStorage.setItem("ent_aleph", "");
  localStorage.setItem("rs_aleph", "");
  localStorage.setItem("re_aleph", "");
  localStorage.setItem("winners_aleph", "");
  localStorage.setItem("contest_aleph", "0");
  
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
    
    console.log(whitelists);
    
  }
window.add_whitelist = add_whitelist;

async function load_comm() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  var head = document.getElementById("head_el");
  var root = document.getElementById("root5");
  var el = document.createElement('div');
  el.className = "col-lg-7";
  var el2 = document.createElement('div');
  el2.className = "col-lg-5";
  var proj = getProjects();
  switch (queryString){
    case "gobazzinga": {
      console.log(queryString);
      el.innerHTML = `
      <p class="mainText heroText">
              <span>Gobazzinga</span> is an NFT Marketplace with extensive creator
              tools, gamification with built-in rewards and a P2E (Play to Earn)
              platform. What is the goal? Our goal is to create a pleasant NFT
              experience for all web 3 users. We do this by creating an
              extremely easy onboarding process and an intuitive UX/UI
              experience for new NFT collectors. We also incentivize collectors
              using our extensive gamified features. For serious collectors, we
              have some of the best NFT analytics tools suite embedded within
              our platform.
            </p>
            <div class="nft">
              <span class="bold">The NFT</span>
              <p class="mainText">The ICPVerse Genesis NFT grants you:</p>
              <ul>
                <li class="mainText">Limited edition Genesis digital wearables</li>
                <li class="mainText">First access to 10 new launches on GOODMINT</li>
                <li class="mainText">DAO based 1/10000 of vote to ICPVerse governance</li>
              </ul>
            </div>
            <div class="drop">
              <span class="bold">The Drop</span>
              <ul>
                <li class="mainText">
                  Signup for GOODMINT any time from now until 12:10 p.m. EST Jan
                  30.
                </li>
                <li class="mainText">Early access mint begins 11 p.m. EST Jan 25.</li>
              </ul>
            </div>
            <p class="bold boldText">
              Learn more about ICPVerse at icpverse.app For all the latest news
              and announcements, follow ICPVerse on Twitter @icpverse and join
              discord at discord.gg/icpverse
            </p>
      `;
      el2.innerHTML = `
      <div class="icpCard">
      <div class="cardHeader">
          <h1 class="subHeading" id="awl" onclick="add_whitelist();" style="cursor: pointer;color: gold">Get Whitelisted! </h1>
          <h1 class="subHeading" id="arl">No Giveaways Available</h1>
      </div>
      <div class="cardHeader">
        <a id = "prevwl" class="loginButton2" onclick="to_whitelist();">&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;Last Whitelist&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</a>
        
        <a id = "prevraf" class="loginButton2" onclick="to_rafflelist();">&nbsp;&nbsp;  &nbsp;&nbsp;Last Giveaway &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;</a>
      </div>
   
    <div class="cardFooter">
      <img src="./img/flag.svg" alt=""> Report as spam
    </div>
  </div>
      `;
      root.appendChild(el);
      root.appendChild(el2);
      var el3 = document.createElement('script');
            el3.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
            el3.async = true;
            el3.defer = true;
            el3.innerHTML =  `
      
      new Crate({
        server: '929010651106541598', // ICPverse
        channel: '929030706309529660' // #📢-announcements
      })
    
      `;
      head.appendChild(el3);
      document.getElementById("root1").textContent = "Gobazzinga";
      document.getElementById("tw1").href = "https://www.twitter.com/icpverse";
      var link = document.getElementById("tw1").href.split("/");
      document.getElementById("tw1").textContent = "@".concat(link[link.length - 1]);
      document.getElementById("disco").href = "https://www.discord.gg/icpverse";
      var link2 = document.getElementById("disco").href.split("//www.");
      document.getElementById("disco").textContent = link2[link2.length - 1];
      document.getElementById("root2").textContent = proj[0][2];
      document.getElementById("root4").textContent = proj[1][2];
      break;
    }
    case "btcflower": {
      el.innerHTML = `<p class="mainText heroText">
              <span>BTC Flower</span> is an NFT Marketplace with extensive creator
              tools, gamification with built-in rewards and a P2E (Play to Earn)
              platform. What is the goal? Our goal is to create a pleasant NFT
              experience for all web 3 users. We do this by creating an
              extremely easy onboarding process and an intuitive UX/UI
              experience for new NFT collectors. We also incentivize collectors
              using our extensive gamified features. For serious collectors, we
              have some of the best NFT analytics tools suite embedded within
              our platform.
            </p>
            <div class="nft">
              <span class="bold">The NFT</span>
              <p class="mainText">The ICPVerse Genesis NFT grants you:</p>
              <ul>
                <li class="mainText">Limited edition Genesis digital wearables</li>
                <li class="mainText">First access to 10 new launches on GOODMINT</li>
                <li class="mainText">DAO based 1/10000 of vote to ICPVerse governance</li>
              </ul>
            </div>
            <div class="drop">
              <span class="bold">The Drop</span>
              <ul>
                <li class="mainText">
                  Signup for GOODMINT any time from now until 12:10 p.m. EST Jan
                  30.
                </li>
                <li class="mainText">Early access mint begins 11 p.m. EST Jan 25.</li>
              </ul>
            </div>
            <p class="bold boldText">
              Learn more about ICPVerse at icpverse.app For all the latest news
              and announcements, follow ICPVerse on Twitter @icpverse and join
              discord at discord.gg/icpverse
            </p>
            `;
        el2.innerHTML = `
        <div class="icpCard">
        <div class="cardHeader">
            <h1 class="subHeading" id="awl" onclick="add_whitelist();" style="cursor: pointer;color: gold">Get Whitelisted! </h1>
            <h1 class="subHeading" id="arl">No Giveaways Available</h1>
        </div>
        <div class="cardHeader">
          <a id = "prevwl" class="loginButton2" onclick="to_whitelist();">&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;Last Whitelist&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</a>
          
          <a id = "prevraf" class="loginButton2" onclick="to_rafflelist();">&nbsp;&nbsp;  &nbsp;&nbsp;Last Giveaway &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;</a>
        </div>
     
      <div class="cardFooter">
        <img src="./img/flag.svg" alt=""> Report as spam
      </div>
    </div>
        `;
            root.appendChild(el);
            root.appendChild(el2);
            var el3 = document.createElement('script');
            el3.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
            el3.async = true;
            el3.defer = true;
            el3.innerHTML =  `
      
      new Crate({
        server: '929010651106541598', // ICPverse
        channel: '929030706309529660' // #📢-announcements
      })
    
      `;
      head.appendChild(el3);
      document.getElementById("root1").textContent = "BTC Flower";
      document.getElementById("tw1").href = "https://www.twitter.com/icpverse";
      var link = document.getElementById("tw1").href.split("/");
      document.getElementById("tw1").textContent = "@".concat(link[link.length - 1]);
      document.getElementById("disco").href = "https://www.discord.gg/icpverse";
      var link2 = document.getElementById("disco").href.split("//www.");
      document.getElementById("disco").textContent = link2[link2.length - 1];
      document.getElementById("root2").textContent = proj[2][2];
      document.getElementById("root4").textContent = proj[5][2];
      document.getElementById("root3").href = proj[3][5];
            break;
    }
    default: {
      el.innerHTML = `
      <p class="mainText heroText">
      <span>Unfortunately,</span> no page with this name or code exits
      on the GoodMint app. Please recheck the spelling, or search for something
      else. Happy Minting!
    </p>
    
      `;
      root.appendChild(el);
      document.getElementById("twtr-feed").style.display = "none";
      document.getElementById("root6").style.display = "none";
      document.getElementById("ann").style.display = "none";
      document.getElementById("root1").textContent = "No Result Found";
    }
  }
  
    addValueToWhiteList(queryString, localStorage.getItem("wallet_address"));
     
    
    
   
  }
window.load_comm = load_comm;

async function load_broadcast() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  var wallet = localStorage.getItem("wallet_address");
  var creator_access = isAdmin(wallet);
  if (creator_access.length == 0){
    window.location.href = "./creator.html";
  }  
    
    
   
  }
window.load_broadcast = load_broadcast;

async function load_collab() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  var wallet = localStorage.getItem("wallet_address");
  var creator_access = isAdmin(wallet);
  if (creator_access.length == 0){
    window.location.href = "./creator.html";
  }  
    
    
   
  }
window.load_collab = load_collab;



async function to_listpage() {
  window.location.href="./lists-joined.html";
}
window.to_listpage = to_listpage;

async function to_broadcastpage() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  window.location.href="./broadcast.html?".concat(queryString);
}
window.to_broadcastpage = to_broadcastpage;

async function to_commpage() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  window.location.href="./community_page.html?".concat(queryString);
}
window.to_commpage = to_commpage;

async function to_creatorpage() {
  var admin = isAdmin();
  console.log(admin.length);
  if (admin.length == 0){
    window.location.href="./creator.html";
  }
  else {
    window.location.href="./creator.html?".concat(admin[0]);
  }
  
}
window.to_creatorpage = to_creatorpage;


async function to_entrypage() {
  var admin = isAdmin();
  console.log(admin.length);
  if (admin.length == 0){
    window.location.href="./creator.html";
  }
  else {
    window.location.href="./entries.html?".concat(admin[0]);
  }
  
}
window.to_entrypage = to_entrypage;

async function to_collabpage() {
  var admin = isAdmin();
  console.log(admin.length);
  if (admin.length == 0){
    window.location.href="./creator.html";
  }
  else {
    window.location.href="./collab.html?".concat(admin[0]);
  }
  
}
window.to_collabpage = to_collabpage;

async function to_resultpage() {
  var admin = isAdmin();
  console.log(admin.length);
  if (admin.length == 0){
    window.location.href="./creator.html";
  }
  else {
    window.location.href="./results.html?".concat(admin[0]);
  }
  
}
window.to_resultpage = to_resultpage;

async function to_createpage() {
  window.location.href="./event_create.html?alephkazam_day1";
}
window.to_createpage = to_createpage;

async function to_announcementpage() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  window.location.href="./announcement.html?".concat(queryString);
}
window.to_announcementpage = to_announcementpage;

async function to_holderpage() {
  var wal = localStorage.getItem("wallet_nat");
  console.log(wal);
  if (wal == "Plug"){
    const ghost_canister = "xzcnc-myaaa-aaaak-abk7a-cai";
    const whitelist = [ghost_canister];
    try {
      await window.ic.plug.requestConnect({
        whitelist,
      });
      window.location.href="./holder_club.html?alephkazam_day1";
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
    window.location.href="./holder_club.html?alephkazam_day1";
    } catch (e) {
      console.log(e);
    }
  }
  
}
window.to_holderpage = to_holderpage;

async function to_clubpage() {
  window.location.href="./club.html?alephkazam_day1";
}
window.to_clubpage = to_clubpage;

async function load_announcements() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);

  if (queryString != "btcflower" && queryString != "gobazzinga"){
    var root = document.getElementById("ann_holder");
    var el = document.createElement('div');
    el.className = "heroText3";
    el.textContent = "This Project Does Not Exist on GoodMint. Try a different query."
    root.appendChild(el);
    return;
  }
  var annou = getAnnouncements();
  
  
  var root = document.getElementById("ann_holder");
  var i = 0;

  while (i < annou.length){
    var j = 0;
    var lines = annou[i][1].concat(": \n").concat(annou[i][0]).split("\n"); 
    var el = document.createElement('div');
    el.className = "heroText3";
    console.log(lines);
    while (j < lines.length){
      
      
      el.innerHTML = el.innerHTML.concat(lines[j]);
      var linebreak = document.createElement("br");
      el.appendChild(linebreak);
      
      j += 1;
    }
    linebreak = document.createElement("br");
    el.appendChild(linebreak);
    root.appendChild(el);
    i += 1;
  }
  
  
  
  
    
  
  
}
window.load_announcements = load_announcements;

async function load_hclub() {
  
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
  if (el.textContent != "Turn On Discovery"){
    el.textContent = "Turn On Discovery";
  }
  else {
    el.textContent = "Turn Off Discovery";
  }
  
  
}
window.turn_discovery = turn_discovery;

async function publish_broadcast() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  var bc = document.getElementById("bc").value;
  var now = new Date().toUTCString();
  bc = now.substring(4).concat(": \n").concat(bc)
  
  window.location.href = "./announcement.html?".concat(queryString);
  
}
window.publish_broadcast = publish_broadcast;

async function publish_chat() {
  var c = document.getElementById("bc").value;
  var walletID = localStorage.getItem("wallet_address");
  var walletName = walletID.slice(0,12).concat(".....").concat(walletID.slice(walletID.length - 3, walletID.length));

  var now = new Date().toUTCString();
  var new_chat = walletName.concat(" @ ").concat(now.substring(4).concat(": \n").concat(c));
  
  
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
  
  
  let rs = document.getElementById("reg_start").value;
  let re = document.getElementById("reg_end").value;
  console.log(nat.length);
  console.log(ent.length);
  
  console.log(rs.length);
  console.log(re.length);

  
  var rsdate = new Date(rs);
  var rcdate = new Date(re);

  const now = new Date().toUTCString();

  
  
  console.log(now);

  

  if (!isNumeric(ent) || !isNumeric(win)){
    document.getElementById("response").textContent = "Minimum Entrants,  and Winner Count need to be numbers.";
    return;
  }

  if (rcdate < rsdate){
    document.getElementById("response").textContent = "Close Date can't be Earlier than the Start Date.";
    return;
  }

  if (Date.parse(now) + 100000 > Date.parse(rsdate.toUTCString())){
    document.getElementById("response").textContent = "The Registration Start Date Needs to be Later than Current Time.";
    return;
  }
  
  if (((nat.length != 0 && ent.length != 0))  && ((re.length != 0  && rs.length != 0)  &&  (win.length != 0 ))){
    
    localStorage.setItem("nat_aleph", nat);
    localStorage.setItem("ent_aleph", ent);
    localStorage.setItem("rs_aleph", rs);
    localStorage.setItem("re_aleph", re);
    localStorage.setItem("winners_aleph", win);
    localStorage.setItem("contest_aleph", "1");
    
    window.location.href = "./creator.html?alephkazam_day1";
    
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
    alert("WalletID is required");
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
  if (cap == localStorage.getItem("current_captcha")){
    window.location.href = "welcome.html";
    localStorage.setItem("captcha_true", "Y");
  }
  else {
    document.getElementById("response2").textContent = "Captcha Mismatch. Try Again.";
  }
  

}
window.captcha_confirm = captcha_confirm;

async function captcha_test() {
  var url = window.location.toString();
  var queryString = url.substring(url.indexOf('?') + 1);
  if (queryString != "gobazzinga" && queryString != "btcflower"){
    document.getElementById("project_head").style.display = "none";
    document.getElementById("captchaWrite").style.display = "none";
    document.getElementById("pwdWrite").style.display = "none";
    document.getElementById("gobtn").style.display = "none";
    document.getElementById("h3x").textContent = "Redirecting Back in 5 sec..";
    document.getElementById("h2x").textContent = "This Project Does Not Exist on GoodMint.";
    await new Promise(r => setTimeout(r, 3000));
    window.location.href = "./explore.html";
    console.log(queryString);
    return;
  }
  document.getElementById("project_head").textContent = queryString;
  var cap = randomGen3(6);
  localStorage.setItem("current_captcha", cap);
  document.getElementById("response2").textContent = "Please Enter Captcha: ".concat(cap);

}
window.captcha_test = captcha_test;

function authenticate() {
  var pwd = document.getElementById("pwdWrite").value;
  var cap = document.getElementById("captchaWrite").value;
  var flag = false;
  
  if (cap == localStorage.getItem("current_captcha")){
    flag = true;
    localStorage.setItem("captcha_true", "Y");
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
  //console.log(typeof str);
  if (typeof str != "string" && typeof str != "number") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function expand_support(){
  var expand = false;
  if (document.getElementById("s1").style.display == "none"){
    expand = true;
  }
  if (expand){
    document.getElementById("s1").style.display = "block";
    document.getElementById("s2").style.display = "block";
    document.getElementById("s3").style.display = "block";
  }
  else {
    document.getElementById("s1").style.display = "none";
    document.getElementById("s2").style.display = "none";
    document.getElementById("s3").style.display = "none";
  }
  
}
window.expand_support = expand_support;

function expand_points(){
  var expand = false;
  if (document.getElementById("s11").style.display == "none"){
    expand = true;
  }
  if (expand){
    document.getElementById("s11").style.display = "block";
    document.getElementById("s12").style.display = "block";
  }
  else {
    document.getElementById("s11").style.display = "none";
    document.getElementById("s12").style.display = "none";
  }
  
}
window.expand_points = expand_points;