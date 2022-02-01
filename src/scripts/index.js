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
    this.fancybox = Fancybox
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
      showClass: false,
      hideClass: false,
      animated: false,
      Image: {
        zoom: false
      },
      Thumbs: {
        autoStart: false
      }
    })

    Fancybox.bind('[data-fancybox][data-src="#menu-popup"]', {
      dragToClose: false,
      mainClass: 'popup__menu',
      keyboard: false,
      autoFocus: false,
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      on: {
        init: () => {
          const mobileMenuBtn = document.querySelector('.header__menu--wrap')
          mobileMenuBtn.classList.add('active')
        },
        closing: () => {
          const mobileMenuBtn = document.querySelector('.header__menu--wrap')
          mobileMenuBtn.classList.remove('active')
        }
      }
    })

    Fancybox.bind('[data-fancybox][data-src]:not([data-src="#menu-popup"])', {
      dragToClose: false,
      mainClass: 'popup__wrap',
      keyboard: false,
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut'
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

    if (document.documentElement.clientWidth > 1200) {
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
    }

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

    const reviews = document.querySelectorAll('.reviews__item')
    reviews.forEach((item) => {
      item.addEventListener('click', function () {
        _this.actions().toggleReview(this)
      })
    })

    document.querySelector('.header-info__search').addEventListener('click', () => {
      _this.actions().toggleSearch()
    })

    document.querySelector('.header-search__label input').addEventListener('focus', function () {
      _this.actions().showSearchResult(this)
    })

    document.querySelector('.header-search__label input').addEventListener('blur', function () {
      _this.actions().closeSearchResult(this)
    })

    if (document.documentElement.clientWidth > 1200) {
      document.querySelector('.header-search').addEventListener(
        'focus',
        function () {
          _this.actions().showSearchResult(this)
        },
        true
      )
      document.querySelector('.header-search').addEventListener(
        'blur',
        function () {
          _this.actions().closeSearchResult(this)
        },
        true
      )
    }

    const tabletMenu = document.querySelector('.header__wrap--tablet .header-list__item--menu > button')
    tabletMenu.addEventListener('click', function () {
      _this.actions().openTabletMenu(this)
    })

    const tabletSubmenu = document.querySelectorAll(
      '.header__wrap--tablet .header-list-submenu__item--submenu > .header-list-submenu__link'
    )
    tabletSubmenu.forEach((item) => {
      item.addEventListener('click', function () {
        _this.actions().openTabletSubmenu(this)
      })
    })

    document.addEventListener('click', (e) => {
      if (
        e.target !== document.querySelector('.header__wrap--tablet .header-list__item--menu') &&
        e.target.closest('.header__wrap--tablet .header-list__item--menu') === null
      ) {
        document.querySelector('.header__wrap--tablet .header-list__item--menu').classList.remove('active')
        document.querySelector('.header__wrap--tablet .header-list__item--menu').classList.remove('active-submenu')
      }
    })

    const tabletSubmenuBack = document.querySelectorAll('.header-list-submenu__item--back')
    tabletSubmenuBack.forEach((item) => {
      item.addEventListener('click', function () {
        _this.actions().closeTabletSubmenu(this)
      })
    })

    const mobileMenu = document.querySelectorAll('.header__menu')
    mobileMenu.forEach((item) => {
      item.addEventListener('click', function () {
        _this.actions().closeMobileMenu(this)
      })
    })

    const popupMenuSubmenu = document.querySelectorAll('.popup-menu__item--submenu > .popup-menu__link')
    popupMenuSubmenu.forEach((item) => {
      item.addEventListener('click', function () {
        _this.actions().openPopupMenuSubmenu(this)
      })
    })

    const popupMenuSubmenuClose = document.querySelectorAll('.popup-menu__link--back')
    popupMenuSubmenuClose.forEach((item) => {
      item.addEventListener('click', function () {
        _this.actions().closePopupMenuSubmenu(this)
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
          const headerWraps = document.querySelectorAll('.header__wrap')
          if (window.scrollY > 0) {
            document.querySelector('.header').classList.add('nosearch')
          } else {
            document.querySelector('.header').classList.remove('nosearch')
          }
          if (window.scrollY > 101) {
            headerWraps.forEach((item) => {
              item.classList.add('scroll')
            })
          } else {
            headerWraps.forEach((item) => {
              item.classList.remove('scroll')
            })
          }
          clearTimeout(this.scrollTimer)
          this.scrollTimer = 0
        }, 100)

        const scrollBLocks = document.querySelectorAll('.scroll-block')
        scrollBLocks.forEach((item) => {
          this.scrollBlock(item)
        })
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
        const select = new Choices(el, {
          searchEnabled: false,
          shouldSort: false,
          itemSelectText: '',
          classNames: {
            highlightedState: 'a'
          }
        })
        select.passedElement.element.addEventListener(
          'showDropdown',
          () => {
            const choicesItems = document.querySelectorAll('.choices__item')
            choicesItems.forEach((item) => {
              item.addEventListener('click', (e) => {
                select.setChoiceByValue(item.getAttribute('data-value'))
                select.hideDropdown()
                e.preventDefault()
                return false
              })
            })
          },
          false
        )
      },
      receivingChanged(el) {
        const pickup = document.querySelector('.popup-buy__pickup')
        const delivery = document.querySelector('.popup-buy__delivery')
        if (el.value === 'pickup') {
          pickup.style.display = null
          delivery.style.display = 'none'
        } else {
          delivery.style.display = null
          pickup.style.display = 'none'
        }
      },
      toggleReview(el) {
        const reviews = document.querySelectorAll('.reviews__item:not(.reviews__item--full)')
        const reviewText = el.querySelector('.reviews-item__text').innerHTML
        if (!el.classList.contains('reviews__item--active')) {
          reviews.forEach((item) => {
            item.classList.remove('reviews__item--active')
            item.querySelector('.reviews-item__btn span').innerText = 'Показать'
            if (document.querySelector('.reviews__item--full')) {
              document.querySelector('.reviews__item--full').remove()
            }
          })

          el.classList.add('reviews__item--active')
          el.querySelector('.reviews-item__btn span').innerText = 'Скрыть'
          if (Array.from(reviews).indexOf(el) % 2 === 0 && document.documentElement.clientWidth > 1024) {
            el.nextElementSibling.insertAdjacentHTML(
              'afterend',
              `
                  <li class="reviews__item reviews-item reviews__item--full">
                    <p class="reviews-item__text">${reviewText}</p>
                  </li>
                `
            )
          } else {
            el.insertAdjacentHTML(
              'afterend',
              `
                  <li class="reviews__item reviews-item reviews__item--full reviews__item--right">
                    <p class="reviews-page-item__content">${reviewText}</p>
                  </li>
                `
            )
          }
        } else {
          el.classList.remove('reviews__item--active')
          el.querySelector('.reviews-item__btn span').innerText = 'Показать'
          if (document.querySelector('.reviews__item--full')) {
            document.querySelector('.reviews__item--full').remove()
          }
        }
      },
      toggleSearch() {
        const header = document.querySelector('.header')
        header.classList.toggle('search')
      },
      showSearchResult(el) {
        const search = el.closest('.header-search')
        search.querySelector('.header-search__wrap').classList.add('active')
      },
      closeSearchResult(el) {
        const search = el.closest('.header-search')
        search.querySelector('.header-search__wrap').classList.remove('active')
      },
      openTabletMenu(el) {
        el.closest('.header-list__item--menu').classList.toggle('active')
        el.closest('.header-list__item--menu').classList.remove('active-submenu')
      },
      openTabletSubmenu(el) {
        el.closest('.header-list__item--menu').classList.add('active-submenu')
      },
      closeTabletSubmenu(el) {
        el.closest('.header-list__item--menu').classList.remove('active-submenu')
      },
      closeMobileMenu(el) {
        if (el.classList.contains('header__menu--hide')) {
          Fancybox.getInstance().close()
        }
      },
      openPopupMenuSubmenu(el) {
        el.nextElementSibling.classList.add('active')
      },
      closePopupMenuSubmenu(el) {
        el.closest('.popup-menu__submenu').classList.remove('active')
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
