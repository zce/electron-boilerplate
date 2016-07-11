;(function (global, factory) {
  if (typeof exports === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define(factory)
  } else {
    global.dui = factory()
  }
}(this, function () {
  var document = this.document
  if (!document) return console.log('dui requires a window with a document')

  setTimeout(function () {
    /**
     * sidebar resizer
     */
    var sidebar = null
    var beginX = 0
    var beginWidth = 0

    function mousedown (e) {
      sidebar = this.parentElement
      beginX = e.clientX
      beginWidth = parseInt(getComputedStyle(sidebar).width)
      sidebar.style.transition = 'none'
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }

    function mousemove (e) {
      var width = beginWidth + e.clientX - beginX
      width = width < 120 ? 120 : width
      sidebar.style.width = width + 'px'
    }

    function mouseup (e) {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
      sidebar.style.transition = ''
    }

    document.querySelectorAll('.resizer').forEach(function (item) {
      item.addEventListener('mousedown', mousedown)
    })

    /**
     * modal
     */
    document.querySelectorAll('[data-toggle="modal"]').forEach(function (item) {
      item.addEventListener('click', function (e) {
        document.querySelectorAll(this.dataset.target).forEach(function (target) {
          target.style.display = 'flex'
          setTimeout(function () {
            target.classList.add('in')
          }, 0)
        })
      })
    })

    function closeModal (element) {
      if (!element.classList.contains('modal')) return closeModal(element.parentElement)
      element.classList.remove('in')
    }

    document.querySelectorAll('[data-dismiss="modal"]').forEach(function (item) {
      item.addEventListener('click', function (e) {
        closeModal(this.parentElement)
      })
    })

    document.querySelectorAll('.fade').forEach(function (item) {
      item.addEventListener('transitionend', function (e) {
        if (!this.classList.contains('in')) {
          this.style.display = 'none'
        }
      })
    })

    /**
     * option page
     */
    document.querySelectorAll('[data-toggle="option"]').forEach(function (item) {
      item.addEventListener('click', function (e) {
        this.parentElement.parentElement.parentElement.parentElement.classList.toggle('open-option')
        console.log(this.parentElement.parentElement.parentElement.parentElement)
      })
    })
  }, 400)
}))
