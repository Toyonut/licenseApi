const Apis = {
  license: '/license',
  getLicense: '/license/get'
};

function MakeList (lineItems) {
  const content = document.querySelector('#license_links');

  if (content) {
    const list = document.createElement('ol');

    lineItems.forEach(lineItem => {
      const item = document.createElement('li');
      item.innerHTML = `<a href=${lineItem.url}>${lineItem.name}</a>`;
      list.appendChild(item);
    });

    content.appendChild(list);
  }
}

function FillMenu (lineItems) {
  const licenseMenu = document.querySelector('#license_selector');

  if (licenseMenu) {
    lineItems.forEach(lineItem => {
      const option = document.createElement('option');
      option.value = `${lineItem.id}`;
      option.innerText = `${lineItem.name}`;
      licenseMenu.appendChild(option);
    });
  }
}

function DisplayList (url) {
  var myFetch = window.fetch(url);

  myFetch
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      MakeList(json);
      FillMenu(json);
    })
    .catch((err) => {
      console.error(err);
    });
}

function MenuHighlight () {
  const menuItems = document.querySelectorAll('nav>ul>li a');
  const urlPart = window.location.pathname;

  menuItems.forEach(item => {
    if (item.getAttribute('href') === urlPart) {
      item.className = 'active';
    }
  });
}

window.onload = function () {
  DisplayList(Apis.license);
  MenuHighlight();
};
