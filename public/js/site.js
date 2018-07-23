const Apis = {
  license: 'http://localhost:3000/license',
  getLicense: 'http://localhost:3000/license/get'
}

function MakeList (lineItems) {
  const content = document.querySelector('#content')

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

window.onload = function () {
  DisplayList(Apis.license)
}
