(function () {
  angular.module('app')
    .controller(
      'UploadCSVCtrl', 
      ['fileReader', '$scope', 'CvLacService', '$timeout', UploadCSVCtrl]
    );

  function UploadCSVCtrl(fileReader, $scope, CvLacService, $timeout) {
    var vm = this;

    vm.fetchedTechers = [];
    vm.isLoading = false;

    vm.fileChanged = function (event) {
      vm.file = event.target.files[0];
    };

    vm.query = {
      order: 'title',
      limit: 5,
      page: 1
    };

    vm.show = true;

    function formatGroupItems(group, name) {
      return group.map(function (item) {
        var authors = item.authors ? item.authors.join(',') : '';
        var isxx;
        if (item.ISSN) {
          issx = 'ISSN: ' + item.ISSN;
        } else if (item.ISBN) {
          issx = 'ISBN: ' + item.ISBN;
        } else {
          issx = 'N/A';
        }
        var currentRow = {
          name: name,
          type: item.type || 'N/A',
          title: item.title || 'N/A',
          authors: authors,
          country: item.country || 'N/A',
          character: item.character || 'N/A',
          isxx: issx,
          year: item.year || 'N/A',
          journal: item.journal || 'N/A',
        };
        return currentRow;
      })
    }

    vm.formatItems = function (data) {
      var rows = [];
      data.forEach(function (teacher) {
        var name = teacher.personalInformation.name;
        console.log(formatGroupItems(teacher.articles, name));
        rows = rows
          .concat(formatGroupItems(teacher.articles, name))
          .concat(formatGroupItems(teacher.books, name))
          .concat(formatGroupItems(teacher.bookChapters, name))
          .concat(formatGroupItems(teacher.proyects, name));
      });
      return rows;
    }

    vm.selected = [];

    vm.readFile = function () {
      vm.isLoading = true;
      vm.error = null;

      fileReader.readAsText(vm.file, $scope)
        .then((res) => {
          vm.teachersData = { data: res };
          return CvLacService.parseTeachers(vm.teachersData)
        })
        .then(res => JSON.parse(res.data))
        .then(data => {
          vm.fetchedData = data;
          vm.formatedItems = vm.formatItems(data);
          //console.log(formatedItems);
          //console.log(vm.formatedItems);
          vm.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          vm.error = err;
          vm.isLoading = false;
        });
    }
    /* $timeout(function () {
      vm.isLoading = false;
      vm.show = true;
    }, 2000); */
  }
})();
