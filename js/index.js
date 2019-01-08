const lists = {
  people : [
    {id: 122, name: 'Игнат', family_name: 'Делюгин'},
    {id: 2, name: 'Иван', family_name: 'Иванов'},
    {id: 3, name: 'Максим', family_name: 'Дергачев'},
    {id: 4, name: 'Ольга', family_name: 'Ивушкина'},
    {id: 3, name: 'Петр', family_name: 'Дуров'},
    {id: 15, name: 'Марианна', family_name: 'Маринина'},
    {id: 7, name: 'Ирина', family_name: 'Мурашова'},
    {id: 8, name: 'Олег', family_name: 'Мухин'},
    {id: 9, name: 'Остап', family_name: 'Бендер'},
    {id: 10, name: 'Антон', family_name: 'Милонов'},
    {id: 112, name: 'Сергей', family_name: 'Борисов'},
    {id: 12, name: 'Петр', family_name: 'Быстров'},
    {id: 13, name: 'Кирилл', family_name: 'Потемкин'},
    {id: 14, name: 'Олег', family_name: 'Петров'},
    {id: 15, name: 'Сергей', family_name: 'Ефимов'},
    {id: 11, name: 'Сергей', family_name: 'Борисов'},
    {id: 121, name: 'Василий', family_name: 'Никитин'},
    {id: 18, name: 'Борис', family_name: 'Никаноров'},
    {id: 19, name: 'Александр', family_name: 'Петров'}
  ],
  projects: [
    {id: 124, title: 'Project 1', date: '01.24.2007', budget: 10000, assignee: 2},
    {id: 2, title: 'Project 21', date: '03.12.2003', budget: 20000, assignee: 3},
    {id: 3, title: 'Project 31', date: '03.12.2014', budget: 1000, assignee: 4},
    {id: 42, title: 'Project 4', date: '03.01.1996', budget: 20020, assignee: 5},
    {id: 10, title: 'Project 5', date: '03.12.2004', budget: 30000, assignee: 7},
    {id: 6, title: 'Project 61', date: '03.03.2012', budget: 33000, assignee: 8},
    {id: 7, title: 'Project 71', date: '04.09.2013', budget: 15000, assignee: 9},
    {id: 1, title: 'Project 81', date: '03.23.2014', budget: 17000, assignee: 10},
    {id: 9, title: 'Project 21', date: '03.12.2003', budget: 22000, assignee: 11},
    {id: 123, title: 'Project 31', date: '03.24.2014', budget: 27000, assignee: 13},
    {id: 11, title: 'Project 42', date: '03.01.1996', budget: 5000, assignee: 14},
    {id: 12, title: 'Project 52', date: '03.12.2004', budget: 5800, assignee: 15},
    {id: 13, title: 'Project 62', date: '03.03.2012', budget: 1200, assignee: 11},
    {id: 14, title: 'Project 72', date: '05.09.2013', budget: 1500, assignee: 121},
    {id: 15, title: 'Project 82', date: '12.21.2014', budget: 1700, assignee: 19},
    {id: 146, title: 'Project 22', date: '03.14.2003', budget: 19000, assignee: 15},
    {id: 17, title: 'Project 33', date: '03.22.2014', budget: 22000, assignee: 112},
    {id: 14, title: 'Project 43', date: '03.01.1996', budget: 30300, assignee: 122},
    {id: 19, title: 'Project 53', date: '03.12.2004', budget: 60700, assignee: 10},
    {id: 22, title: 'Project 63', date: '05.03.2012', budget: 80800, assignee: 4}
  ],
  headerData: {
    id: 'id', assignee: 'Назначен', budget: 'Бюджет', date: 'Дата создания', title: 'Задача'
  }
};


function cleanContent(element) {
  element.innerHTML = "";
}

function addHeader(listType) {
  //add static top header in projects list
  return (
    listType === 'projects'
  )
}

function handleRawListCall(listType) {
  drawList(lists[listType], null, addHeader(listType));
}


function handleSortByNumber(listType, key) {
  return (
    drawList(sortBy(lists[listType], key), key, addHeader(listType))
  )
}

function handleSortByString(listType, key) {
  return (
    drawList(sortByString(lists[listType], key), key, addHeader(listType))
  )
}

function handleSortProjectsByString(listType, key) {
  return (
    drawList(sortByString(lists[listType], key), key, addHeader(listType))
  )
}

