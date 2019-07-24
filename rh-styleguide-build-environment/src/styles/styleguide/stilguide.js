"use strict";

var videoPlayButton,
    videoWrapper = document.getElementsByClassName('rh-video')[0],
    video = document.getElementsByTagName('video')[0],
    videoMethods = {
  renderVideoPlayButton: function renderVideoPlayButton() {
    if (videoWrapper !== undefined && videoWrapper.contains(video)) {
      this.formatVideoPlayButton();
      video.classList.add('has-media-controls-hidden');
      videoPlayButton = document.getElementsByClassName('video-button')[0];
      videoPlayButton.addEventListener('click', this.hideVideoPlayButton);
    }
  },
  formatVideoPlayButton: function formatVideoPlayButton() {
    videoWrapper.insertAdjacentHTML('beforeend', '\
            <div class="video-button"><div class="video-button-content"> <i class="feather icon-play"></i> </div></div>\
            ');
  },
  hideVideoPlayButton: function hideVideoPlayButton() {
    video.play();
    videoPlayButton.classList.add('is-hidden');
    video.classList.remove('has-media-controls-hidden');
    video.setAttribute('controls', 'controls');
  }
};
videoMethods.renderVideoPlayButton();
"use strict";

var acc = document.getElementsByClassName("rh-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("rh-accordion-active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 100 + "px";
    }
  });
}
"use strict";

var acc = document.getElementsByClassName("rh-search-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("rh-search-active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 100 + "px";
    }
  });
}
"use strict";

window.onload = function () {
  var table, rows, i, x, y;
  table = document.getElementById("rh-table");

  if (table) {
    rows = table.rows;

    for (var i = 1, row; row = rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        x = rows[i].getElementsByTagName("TD")[j];

        if (x.innerText.length > 20) {
          x.classList.add('show-icon');
        }
      }
    }
  }
};

function sortByName() {
  var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
  table = document.getElementById("rh-table");
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      var xContent = isNaN(x.innerHTML) ? x.innerHTML.toLowerCase() === '-' ? 0 : x.innerHTML.toLowerCase() : parseFloat(x.innerHTML);
      var yContent = isNaN(y.innerHTML) ? y.innerHTML.toLowerCase() === '-' ? 0 : y.innerHTML.toLowerCase() : parseFloat(y.innerHTML);

      if (dir == "asc") {
        if (xContent > yContent) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (xContent < yContent) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function expand() {
  var rows = document.getElementById('rh-table').rows;

  for (var row = 0; row < rows.length; row++) {
    var cols = rows[row].cells;

    if (2 >= 0 && 2 < cols.length) {
      cols[2].classList.toggle("selected");
    }
  }
}

function setShadow() {
  var rows = document.getElementById('rh-table').rows;

  for (var row = 0; row < rows.length; row++) {
    var cols = rows[row].cells;

    if (0 >= 0 && 0 < cols.length) {
      cols[0].classList.add("rh-table-cell--shadow");
    }
  }
}
//# sourceMappingURL=stilguide.js.map
