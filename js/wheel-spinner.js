const spinner_mp3 = "./sound/editvoice123456.mp3";
const spinner_clapping_mp3 =
  "./sound/clapping12";
const fw = "./themes/wheelspinner.tools/rs/imgs/fw.gif";
let url_game = "";

var padding, data, svg, pie, vis, container, arcs, arc, sound, color;
data = [];
var audio = new Audio(spinner_mp3);

color = d3.scale.category20();
var duration = 1;

$("#colorPt").on("change", function (e) {
  if ($(this).val() == 1) {
    color = d3.scale.category10();
  }
  if ($(this).val() == 2) {
    color = d3.scale.category20();
  }
  if ($(this).val() == 3) {
    color = d3.scale.category20b();
  }
  if ($(this).val() == 4) {
    color = d3.scale.category20c();
  }
  if ($(this).val() == 5) {
    color = d3.scale.category30c();
  }
  reset();
});

function reset() {
  fixer = 0;
  if (window.innerWidth <= 1400) {
    fixer = 60;
  } else {
    fixer = 250;
  }
  (padding = {
    top: 20,
    right: 40,
    bottom: 0,
    left: 0,
  }),
    (w = window.innerWidth / 2 - fixer - padding.left - padding.right),
    (h = window.innerWidth / 2 - fixer - padding.top - padding.bottom),
    (r = Math.min(w, h) / 2),
    (rotation = 0),
    (oldrotation = 0),
    (picked = 100000),
    (oldpick = []),
    color;

  //category20c()
  //randomNumbers = getRandomNumbers();
  //http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results

  if (window.innerWidth <= 768) {
    (padding = {
      top: 20,
      right: 40,
      bottom: 0,
      left: 0,
    }),
      (w = window.innerWidth - 50 - padding.left - padding.right),
      (h = window.innerWidth - 50 - padding.top - padding.bottom),
      (r = Math.min(w, h) / 2),
      (rotation = 0),
      (oldrotation = 0),
      (picked = 100000),
      (oldpick = []),
      color;
  }
  $("#chart").html("");
  svg = d3.select("#chart");
  svg = d3
    .select("#chart")
    .append("svg")
    .data([data])
    .attr("width", w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);

  container = svg
    .append("g")
    .attr("class", "chartholder")
    .attr(
      "transform",
      "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
    );
  vis = container.append("g");

  pie = d3.layout
    .pie()
    .sort(null)
    .value(function (d) {
      return 1;
    });
  // declare an arc generator function
  arc = d3.svg.arc().outerRadius(r);
  // select paths, use arc generator to draw
  arcs = vis
    .selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

  arcs
    .append("path")
    .attr("fill", function (d, i) {
      return color(i);
    })
    .attr("d", function (d) {
      return arc(d);
    });
  // add the text
  arcs
    .append("text")
    .attr("transform", function (d) {
      d.innerRadius = 0;
      d.outerRadius = r;
      d.angle = (d.startAngle + d.endAngle) / 2;
      return (
        "rotate(" +
        ((d.angle * 180) / Math.PI - 90) +
        ")translate(" +
        (d.outerRadius - 10) +
        ")"
      );
    })
    .attr("text-anchor", "end")
    .text(function (d, i) {
      return data[i].label;
    });
  container.on("click", spin);
  //make arrow
  svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (w + padding.left + padding.right - 12) +
        "," +
        (h / 2 + padding.top) +
        ")"
    )
    .append("path")
    .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
    .style({
      fill: "#c50989",
    });
  //draw spin circle
  container.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 40).style({
    fill: "000",
    cursor: "pointer",
  });
  //spin text
  container
    .append("text")
    .attr("x", 0)
    .attr("y", 7.5)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({
      "font-weight": "bold",
      "font-size": "20px",
    });
}

