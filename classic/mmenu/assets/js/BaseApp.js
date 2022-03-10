(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/BaseApp', ['exports', 'jquery', 'Plugin', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Plugin'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Plugin, global.Site);
    global.BaseApp = mod.exports;
  }
})(this, function (exports, _jquery, _Plugin, _Site2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Site3 = babelHelpers.interopRequireDefault(_Site2);

  var BaseApp = function (_Site) {
    babelHelpers.inherits(BaseApp, _Site);

    function BaseApp() {
      babelHelpers.classCallCheck(this, BaseApp);
      return babelHelpers.possibleConstructorReturn(this, (BaseApp.__proto__ || Object.getPrototypeOf(BaseApp)).apply(this, arguments));
    }

    babelHelpers.createClass(BaseApp, [{
      key: 'initialize',
      value: function initialize() {
        babelHelpers.get(BaseApp.prototype.__proto__ || Object.getPrototypeOf(BaseApp.prototype), 'initialize', this).call(this);

        this.handlSlidePanelPlugin();
      }
    }, {
      key: 'process',
      value: function process() {
        babelHelpers.get(BaseApp.prototype.__proto__ || Object.getPrototypeOf(BaseApp.prototype), 'process', this).call(this);

        this.bindSlidePanelPlugin();
      }
    }, {
      key: 'handlSlidePanelPlugin',
      value: function handlSlidePanelPlugin() {
        var self = this;
        this.slidepanelOptions = _jquery2.default.extend({}, (0, _Plugin.getDefaults)('slidePanel'), {
          template: function template(options) {
    //        alert("template");
            return '<div class="' + options.classes.base + ' ' + options.classes.base + '-' + options.direction + '">\n                  <div class="' + options.classes.base + '-scrollable">\n                    <div><div class="' + options.classes.content + '"></div></div>\n                  </div>\n                  <div class="' + options.classes.base + '-handler"></div>\n                </div>';
          },
          afterLoad: function afterLoad() {
  //          alert("afterLoad");
            this.$panel.find('.' + this.options.classes.base + '-scrollable').asScrollable({
              namespace: 'scrollable',
              contentSelector: '>',
              containerSelector: '>'
            });

            var id=$("#employeeList tr.selected .emp_no").html().trim()




            $.ajax({
                 type: 'POST',
                 url: '/data/emp_'+id+'.json',
                 async: false,
                 success: function(data) {
                   $("H3.name").html(data.name);

                   var userinfo = '' +
                   '    <tbody>' +
                   '      <tr>' +
                   '        <td class="info-label">Email:</td>' +
                   '        <td>' +
                   '          <span>'+data.mail+'</span>' +
                   '          <div class="form-group form-material floating">' +
                   '            <input type="email" class="form-control empty" name="inputFloatingEmail" value="'+data.mail+'">' +
                   '          </div>' +
                   '        </td>' +
                   '      </tr>' +
                   '      <tr>' +
                   '        <td class="info-label">Phone:</td>' +
                   '        <td>' +
                   '          <span>'+data.phone+'</span>' +
                   '          <div class="form-group form-material floating">' +
                   '            <input type="text" class="form-control empty" name="inputFloatingPhone" value="'+data.phone+'">' +
                   '          </div>' +
                   '        </td>' +
                   '      </tr>' +
                   '      <tr>' +
                   '        <td class="info-label">Address:</td>' +
                   '        <td>' +
                   '          <span>'+data.addr+'</span>' +
                   '          <div class="form-group form-material floating">' +
                   '            <input type="text" class="form-control empty" name="inputFloatingAddress" value="'+data.addr+'">' +
                   '          </div>' +
                   '        </td>' +
                   '      </tr>' +
                   '      <tr>' +
                   '        <td class="info-label">Birthday:</td>' +
                   '        <td>' +
                   '          <span>'+data.birth+'</span>' +
                   '          <div class="form-group form-material floating">' +
                   '            <input type="text" class="form-control empty" name="inputFloatingBirthday" value="'+data.birth+'">' +
                   '          </div>' +
                   '        </td>' +
                   '      </tr>' +
                   // '      <tr>' +
                   // '        <td class="info-label">URL:</td>' +
                   // '        <td>' +
                   // '          <span>http://amazingSurge222.com</span>' +
                   // '          <div class="form-group form-material floating">' +
                   // '            <input type="text" class="form-control empty" name="inputFloatingURL" value="http://amazingSurge.com">' +
                   // '          </div>' +
                   // '        </td>' +
                   // '      </tr>' +
                   '    </tbody>' +
                   '';

                   $(".slidePanel-inner .user-info").html(userinfo);


                 },
                 fail: function(jqXHR, textStatus, errorThrown) {
                   alert(jqXHR.status);
                   alert(textStatus);
                   alert(errorThrown);

                   alert( "error" );
                 }
            });







//            alert(                $("#employeeList tr.selected").html());


            self.initializePlugins(this.$panel);
          },
          afterShow: function afterShow() {
            var _this2 = this;

            (0, _jquery2.default)(document).on('click.slidePanelShow', function (e) {
              if ((0, _jquery2.default)(e.target).closest('.slidePanel').length === 0 && (0, _jquery2.default)(e.target).closest('html').length === 1) {
                _this2.hide();
              }
            });
          },
          afterHide: function afterHide() {
            // alert(88);

            (0, _jquery2.default)(document).off('click.slidePanelShow');
            (0, _jquery2.default)(document).off('click.slidePanelDatepicker');
          }
        }, this.getSlidePanelOptions());
      }
    }, {
      key: 'bindSlidePanelPlugin',
      value: function bindSlidePanelPlugin() {
        var self = this;
        (0, _jquery2.default)(document).on('click', '[data-toggle="slidePanel"]', function (e) {

          self.openSlidePanel((0, _jquery2.default)(this).data('url'));

          e.stopPropagation();
        });
      }
    }, {
      key: 'getSlidePanelOptions',
      value: function getSlidePanelOptions() {
        return {};
      }
    }, {
      key: 'openSlidePanel',
      value: function openSlidePanel() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _jquery2.default.slidePanel.show({
          url: url,
          settings: {
            cache: false
          }
        }, this.slidepanelOptions);
      }
    }]);
    return BaseApp;
  }(_Site3.default);

  exports.default = BaseApp;
});
