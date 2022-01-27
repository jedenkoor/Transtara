import Swiper, { Navigation, Pagination, EffectFade } from 'swiper'
import IMask from 'imask'
import { Fancybox } from '@fancyapps/ui'
import Choices from 'choices.js'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import '@fancyapps/ui/dist/fancybox.css'
import 'choices.js/public/assets/styles/choices.min.css'

Swiper.use([Navigation, Pagination, EffectFade])

class Init {
  constructor() {
    this.init()
    this.scrollTimer = 0
    this.directionScroll = [0]
    this.count = -100
  }

  init() {
    this.events()

    setTimeout(() => {
      this.actions().showBody()
    }, 300)

    Fancybox.bind('[data-fancybox]:not([data-src])', {
      infinite: false,
      closeButton: 'outside',
      dragToClose: false,
      Thumbs: {
        autoStart: false
      }
    })

    Fancybox.bind('[data-fancybox][data-src]', {
      dragToClose: false,
      mainClass: 'popup__wrap'
    })

    this.actions().initPhoneMask()

    if (document.querySelectorAll('.info__reviews').length) {
      const reviewsSliders = document.querySelectorAll('.info__reviews')
      reviewsSliders.forEach((item) => {
        this.actions().initReviewsSlider(item)
      })
    }

    if (document.querySelectorAll('.goodpage__gallery').length) {
      const reviewsSliders = document.querySelectorAll('.goodpage__gallery')
      reviewsSliders.forEach((item) => {
        this.actions().initGoodpageSlider(item)
      })
    }

    if (document.querySelectorAll('.accordion-content').length) {
      const accordionContent = document.querySelectorAll('.accordion-content')
      accordionContent.forEach((item) => {
        this.actions().initAccordion(item)
      })
    }

    if (document.querySelectorAll('.hidetext').length) {
      const hidetextBlock = document.querySelectorAll('.hidetext')
      hidetextBlock.forEach((item) => {
        this.actions().initHideText(item)
      })
    }

    if (document.querySelectorAll('select').length) {
      const selects = document.querySelectorAll('select')
      selects.forEach((item) => {
        this.actions().initSelects(item)
      })
    }
  }

