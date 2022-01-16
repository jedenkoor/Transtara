import Swiper, { Navigation, EffectFade } from 'swiper'
import IMask from 'imask'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

Swiper.use([Navigation, EffectFade])

class Init {
  constructor() {
    this.init()
  }

  init() {
    this.events()

    setTimeout(() => {
      this.actions().showBody()
    }, 300)

    this.actions().initPhoneMask()

    if (document.querySelectorAll('.info__reviews').length) {
      const reviewsSliders = document.querySelectorAll('.info__reviews')
      reviewsSliders.forEach((item) => {
        this.actions().initReviewsSlider(item)
      })
    }

    if (document.querySelectorAll('.accordion-content').length) {
      const accordionContent = document.querySelectorAll('.accordion-content')
      accordionContent.forEach((item) => {
        this.actions().initAccordion(item)
      })
    }
  }

  events() {
    const _this = this

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

    if (document.querySelectorAll('.accordion-btn').length) {
      const accordionBtn = document.querySelectorAll('.accordion-btn')
      accordionBtn.forEach((item) => {
        item.addEventListener('click', function (e) {
          e.preventDefault()
          _this.actions().toggleAccordion(this)
        })
      })
    }
  }

  actions() {
    return {
      showBody() {
        document.querySelector('body').style.opacity = 1
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
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
