$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: '2',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
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



    function getTrails(){

        $.ajax({
            url: 'https://www.hikingproject.com/data/get-trails?lat=35.9705&lon=-79.9974&maxDistance=10&key=200758271-3165bfaa7d6b0bedfbf0fcdfbad4ec16',
            method: 'GET'
        }).then(function(response){
            $('#trail1').attr('src',response.trails[0].imgSmallMed)
            $('#trail2').attr('src',response.trails[1].imgSmallMed)
            $('#trail3').attr('src',response.trails[2].imgSmallMed)
            $('#trail4').attr('src',response.trails[3].imgSmallMed)
            $('#trail5').attr('src',response.trails[4].imgSmallMed)
            
    })
    }

getTrails();























})