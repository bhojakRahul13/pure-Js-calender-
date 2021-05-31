var dt = new Date();
var localStorage = JSON.parse(localStorage.getItem("data"));
function renderDate() {
  dt.setDate(1);
  var day = dt.getDay();

  var prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
  var endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();

  var toDayDate = new Date();

  var month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var week = "";

  weeks.map((item, index) => {
    week += `<div key="${index}">` + item + `</div>`;
  });

  document.getElementById("date").innerHTML = dt.toDateString();
  document.getElementById("month").innerHTML = month[dt.getMonth()];
  document.getElementById("weekend").innerHTML = week;

  // let cells = "";

  document.getElementsByClassName("days")[0].innerHTML = "";
  for (x = day; x > 0; x--) {
    let cells = document.getElementsByClassName("days")[0];
    d2 = document.createElement("div");
    d2.classList.add("prev_date");
    d2.innerHTML = prevDate - x + 1;
    cells.appendChild(d2);
  }

  for (i = 1; i <= endDate; i++) {
    var check = `${i}` + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
    var local = JSON.parse(localStorage.getItem("data"));
    if (local !== null) {
      var tempdata = local.find((dateObj) => dateObj.date === check);
    }
    let cells = document.getElementsByClassName("days")[0];
    d1 = document.createElement("div");
    if (i === toDayDate.getDate() && dt.getMonth() === toDayDate.getMonth())
      d1.classList.add("today", "day");
    else d1.classList.add("day");
    d1.setAttribute("index", i);
    d1.innerHTML = i;

    eyeIcon = document.createElement("i");
    eyeIcon.setAttribute("data-toggle", "modal");
    eyeIcon.setAttribute("data-target", "#viewModel");
    eyeIcon.setAttribute("id", i);
    eyeIcon.setAttribute("index", i);
    eyeIcon.setAttribute("class", "fa fa-eye ");
    eyeIcon.addEventListener("click", (e) => Eye(e.target.id));

    tempdata
      ? (eyeIcon.style.display = "block")
      : (eyeIcon.style.display = "none");

    plusIcon = document.createElement("i");
    plusIcon.setAttribute("data-toggle", "modal");
    plusIcon.setAttribute("data-target", "#myModal");
    plusIcon.setAttribute("index", i);
    plusIcon.setAttribute("id", i);
    plusIcon.setAttribute("class", "fa fa-plus ");

    plusIcon.addEventListener("click", (e) => addEvent(e.target.id));

    d1.appendChild(plusIcon);
    d1.appendChild(eyeIcon);
    cells.appendChild(d1);
  }
}

function moveDate(par) {
  if (par == "prev") {
    dt.setMonth(dt.getMonth() - 1);
  } else if (par == "next") {
    dt.setMonth(dt.getMonth() + 1);
  }
  renderDate();
}

function addEventData() {
  var addDate = document.getElementById("txtDate").value;

  var txtTitle = document.getElementById("txtTitle").value;
  var txtTime = document.getElementById("txtTime").value;
  var txtDes = document.getElementById("txtDes").value;
  var data = JSON.parse(localStorage.getItem("data"));

  if (data === null) {
    data = [];
  } else {
    data = data;
  }

  var dateObj = {
    date: addDate,
    title: txtTitle,
    time: txtTime,
    description: txtDes,
  };
  data.push(dateObj);

  if (dateObj.title === "" || dateObj.description === "" || dateObj.time === "")
    return data;
  localStorage.setItem("data", JSON.stringify(data));

  document.getElementById("txtTitle").value = "";
  document.getElementById("txtDes").value = "";
  document.getElementById("txtTime").value = "";
  renderDate();
}

function addEvent(i) {
  document.getElementById("txtDate").value =
    `${i}` + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
}

function Eye(i) {
  document.getElementById("viewDate").value =
    `${i}` + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
  var Data = JSON.parse(localStorage.getItem("data"));
  var txtData = document.getElementById("viewDate").value;

  var tempdata = Data.filter((dateObj) => dateObj.date === txtData);
  var tbl = document.getElementById("dd");

  tbl.innerHTML = "";
  if (tempdata != null) {
    for (var i = 0; i < tempdata.length; i++) {
      var datetr = document.createElement("tr");
      var datetd = document.createElement("td");
      var titletd = document.createElement("td");
      var timetd = document.createElement("td");
      var destd = document.createElement("td");

      datetd.innerHTML = tempdata[i].date;
      titletd.innerHTML = tempdata[i].title;
      timetd.innerHTML = tempdata[i].time;
      destd.innerHTML = tempdata[i].description;

      datetr.appendChild(datetd);
      datetr.appendChild(titletd);
      datetr.appendChild(timetd);
      datetr.appendChild(destd);

      tbl.appendChild(datetr);
    }
  }
  renderDate();
}
