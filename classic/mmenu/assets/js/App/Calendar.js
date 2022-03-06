(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/App/Calendar', ['exports', 'Site', 'Config'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('Site'), require('Config'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Site, global.Config);
    global.AppCalendar = mod.exports;
  }
})(this, function (exports, _Site2, _Config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getInstance = exports.run = exports.AppCalendar = undefined;

  var _Site3 = babelHelpers.interopRequireDefault(_Site2);

  var AppCalendar = function (_Site) {
    babelHelpers.inherits(AppCalendar, _Site);

    function AppCalendar() {
      babelHelpers.classCallCheck(this, AppCalendar);
      return babelHelpers.possibleConstructorReturn(this, (AppCalendar.__proto__ || Object.getPrototypeOf(AppCalendar)).apply(this, arguments));
    }

    babelHelpers.createClass(AppCalendar, [{
      key: 'initialize',
      value: function initialize() {
        babelHelpers.get(AppCalendar.prototype.__proto__ || Object.getPrototypeOf(AppCalendar.prototype), 'initialize', this).call(this);

        this.$actionToggleBtn = $('.site-action-toggle');
        this.$addNewCalendarForm = $('#addNewCalendar').modal({
          show: false
        });
      }
    }, {
      key: 'process',
      value: function process() {
        babelHelpers.get(AppCalendar.prototype.__proto__ || Object.getPrototypeOf(AppCalendar.prototype), 'process', this).call(this);

        this.handleFullcalendar();
        this.handleSelective();
        this.handleAction();
        this.handleListItem();
        this.handleEventList();
      }
    }, {
      key: 'handleFullcalendar',
      value: function handleFullcalendar() {

        var myEvents =[];
        var jqxhr=$.ajax({
             type: 'POST',
             url: '/data/events.json',
//             data: "worktype=1&" + param,
             async: false,
             success: function(data) {
                  if(data != null) {
                       // Do somothing when data is not null
                  }
//                  alert(111);
//                  alert(data);
                  myEvents=data;
             },
             fail: function(jqXHR, textStatus, errorThrown) {
               alert(jqXHR.status);
               alert(textStatus);
               alert(errorThrown);

               alert( "error" );
             }
        })

//        var jqxhr = $.get( "/data/events.json" )


//alert(JSON.stringify(myEvents));
//alert(JSON.stringify((0, _Config.colors)('red', 600)));



/*
        var myEvents = [{
          title: 'All Day Event',
          start: '2016-10-01'
        }, {
          title: 'Long Event',
          start: '2016-10-07',
          end: '2016-10-10',
          backgroundColor: (0, _Config.colors)('cyan', 600),
          borderColor: (0, _Config.colors)('cyan', 600)
        }, {
          id: 999,
          title: 'Repeating Event',
          start: '2016-10-09T16:00:00',
          backgroundColor: (0, _Config.colors)('red', 600),
          borderColor: (0, _Config.colors)('red', 600)
        }, {
          title: 'Conference232222',
          start: '2016-10-11',
          end: '2016-10-13'
        }, {
          title: 'Meeting',
          start: '2016-10-12T10:30:00',
          end: '2016-10-12T12:30:00'
        }, {
          title: 'Lunch',
          start: '2016-10-12T12:00:00'
        }, {
          title: 'Meeting',
          start: '2016-10-12T14:30:00'
        }, {
          title: 'Happy Hour',
          start: '2016-10-12T17:30:00'
        }, {
          title: 'Dinner',
          start: '2016-10-12T20:00:00'
        }, {
          title: 'Birthday Party',
          start: '2016-10-13T07:00:00'
        }];*/

        var myOptions = {
          header: {
            left: null,
            center: 'prev,title,next',
            right: 'month,agendaWeek,agendaDay'
          },
          defaultDate: '2016-10-12',
          selectable: true,
          selectHelper: true,
          select: function select() {
            $('#addNewEvent').modal('show');
          },

          editable: true,
          eventLimit: true,
          windowResize: function windowResize(view) {
            var width = $(window).outerWidth();
            var options = Object.assign({}, myOptions);

            options.events = view.calendar.clientEvents();
            options.aspectRatio = width < 667 ? 0.5 : 1.35;

            $('#calendar').fullCalendar('destroy');
            $('#calendar').fullCalendar(options);
          },
          eventClick: function eventClick(event) {
            var color = event.backgroundColor ? event.backgroundColor : (0, _Config.colors)('blue', 600);
            $('#editEname').val(event.title);

            if (event.start) {
              $('#editStarts').datepicker('update', event.start._d);
            } else {
              $('#editStarts').datepicker('update', '');
            }
            if (event.end) {
              $('#editEnds').datepicker('update', event.end._d);
            } else {
              $('#editEnds').datepicker('update', '');
            }

            $('#editColor [type=radio]').each(function () {
              var $this = $(this),
                  _value = $this.data('color').split('|'),
                  value = (0, _Config.colors)(_value[0], _value[1]);
              if (value === color) {
                $this.prop('checked', true);
              } else {
                $this.prop('checked', false);
              }
            });

            $('#editNewEvent').modal('show').one('hidden.bs.modal', function (e) {
              event.title = $('#editEname').val();

              var color = $('#editColor [type=radio]:checked').data('color').split('|');
              color = (0, _Config.colors)(color[0], color[1]);
              event.backgroundColor = color;
              event.borderColor = color;

              event.start = new Date($('#editStarts').data('datepicker').getDate());
              event.end = new Date($('#editEnds').data('datepicker').getDate());
              $('#calendar').fullCalendar('updateEvent', event);
            });
          },
          eventDragStart: function eventDragStart() {
            $('.site-action').data('actionBtn').show();
          },
          eventDragStop: function eventDragStop() {
            $('.site-action').data('actionBtn').hide();
          },

          events: myEvents,
          droppable: true
        };

        var _options = void 0;
        var myOptionsMobile = Object.assign({}, myOptions);

        myOptionsMobile.aspectRatio = 0.5;
        _options = $(window).outerWidth() < 667 ? myOptionsMobile : myOptions;

        $('#editNewEvent').modal();
        $('#calendar').fullCalendar(_options);
      }
    }, {
      key: 'handleSelective',
      value: function handleSelective() {

        var member = [{
          id: 'uid_1',
          name: 'Herman Beck',
          avatar: '../../../../global/portraits/1.jpg'
        }, {
          id: 'uid_2',
          name: 'Mary Adams',
          avatar: '../../../../global/portraits/2.jpg'
        }, {
          id: 'uid_3',
          name: 'Caleb Richards',
          avatar: '../../../../global/portraits/3.jpg'
        }, {
          id: 'uid_4',
          name: 'June Lane',
          avatar: '../../../../global/portraits/4.jpg'
        }];

        var items = [{
          id: 'uid_1',
          name: 'Herman Beck',
          avatar: '../../../../global/portraits/1.jpg'
        }, {
          id: 'uid_2',
          name: 'Caleb Richards',
          avatar: '../../../../global/portraits/2.jpg'
        }];

        $('.plugin-selective').selective({
          namespace: 'addMember',
          local: member,
          selected: items,
          buildFromHtml: false,
          tpl: {
            optionValue: function optionValue(data) {
              return data.id;
            },
            frame: function frame() {
              return '<div class="' + this.namespace + '">\n          ' + this.options.tpl.items.call(this) + '\n          <div class="' + this.namespace + '-trigger">\n          ' + this.options.tpl.triggerButton.call(this) + '\n          <div class="' + this.namespace + '-trigger-dropdown">\n          ' + this.options.tpl.list.call(this) + '\n          </div>\n          </div>\n          </div>';
            },
            triggerButton: function triggerButton() {
              return '<div class="' + this.namespace + '-trigger-button"><i class="wb-plus"></i></div>';
            },
            listItem: function listItem(data) {
              return '<li class="' + this.namespace + '-list-item"><img class="avatar" src="' + data.avatar + '">' + data.name + '</li>';
            },
            item: function item(data) {
              return '<li class="' + this.namespace + '-item"><img class="avatar" src="' + data.avatar + '" title="' + data.name + '">' + this.options.tpl.itemRemove.call(this) + '</li>';
            },
            itemRemove: function itemRemove() {
              return '<span class="' + this.namespace + '-remove"><i class="wb-minus-circle"></i></span>';
            },
            option: function option(data) {
              return '<option value="' + this.options.tpl.optionValue.call(this, data) + '">' + data.name + '</option>';
            }
          }
        });
      }
    }, {
      key: 'handleAction',
      value: function handleAction() {
        var _this2 = this;

        this.$actionToggleBtn.on('click', function (e) {
          _this2.$addNewCalendarForm.modal('show');
          e.stopPropagation();
        });
      }
    }, {
      key: 'handleEventList',
      value: function handleEventList() {
        $('#addNewEventBtn').on('click', function () {
          $('#addNewEvent').modal('show');
        });

        $('.calendar-list .calendar-event').each(function () {
          var $this = $(this),
              color = $this.data('color').split('-');
          $this.data('event', {
            title: $this.data('title'),
            stick: $this.data('stick'),
            backgroundColor: (0, _Config.colors)(color[0], color[1]),
            borderColor: (0, _Config.colors)(color[0], color[1])
          });
          $this.draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0,
            appendTo: '.page',
            helper: function helper() {
              return '<a class="fc-day-grid-event fc-event fc-start fc-end" style="background-color:' + (0, _Config.colors)(color[0], color[1]) + ';border-color:' + (0, _Config.colors)(color[0], color[1]) + '">\n          <div class="fc-content">\n            <span class="fc-title">' + $this.data('title') + '</span>\n          </div>\n          </a>';
            }
          });
        });

/*
                $('.calendars-list').each(function () {
                  var $this = $(this),
                      color = $this.data('color').split('-');
                  $this.data('event', {
                    title: $this.data('title'),
                    stick: $this.data('stick'),
                    backgroundColor: (0, _Config.colors)(color[0], color[1]),
                    borderColor: (0, _Config.colors)(color[0], color[1])
                  });
                  $this.draggable({
                    zIndex: 999,
                    revert: true,
                    revertDuration: 0,
                    appendTo: '.page',
                    helper: function helper() {
                      return '<a class="fc-day-grid-event fc-event fc-start fc-end" style="background-color:' + (0, _Config.colors)(color[0], color[1]) + ';border-color:' + (0, _Config.colors)(color[0], color[1]) + '">\n          <div class="fc-content">\n            <span class="fc-title">' + $this.data('title') + '</span>\n          </div>\n          </a>';
                    }
                  });
                });
*/

      }
    }, {
      key: 'handleListItem',
      value: function handleListItem() {
        this.$actionToggleBtn.on('click', function (e) {
          alert("click100");
          $('#addNewCalendar').modal('show');
          e.stopPropagation();
        });


        $(document).on('click', '[data-plugin=editlist]', function (e) {
          alert("calendar clickedqqq");
          $(document).data()
        });


        var calendarsList =[];
        var jqxhr=$.ajax({
             type: 'POST',
             url: '/data/calendar.json',
             async: false,
             success: function(data) {
               //alert(2222);
               //alert(data);
               //s\alert(data.length);
               for(var i=0;i<data.length;i++){
                 var name=data[i]["name"];
                 var count=data[i]["count"];


                  var calendarsItem = '' +
                  '                  <div class="list-group-item" data-plugin="editlist">' +
                  '                    <div class="list-content">' +
                  '                      <span class="item-right">'+count+'</span>' +
                  '                      <span class="list-text">'+name+'</span>' +
                  '                      <div class="item-actions">' +
                  '                        <span class="btn btn-pure btn-icon" data-toggle="list-editable"><i class="icon wb-edit" aria-hidden="true"></i></span>' +
                  '                        <span class="btn btn-pure btn-icon" data-tag="list-delete"><i class="icon wb-trash" aria-hidden="true"></i></span>' +
                  '                      </div>' +
                  '                    </div>' +
                  '                    <div class="list-editable">' +
                  '                      <div class="form-group form-material">' +
                  '                        <input type="text" class="form-control empty" name="label" value="Admin Calendar">' +
                  '                        <button type="button" class="input-editable-close icon wb-close" data-toggle="list-editable-close"' +
                  '                          aria-label="Close" aria-expanded="true"></button>' +
                  '                      </div>' +
                  '                    </div>';

                  $('#calendars-list').append(calendarsItem);

               }

             },
             fail: function(jqXHR, textStatus, errorThrown) {
               alert(jqXHR.status);
               alert(textStatus);
               alert(errorThrown);

               alert( "error" );
             }
        })


        $(document).on('click', '[data-tag=list-delete]', function (e) {
          bootbox.dialog({
            message: 'Do you want to delete the calendar?',
            buttons: {
              success: {
                label: 'Delete',
                className: 'btn-danger',
                callback: function callback() {
                  // $(e.target).closest('.list-group-item').remove();
                }
              }
            }
          });
        });
      }
    }]);
    return AppCalendar;
  }(_Site3.default);

  var instance = null;

  function getInstance() {
    if (!instance) {
      instance = new AppCalendar();
    }
    return instance;
  }

  function run() {
    var app = getInstance();
    app.run();
  }

  exports.AppCalendar = AppCalendar;
  exports.run = run;
  exports.getInstance = getInstance;
  exports.default = AppCalendar;
});
