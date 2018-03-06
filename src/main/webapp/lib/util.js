var util = {
  getQuery : function(){
    var search = window.location.search;
    return search.substr(1)
        .split('&')
        .filter(function(item) {return item.length > 0})
        .map(function(item) {return item.split('=')})
        .reduce(function(obj, item) {
          obj[item[0]] = item[1]
            return obj
        }, {});
  },
  setLocalData: function (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getLocalData: function (key) {
    var dataStr = localStorage.getItem(key);
    if (dataStr) {
        return JSON.parse(dataStr);
    }
    return null;
   }
}

Vue.prototype.$axios = axios.create({
  baseURL: '/yunzhijia/app/request',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})


var defaultOptions = {
  content: '操作成功',
  duration: 2000
}

var Toast = function ToastInstall (Vue) {
  var ToastConstructor = Vue.extend({
     template: '<p class="toast" v-text="content"></p>',
     name:'toast',
  })
  var toastInstance = null
  Object.defineProperty(Vue.prototype, '$toast', {
      get: function () {
          return function (options) {
              var toastDom = document.querySelector('.toast')
              if (toastDom) {
                  toastDom.remove()
              }
              return new Promise(function (resolve, reject) {
                  if (toastInstance) {
                      toastInstance.$destroy(true)
                  }
                  options = Object.assign(Object.assign({}, defaultOptions), options)
                  toastInstance = new ToastConstructor({
                      el: document.createElement('div'),
                      data: options
                  })
                  document.body.appendChild(toastInstance.$el)
                  setTimeout(function () {
                      toastInstance.$el.remove()
                      resolve()
                  }, options.duration)
              })
          }.bind(this)
      }
  })
}
Vue.use(Toast)


