$(document).ready(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        loop:true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: '2',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        }
      })



























})