function handleSortByDate(listType, key) {
  drawList(sortByDate(lists[listType]), key, true);
}


function showByClassName(parameter) {
  var elements = document.querySelectorAll(parameter);
  for (var j = 0; j < elements.length; j++) {
    elements[j].classList.remove('hidden');
    elements[j].classList.add('shown');
  }
}

function hideByClassName(parameter) {
  var elements = document.querySelectorAll(parameter);
  for (var j = 0; j < elements.length; j++) {
    elements[j].classList.remove('shown');
    elements[j].classList.add('hidden');
  }
}

function appendContent(target, content) {
  var newElement = document.querySelector(target);
  newElement.innerHTML = content;
}


function appendClassName(parameter, name) {
  var elements = document.querySelectorAll(parameter);

  for (var j = 0; j < elements.length; j++) {
    elements[j].classList.add(name);

  }
}


function appendElement(target, content, type, className) {

  var newElement = document.createElement(type);
  newElement.innerHTML = content;
  newElement.classList.add(className);
  target.appendChild(newElement)

}




function drawList(list, headerElement, mainHeader) {

  var main = document.querySelector('.list');
  var elements = Object.keys(list[0]);

  cleanContent(main);

  if (mainHeader) {
    createComplexHeader(elements)
  }

  //forms header out of the first letter of element if it goes first in column
  function formStringHeader(index) {
    if (i !== 0 && list[i][index].charAt(0) !== list[i - 1][index].charAt(0) || i === 0) {
      appendElement(main, list[i][index].charAt(0), 'div', 'list_header');
    }
  }

  //function forms header with titles
  function createComplexHeader(elements) {

    var complexHeader = document.createElement('tr');
    complexHeader.classList.add('list_complex_header');
    complexHeader.classList.add('sticky');

    for (var i = 0; i < elements.length; i++) {

      var child = document.createElement('th');

      child.innerHTML = lists.headerData[elements[i]] + '&nbsp;';

      complexHeader.appendChild(child);

      if (elements[i] === 'id') {
        child.classList.add('id');
      }
    }

    main.appendChild(complexHeader);

  }

  //iterating through elements of certain list and creating table rows
  for (var i = 0; i < list.length; i++) {

    var elementWrapper = document.createElement('tr');

    elementWrapper.classList.add('list_element_wrapper');

    //console.log(list[0][headerElement]);
    if (typeof list[0][headerElement] === 'string' && headerElement !== 'date' && headerElement !== 'title') {
      formStringHeader(headerElement);
    }


    for (var j = 0; j < elements.length; j++) {

      var wrapper = document.createElement('td');
      wrapper.classList.add(elements[j]);

      if (elements[j] === headerElement) {
        wrapper.classList.add('highlighted');
      }

      //if passing "assignee" element execute search in person list, to find id match
      //else appending element content in to the table

      if (elements[j] === 'assignee') {

        //console.log('assignee id: ' + list[i].assignee);

        //find person by id
        var assignee = lists.people.find(function(element) {
          return element.id === list[i].assignee;
        });

        //add bold style if there is no assignee found
        if (!assignee) {
          wrapper.classList.add('highlighted')
        }

        //add person data in project list
        wrapper.innerHTML = !assignee ? "Сотрудник не найден" : assignee.name + '&nbsp;' + assignee.family_name + '&nbsp;';
        elementWrapper.appendChild(wrapper)

      } else {
        wrapper.innerHTML = list[i][elements[j]] + '&nbsp;';
        elementWrapper.appendChild(wrapper)
      }

    }

    main.appendChild(elementWrapper);

  }

  appendClassName('.list_header', 'sticky');
  document.getElementById('idList').checked = true;
  showByClassName('.checkbox_container');
  appendContent('.sum', ('Всего элементов: ' + list.length));

}



function sortBy(list, key) {

  var arr = list.slice();

  arr.sort(function (a, b) {
    return a[key] - b[key]
  });

  return arr
}

function sortByDate(list) {

  var arr = list.slice();

  arr.sort(function (a, b) {
    return new Date(a.date + 'Z') - new Date(b.date + 'Z');
  });

  return arr

}


function sortByString(list, parameter) {

  var arr = list.slice();

  arr.sort(function (a, b) {

    var item_1 = a[parameter].toUpperCase();
    var item_2 = b[parameter].toUpperCase();

    if (item_1 < item_2) {
      return -1;
    }

    if (item_1 > item_2) {
      return 1;
    }

    return 0;

  });

  return arr

}