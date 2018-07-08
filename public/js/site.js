function MakeList (lineItems) {
  const content = document.querySelector('#content')
  let list = document.createElement('ol')

  lineItems.forEach(lineItem => {
    let item = document.createElement('li')
    item.innerHTML = `<a href=${lineItem.url}>${lineItem.name}</a>`
    list.appendChild(item)
  })

  content.appendChild(list)
}

function DisplayList (url) {
  var myFetch = window.fetch(url)

  myFetch
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      MakeList(json)
    })
    .catch((err) => {
      console.error(err)
    })
}

const Apis = {
  license: 'http://localhost:3000/license',
  getLicense: 'http://localhost:3000/license/get'
}

window.onload = function () {
  DisplayList(Apis.license)
}
