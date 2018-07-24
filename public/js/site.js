const Apis = {
  license: 'http://localhost:3000/license',
  getLicense: 'http://localhost:3000/license/get'
}

const Menus = {
  home: '/',
  howto: '/howto'
}

function MakeList (lineItems) {
  const content = document.querySelector('#license_links')

  if (content) {
    let list = document.createElement('ol')

    lineItems.forEach(lineItem => {
      let item = document.createElement('li')
      item.innerHTML = `<a href=${lineItem.url}>${lineItem.name}</a>`
      list.appendChild(item)
    })

    content.appendChild(list)
  }
}

function FillMenu (lineItems) {
  const licenseMenu = document.querySelector('#license_selector')

  if (licenseMenu) {
    lineItems.forEach(lineItem => {
      let option = document.createElement('option')
      option.value = `${lineItem.shortName}`
      option.innerText = `${lineItem.name}`
      licenseMenu.appendChild(option)
    })
  }
}

function DisplayList (url) {
  var myFetch = window.fetch(url)

  myFetch
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      MakeList(json)
      FillMenu(json)
    })
    .catch((err) => {
      console.error(err)
    })
}

function MenuHighlight () {
  const home = document.querySelectorAll('#heading>ul>li a')[0]
  const howto = document.querySelectorAll('#heading>ul>li a')[1]

  const Menus = {
    home: '/',
    howto: '/howto'
  }

  let urlPart = window.location.pathname
  if (urlPart === Menus.home) {
    home.className = 'active'
  }

  if (urlPart === Menus.howto) {
    howto.className = 'active'
  }
}

window.onload = function () {
  DisplayList(Apis.license)
  MenuHighlight()
}