  events() {
    const _this = this

    window.addEventListener('scroll', () => {
      _this.actions().handleScroll()
    })

    const scrollBLocks = document.querySelectorAll('.scroll-block')
    scrollBLocks.forEach((item) => {
      document.addEventListener('scroll', () => {
        _this.actions().scrollBlock(item)
      })
    })

    const emailInput = document.querySelectorAll('input[data-type="email"]')
    emailInput.forEach((item) => {
      item.addEventListener('input', function () {
        _this.actions().checkEmail(this)
      })
    })

    const checkboxInput = document.querySelectorAll('input[data-type="checkbox"]')
    checkboxInput.forEach((item) => {
      item.addEventListener('input', function () {
        _this.actions().checkCheckbox(this)
      })
    })

    const noTelAndEmailInput = document.querySelectorAll(
      'input:not([data-type="tel"]):not([data-type="email"]):not([data-type="checkbox"]), textarea'
    )
    noTelAndEmailInput.forEach((item) => {
      item.addEventListener('input', function () {
        _this.actions().checkOtherInputs(this)
      })
    })

    const validateBtn = document.querySelectorAll('button[data-validate]')
    validateBtn.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault()
        const form = this.closest('form')
        if (_this.actions().validation(form)) {
          form.submit()
          _this.actions().validationSuccess(form)
        }
      })
    })

    const accordionBtn = document.querySelectorAll('.accordion-btn')
    accordionBtn.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault()
        _this.actions().toggleAccordion(this)
      })
    })

    const hidetextBtn = document.querySelectorAll('.hidetext__btn')
    hidetextBtn.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault()
        _this.actions().toggleHideText(this)
      })
    })

    const submenu = document.querySelectorAll('.submenu')
    submenu.forEach((item) => {
      item.addEventListener(
        'focus',
        function () {
          _this.actions().showSubmenu(this)
        },
        true
      )
      item.addEventListener(
        'blur',
        function () {
          _this.actions().hideSubmenu(this)
        },
        true
      )
    })

    const catalogNames = document.querySelectorAll('.catalog-filters__name')
    catalogNames.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
      })
    })

    const labelCheckboxes = document.querySelectorAll('input[type="checkbox"] + span')
    labelCheckboxes.forEach((item) => {
      item.addEventListener('click', () => {
        _this.actions().removeFocus()
      })
    })

    const filterInputs = document.querySelectorAll('.catalog__filters input')
    filterInputs.forEach((item) => {
      item.addEventListener('change', function () {
        _this.actions().toggleClearFilter(this)
        _this.actions().checkCategory(this)
      })
    })

    const numInputs = document.querySelectorAll('input[data-type="num"]')
    numInputs.forEach((item) => {
      item.addEventListener('input', function () {
        _this.actions().inputNum(this)
      })
      item.addEventListener('blur', function () {
        _this.actions().blurNum(this)
      })
    })

    const minusBtns = document.querySelectorAll('.popup-buy__btnnum--minus')
    minusBtns.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault()
        _this.actions().minusNum(this)
      })
    })

    const plusBtns = document.querySelectorAll('.popup-buy__btnnum--plus')
    plusBtns.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault()
        _this.actions().plusNum(this)
      })
    })

    const receivingInputs = document.querySelectorAll('.popup-buy__receiving input[type="radio"]')
    receivingInputs.forEach((item) => {
      item.addEventListener('input', function (e) {
        e.preventDefault()
        _this.actions().receivingChanged(this)
      })
    })
  }

  actions() {
    return {
      showBody() {
        document.querySelector('body style').remove()
        document.querySelector('body').style.opacity = 1
      },
      handleScroll() {
        if (this.scrollTimer) {
          return
        }
        this.scrollTimer = setTimeout(() => {
          if (window.scrollY > 101) {
            document.querySelector('.header__wrap').classList.add('scroll')
          } else {
            document.querySelector('.header__wrap').classList.remove('scroll')
          }
          clearTimeout(this.scrollTimer)
          this.scrollTimer = 0
        }, 100)
      },
      scrollBlock: (el) => {
        this.directionScroll.push(window.pageYOffset)
        if (
          this.directionScroll[0] < this.directionScroll[1] &&
          el.getBoundingClientRect().bottom > window.innerHeight - 20 &&
          el.getBoundingClientRect().top <= 100
        ) {
          this.count = this.count + (this.directionScroll[1] - this.directionScroll[0])
          if (this.count >= el.offsetHeight - window.innerHeight + 100) {
            this.count = el.offsetHeight - window.innerHeight + 100
          }
        } else if (this.directionScroll[0] >= this.directionScroll[1] && el.getBoundingClientRect().top < 100) {
          this.count = this.count - (this.directionScroll[0] - this.directionScroll[1])
          if (this.count <= -100) {
            this.count = -100
          }
        }
        el.style.top = `${-this.count}px`
        this.directionScroll.shift()
      },
      initPhoneMask() {
        document.querySelectorAll('[data-type="tel"]').forEach((item) => {
          const telMask = IMask(item, {
            mask: '+{7} 000 000 00 00'
          })
          let flagInput = true
          item.addEventListener('input', (e) => {
            if ((e.target.value === '+7 8' || e.target.value === '+7') && flagInput === true) {
              e.target.value = '+7'
              telMask.masked.reset()
              telMask.value = '+7'
              flagInput = false
            } else if (e.target.value === '') {
              flagInput = true
            }
          })
          telMask.on('accept', function () {
            item.classList.remove('input-ok')
          })
          telMask.on('complete', function () {
            item.classList.add('input-ok')
          })
        })
      },
      checkEmail(el) {
        const pattern = /^[a-z0-9_.-]+@[a-z0-9_.-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i
        if (el.value !== '') {
          if (el.value.search(pattern) === 0) {
            el.classList.remove('input-err')
            el.classList.add('input-ok')
          } else {
            el.classList.add('input-err')
            el.classList.remove('input-ok')
          }
        } else {
          el.classList.remove('input-err')
          el.classList.remove('input-ok')
        }
      },
      checkCheckbox(el) {
        if (el.checked) {
          el.classList.add('input-ok')
        } else {
          el.classList.remove('input-ok')
        }
      },
      checkOtherInputs(el) {
        if (el.value !== '') {
          el.classList.add('input-ok')
        } else {
          el.classList.remove('input-ok')
        }
      },
      validation(form) {
        const inputs = form.querySelectorAll('[data-required]')
        let temp = true
        for (let i = 0; i < inputs.length; i++) {
          if (!inputs[i].classList.contains('input-ok')) {
            inputs[i].classList.add('input-err')
            temp = false
          } else {
            inputs[i].classList.remove('input-err')
          }
        }
        if (temp === false) {
          console.warn('Форма заполнена не корректно')
          return false
        } else {
          console.log('Форма отправлена')
          return true
        }
      },
      validationSuccess(form) {
        const inputsAndButton = form.querySelectorAll('input, textarea, button')
        inputsAndButton.forEach((item) => {
          item.classList.remove('input-err')
          item.classList.remove('input-ok')
          item.setAttribute('disabled', 'disabled')
        })
        setTimeout(() => {
          inputsAndButton.forEach((item) => {
            item.value = ''
            item.removeAttribute('disabled')
          })
        }, 2000)
      },
      initReviewsSlider(el) {
        const slider = el.querySelector('.info-reviews__slider')
        const prevArr = el.querySelector('.info-reviews__arr--prev')
        const nextArr = el.querySelector('.info-reviews__arr--next')
        ;(() =>
          new Swiper(slider, {
            loop: true,
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            }
          }))()
      },
      initGoodpageSlider(el) {
        const prevArr = el.querySelector('.goodpage-gallery__arr--prev')
        const nextArr = el.querySelector('.goodpage-gallery__arr--next')
        const pagination = el.querySelector('.goodpage-gallery__pagination')
        ;(() =>
          new Swiper(el, {
            resistanceRatio: 0,
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            },
            pagination: {
              el: pagination,
              type: 'fraction'
            },
            on: {
              transitionEnd: function (swiper) {
                const swiperLinks = el.querySelectorAll('a')
                swiperLinks[swiper.previousIndex].setAttribute('tabIndex', '-1')
                swiperLinks[swiper.activeIndex].removeAttribute('tabIndex')
              }
            }
          }))()
      },
      initAccordion(el) {
        setTimeout(() => {
          el.setAttribute('data-height', el.offsetHeight)
          el.style.opacity = 1
          el.style.position = 'static'
          if (el.closest('.accordion').classList.contains('accordion--active')) {
            el.style.height = `${el.offsetHeight}px`
          } else {
            el.style.height = '0px'
          }
        }, 500)
      },
      toggleAccordion(el) {
        const accordion = el.closest('.accordion')
        const content = el.closest('.accordion').querySelector('.accordion-content')
        if (!accordion.classList.contains('accordion--active')) {
          const accordions = document.querySelectorAll('.accordion')
          accordions.forEach((item) => {
            item.classList.remove('accordion--active')
            item.querySelector('.accordion-content').style.height = '0px'
          })
          accordion.classList.add('accordion--active')
          content.style.height = `${content.dataset.height}px`
        } else {
          accordion.classList.remove('accordion--active')
          content.style.height = '0px'
        }
      },
      initHideText(el) {
        const text = el.querySelector('.hidetext__text')
        const btn = el.querySelector('.hidetext__btn')
        if (text.offsetHeight > 192) {
          text.setAttribute('data-height', text.offsetHeight)
          text.style.height = '192px'
          btn.classList.add('hidetext__btn--active')
        }
      },
      toggleHideText(el) {
        const container = el.closest('.hidetext')
        const text = container.querySelector('.hidetext__text')
        if (el.classList.contains('hidetext__btn--less')) {
          text.style.height = '192px'
        } else {
          text.style.height = `${text.getAttribute('data-height')}px`
        }
        el.classList.toggle('hidetext__btn--less')
      },
      showSubmenu(el) {
        el.closest('.submenu').classList.add('active')
      },
      hideSubmenu(el) {
        el.closest('.submenu').classList.remove('active')
      },
      removeFocus() {
        setTimeout(() => {
          document.activeElement.blur()
        }, 100)
      },
      toggleClearFilter(el) {
        const form = el.closest('form')
        const clear = form.querySelector('.catalog-filters__clear')
        const inputs = form.querySelectorAll('input')
        let flagDisabled = true
        inputs.forEach((item) => {
          if (item.checked) {
            flagDisabled = false
          }
        })
        clear.disabled = flagDisabled
      },
      checkCategory(el) {
        const category = el.closest('.catalog-filters__item')
        const name = category.querySelector('.catalog-filters__name')
        const inputs = category.querySelectorAll('input')
        let flagActive = false
        inputs.forEach((item) => {
          if (item.checked) {
            flagActive = true
          }
        })
        if (flagActive) {
          name.classList.add('active')
        } else {
          name.classList.remove('active')
        }
      },
      inputNum(el) {
        el.value = el.value.replace(/[^0-9]/g, '')
      },
      blurNum(el) {
        el.value = +el.value < 1 ? 1 : el.value.replace(/^0+/, '')
      },
      minusNum(el) {
        const input = el.closest('form').querySelector('input[data-type="num"]')
        input.value = +input.value === 1 ? 1 : +input.value - 1
      },
      plusNum(el) {
        const input = el.closest('form').querySelector('input[data-type="num"]')
        input.value = +input.value + 1
      },
      initSelects(el) {
        ;(() =>
          new Choices(el, {
            searchEnabled: false,
            shouldSort: false,
            itemSelectText: '',
            classNames: {
              highlightedState: 'a'
            }
          }))()
      },
      receivingChanged(el) {
        console.log(el.value)
        const pickup = document.querySelector('.popup-buy__pickup')
        const delivery = document.querySelector('.popup-buy__delivery')
        if (el.value === 'pickup') {
          pickup.style.display = null
          delivery.style.display = 'none'
        } else {
          delivery.style.display = null
          pickup.style.display = 'none'
        }
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