function spin(d) {
  if (data.length <= 1) {
    $(".spinName").prepend($(".spinNameSelected").html());
    preNames();
    $(".spinNameSelected").html("");
  }
  container.on("click", null);
  let ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360),
    rdn =
      getRandomIntInclusive(1, data.length) +
      getRandomIntInclusive(1, data.length);
  console.log(rng);
  rotation = Math.round(rng / ps) * ps * rdn;
  console.log(rotation);
  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;
  oldpick.push(picked);
  rotation += 90 - Math.round(ps / 2);
  duration = 8000 / data.length / 2;
  duration = 360 / data.length + 3.14;
  sound = setInterval(playAudio, duration);

  vis
    .transition(500)
    .duration(8000)
    // .ease()
    .attrTween("transform", rotTween)
    .each("end", function () {
      aud = new Audio(spinner_clapping_mp3);
      aud.play();
      stopAudio();
      if (!data[picked]) {
        stopAudio();
        reset();
        return;
      }
      Swal.fire({
        title: "Result is: " + data[picked].label,
        width: 600,
        padding: "3em",
        showDenyButton: true,
        confirmButtonText: `Remove this result`,
        denyButtonText: `Don't Remove`,
        backdrop: `rgba(0,0,0,0.6) url("${fw}") left top`,
      }).then((result) => {
        if (!data[picked]) {
          stopAudio();
          reset();
          return;
        }
        aud.pause();
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed && data[picked]) {
          append = $(".spinName").find("div")[picked].innerText;
          $(".spinNameSelected").append(
            "<div>" + data[picked].label + " </div>"
          );
          $(".spinName").find("div")[picked].remove();
          data.splice(picked, 1);
          reset();
        } else if (result.isDenied) {
        }
      });
      oldrotation = rotation;
      stopAudio();
      container.on("click", spin);
    });
}

function rotTween(to) {
  var i = d3.interpolate((oldrotation % 360) - 360, rotation);
  // var i = d3.interpolate((oldrotation % 360)-360, pieslice*360);
  return function (t, pieslice) {
    pieslice = Math.round(1440 / data.length);
    // duration =t;
    if (t < 0.05) {
      duration = pieslice * 4;
    } else if (t < 0.6) {
      duration = pieslice / 150 / t;
    } else if (t < 0.9) {
      duration = pieslice / 190 / t;
    } else {
      duration = i(t) / (360 / pieslice);

      duration = pieslice * 3;
    }
    return "rotate(" + i(t) + ")";
  };
}

function getRandomNumbers() {
  var array = new Uint16Array(1000);
  var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
  if (
    window.hasOwnProperty("crypto") &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(array);
  } else {
    //no support for crypto, get crappy random numbers
    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}

function playAudio() {
  clearInterval(sound);
  duration = duration + 15 * data.length;
  sound = setInterval(playAudio, duration);
  audio.play();
}

function stopAudio() {
  duration = 360 / data.length + 3.14;
  clearInterval(sound);
}

function setEndOfContenteditable(contentEditableElement) {
  var range, selection;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); //get the selection object (allows you to change selection)
    selection.removeAllRanges(); //remove any selections already made
    selection.addRange(range); //make the range you have just created the visible selection
  } else if (document.selection) {
    //IE 8 and lower
    range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
    range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    range.select(); //Select the range (make it the visible selection
  }
}

function preNames() {
  names = $(".spinName").find("div");
  data = [];
  if (names.length == 0) {
    var temp = $(".spinName")
      .clone() //clone the element
      .children() //select all the children
      .remove() //remove all the children
      .end() //again go back to selected element
      .text()
      .trim();
    if (temp.length) {
      data.push({
        label: temp,
      });
      $(".spinName").text("");
      $(".spinName").html("<div>" + temp + "</div>");
      setEndOfContenteditable(document.getElementById("spinNameTest"));
    }
  } else {
    names.each(function () {
      if ($(this).text().length) {
        //                if ($(this).text().length > 13) {
        //                    $(this).text($(this).text().substr(0, 12));
        //                }
        data.push({
          label: $(this).text(),
        });
      } else {
        if ($(this).text().length >= 1) {
          $(this).remove();
        }
      }
    });
  }

  //     * don't know function below for what?

  //    firster = $(".spinName")
  //            .clone() //clone the element
  //            .children() //select all the children
  //            .remove() //remove all the children
  //            .end() //again go back to selected element
  //            .text().trim();
  //
  //    if (firster.length == 1) {
  //        $(".spinName").prepend("<div>" + firster + "</div>");
  //    }

  reset();
}
preNames();
$(".spinName").on("keyup", function (e) {
  preNames();
});

//don't know function below for what?
/*
 setInterval(function () {
 names.each(function () {
 if ($(this).text().length) {
 } else {
 $(this).remove()
 }
 });
 }, 2000);*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
