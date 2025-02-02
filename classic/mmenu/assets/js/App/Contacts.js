(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/App/Contacts', ['exports', 'BaseApp'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('BaseApp'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseApp);
    global.AppContacts = mod.exports;
  }
})(this, function (exports, _BaseApp2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getInstance = exports.run = exports.AppContacts = undefined;

  var _BaseApp3 = babelHelpers.interopRequireDefault(_BaseApp2);

  var AppContacts = function (_BaseApp) {
    babelHelpers.inherits(AppContacts, _BaseApp);

    function AppContacts() {
      babelHelpers.classCallCheck(this, AppContacts);
      return babelHelpers.possibleConstructorReturn(this, (AppContacts.__proto__ || Object.getPrototypeOf(AppContacts)).apply(this, arguments));
    }

    babelHelpers.createClass(AppContacts, [{
      key: 'initialize',
      value: function initialize() {
        babelHelpers.get(AppContacts.prototype.__proto__ || Object.getPrototypeOf(AppContacts.prototype), 'initialize', this).call(this);

        this.$actionBtn = $('.site-action');
        this.$actionToggleBtn = this.$actionBtn.find('.site-action-toggle');
        this.$addMainForm = $('#addUserForm').modal({
          show: false
        });
        this.$content = $('#contactsContent');

        // states
        this.states = {
          checked: false
        };
      }
    }, {
      key: 'process',
      value: function process() {
        babelHelpers.get(AppContacts.prototype.__proto__ || Object.getPrototypeOf(AppContacts.prototype), 'process', this).call(this);

        this.addContactList();

        this.setupActionBtn();
        this.bindListChecked();
        this.handlSlidePanelContent();
      }
    }, {
      key: 'addContactList',
      value: function addContactList(checked) {

        var calendarsList =[];
        var jqxhr=$.ajax({
             type: 'POST',
             url: '/data/employee.json',
             async: false,
             success: function(data) {
               //alert(2222);
               //alert(data);
               //s\alert(data.length);
               for(var i=0;i<data.length;i++){
                 var id=data[i]["id"];
                 var name=data[i]["name"];
                 var mail=data[i]["mail"];
                 var phone=data[i]["phone"];




                  var employeeItem = '' +
                  '              <tr data-url="panel.tpl" data-toggle="slidePanel">' +
                  '                <td class="pre-cell"></td>' +
                  '                <td class="cell-30">' +
                  '                  <span class="checkbox-custom checkbox-primary checkbox-lg">' +
                  '                    <input type="checkbox" class="contacts-checkbox selectable-item" id="contacts_1"/>' +
                  '                    <label for="contacts_1"></label>' +
                  '                  </span>' +
                  '                </td>' +
                  '                <td class="cell-100 emp_no">' +
                  '                  </a>' + id +
                  '                </td>' +
                  '                <td class="cell-300">' +
                  '                  </a>' + name +
                  '                </td>' +
                  '                <td class="cell-300">'+phone+'</td>' +
                  '                <td>'+mail+'</td>' +
                  '                <td class="suf-cell"></td>' +
                  '              </tr>';

                  $('#employeeList').append(employeeItem);

              $("#employeeList tr").click(function(){
                 $(this).addClass('selected').siblings().removeClass('selected');
              });


               }

             },
             fail: function(jqXHR, textStatus, errorThrown) {
               alert(jqXHR.status);
               alert(textStatus);
               alert(errorThrown);

               alert( "error" );
             }
        });


        /*
        var api = this.$actionBtn.data('actionBtn');
        if (checked) {
          api.show();
        } else {
          api.hide();
        }

        this.states.checked = checked;
        */
      }
    }, {
      key: 'listChecked',
      value: function listChecked(checked) {
        var api = this.$actionBtn.data('actionBtn');
        if (checked) {
          api.show();
        } else {
          api.hide();
        }

        this.states.checked = checked;
      }
    }, {
      key: 'setupActionBtn',
      value: function setupActionBtn() {
        var _this2 = this;

        this.$actionToggleBtn.on('click', function (e) {
          if (!_this2.states.checked) {
            _this2.$addMainForm.modal('show');
            e.stopPropagation();
          }
        });
      }
    }, {
      key: 'bindListChecked',
      value: function bindListChecked() {
        var _this3 = this;

        this.$content.on('asSelectable::change', function (e, api, checked) {
          _this3.listChecked(checked);
        });
      }
    }, {
      key: 'handlSlidePanelContent',
      value: function handlSlidePanelContent() {
        var _this4 = this;


        $(document).on('click', '[data-toggle=edit]', function () {
          var $button = $(this),
              $panel = $button.parents('.slidePanel');
          var $form = $panel.find('.user-info');



          $button.toggleClass('active');
          $form.toggleClass('active');
        });

        $(document).on('change', '.user-info .form-group', function (e) {
          var $input = $(_this4).find('input'),
              $span = $(_this4).siblings('span');
          $span.html($input.val());
        });
      }
    }]);
    return AppContacts;
  }(_BaseApp3.default);

  var instance = null;

  function getInstance() {
    if (!instance) {
      instance = new AppContacts();
    }

    return instance;
  }

  function run() {
    var app = getInstance();
    app.run();
  }

  exports.AppContacts = AppContacts;
  exports.run = run;
  exports.getInstance = getInstance;
  exports.default = AppContacts;
});
