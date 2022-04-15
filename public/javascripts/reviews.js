window.addEventListener('DOMContentLoaded', (e) => {

    // Change background of all previous hearts on hover on new review form
    let heart1 = document.getElementById('rating1');
    let heart2 = document.getElementById('rating2');
    let heart3 = document.getElementById('rating3');
    let heart4 = document.getElementById('rating4');
    let heart5 = document.getElementById('rating5');

    const hoverOverHeart = (e) => {
        if (e.target.id === 'rating1') {
            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        } else if (e.target.id === 'rating2') {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-color.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        } else if (e.target.id === 'rating3') {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-color.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-color.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        } else if (e.target.id === 'rating4') {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-color.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-color.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            heart3.style.webkitAppearance = 'none';
            heart3.style.background = 'url("/images/heart-icon-color.png")';
            heart3.style.backgroundRepeat = 'no-repeat';
            heart3.style.backgroundSize = '30px';
            heart3.style.border = 'none';
            heart3.style.height = '30px';
            heart3.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        } else if (e.target.id === 'rating5') {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-color.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-color.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            heart3.style.webkitAppearance = 'none';
            heart3.style.background = 'url("/images/heart-icon-color.png")';
            heart3.style.backgroundRepeat = 'no-repeat';
            heart3.style.backgroundSize = '30px';
            heart3.style.border = 'none';
            heart3.style.height = '30px';
            heart3.style.width = '30px';

            heart4.style.webkitAppearance = 'none';
            heart4.style.background = 'url("/images/heart-icon-color.png")';
            heart4.style.backgroundRepeat = 'no-repeat';
            heart4.style.backgroundSize = '30px';
            heart4.style.border = 'none';
            heart4.style.height = '30px';
            heart4.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        }
    };

    heart1.addEventListener('mouseenter', hoverOverHeart);
    heart2.addEventListener('mouseenter', hoverOverHeart);
    heart3.addEventListener('mouseenter', hoverOverHeart);
    heart4.addEventListener('mouseenter', hoverOverHeart);
    heart5.addEventListener('mouseenter', hoverOverHeart);


    // Remove background from all hearts when exit hover on new review form
    const leaveHeart = (e) => {
        if (e.target.id === 'rating1' && !e.target.checked) {
            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-empty.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        } else if (e.target.id === 'rating2' && !e.target.checked) {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-empty.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-empty.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        } else if (e.target.id === 'rating3' && !e.target.checked) {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-empty.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-empty.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-empty.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        } else if (e.target.id === 'rating4' && !e.target.checked) {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-empty.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-empty.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            heart3.style.webkitAppearance = 'none';
            heart3.style.background = 'url("/images/heart-icon-empty.png")';
            heart3.style.backgroundRepeat = 'no-repeat';
            heart3.style.backgroundSize = '30px';
            heart3.style.border = 'none';
            heart3.style.height = '30px';
            heart3.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-empty.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        } else if (e.target.id === 'rating5' && !e.target.checked) {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-empty.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-empty.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            heart3.style.webkitAppearance = 'none';
            heart3.style.background = 'url("/images/heart-icon-empty.png")';
            heart3.style.backgroundRepeat = 'no-repeat';
            heart3.style.backgroundSize = '30px';
            heart3.style.border = 'none';
            heart3.style.height = '30px';
            heart3.style.width = '30px';

            heart4.style.webkitAppearance = 'none';
            heart4.style.background = 'url("/images/heart-icon-empty.png")';
            heart4.style.backgroundRepeat = 'no-repeat';
            heart4.style.backgroundSize = '30px';
            heart4.style.border = 'none';
            heart4.style.height = '30px';
            heart4.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-empty.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        }
    };

    heart1.addEventListener('mouseleave', leaveHeart);
    heart2.addEventListener('mouseleave', leaveHeart);
    heart3.addEventListener('mouseleave', leaveHeart);
    heart4.addEventListener('mouseleave', leaveHeart);
    heart5.addEventListener('mouseleave', leaveHeart);


    // Change background hearts when one is selected on new review form
    const selectHeart = (e) => {
        if (e.target.id === 'rating1') {
            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-empty.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            heart3.style.webkitAppearance = 'none';
            heart3.style.background = 'url("/images/heart-icon-empty.png")';
            heart3.style.backgroundRepeat = 'no-repeat';
            heart3.style.backgroundSize = '30px';
            heart3.style.border = 'none';
            heart3.style.height = '30px';
            heart3.style.width = '30px';

            heart4.style.webkitAppearance = 'none';
            heart4.style.background = 'url("/images/heart-icon-empty.png")';
            heart4.style.backgroundRepeat = 'no-repeat';
            heart4.style.backgroundSize = '30px';
            heart4.style.border = 'none';
            heart4.style.height = '30px';
            heart4.style.width = '30px';

            heart5.style.webkitAppearance = 'none';
            heart5.style.background = 'url("/images/heart-icon-empty.png")';
            heart5.style.backgroundRepeat = 'no-repeat';
            heart5.style.backgroundSize = '30px';
            heart5.style.border = 'none';
            heart5.style.height = '30px';
            heart5.style.width = '30px';
        } else if (e.target.id === 'rating2') {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-color.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';

            heart3.style.webkitAppearance = 'none';
            heart3.style.background = 'url("/images/heart-icon-empty.png")';
            heart3.style.backgroundRepeat = 'no-repeat';
            heart3.style.backgroundSize = '30px';
            heart3.style.border = 'none';
            heart3.style.height = '30px';
            heart3.style.width = '30px';

            heart4.style.webkitAppearance = 'none';
            heart4.style.background = 'url("/images/heart-icon-empty.png")';
            heart4.style.backgroundRepeat = 'no-repeat';
            heart4.style.backgroundSize = '30px';
            heart4.style.border = 'none';
            heart4.style.height = '30px';
            heart4.style.width = '30px';

            heart5.style.webkitAppearance = 'none';
            heart5.style.background = 'url("/images/heart-icon-empty.png")';
            heart5.style.backgroundRepeat = 'no-repeat';
            heart5.style.backgroundSize = '30px';
            heart5.style.border = 'none';
            heart5.style.height = '30px';
            heart5.style.width = '30px';
        } else if (e.target.id === 'rating3') {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-color.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-color.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';

            heart4.style.webkitAppearance = 'none';
            heart4.style.background = 'url("/images/heart-icon-empty.png")';
            heart4.style.backgroundRepeat = 'no-repeat';
            heart4.style.backgroundSize = '30px';
            heart4.style.border = 'none';
            heart4.style.height = '30px';
            heart4.style.width = '30px';

            heart5.style.webkitAppearance = 'none';
            heart5.style.background = 'url("/images/heart-icon-empty.png")';
            heart5.style.backgroundRepeat = 'no-repeat';
            heart5.style.backgroundSize = '30px';
            heart5.style.border = 'none';
            heart5.style.height = '30px';
            heart5.style.width = '30px';
        } else if (e.target.id === 'rating4') {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-color.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-color.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            heart3.style.webkitAppearance = 'none';
            heart3.style.background = 'url("/images/heart-icon-color.png")';
            heart3.style.backgroundRepeat = 'no-repeat';
            heart3.style.backgroundSize = '30px';
            heart3.style.border = 'none';
            heart3.style.height = '30px';
            heart3.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';

            heart5.style.webkitAppearance = 'none';
            heart5.style.background = 'url("/images/heart-icon-empty.png")';
            heart5.style.backgroundRepeat = 'no-repeat';
            heart5.style.backgroundSize = '30px';
            heart5.style.border = 'none';
            heart5.style.height = '30px';
            heart5.style.width = '30px';
        } else if (e.target.id === 'rating5') {
            heart1.style.webkitAppearance = 'none';
            heart1.style.background = 'url("/images/heart-icon-color.png")';
            heart1.style.backgroundRepeat = 'no-repeat';
            heart1.style.backgroundSize = '30px';
            heart1.style.border = 'none';
            heart1.style.height = '30px';
            heart1.style.width = '30px';

            heart2.style.webkitAppearance = 'none';
            heart2.style.background = 'url("/images/heart-icon-color.png")';
            heart2.style.backgroundRepeat = 'no-repeat';
            heart2.style.backgroundSize = '30px';
            heart2.style.border = 'none';
            heart2.style.height = '30px';
            heart2.style.width = '30px';

            heart3.style.webkitAppearance = 'none';
            heart3.style.background = 'url("/images/heart-icon-color.png")';
            heart3.style.backgroundRepeat = 'no-repeat';
            heart3.style.backgroundSize = '30px';
            heart3.style.border = 'none';
            heart3.style.height = '30px';
            heart3.style.width = '30px';

            heart4.style.webkitAppearance = 'none';
            heart4.style.background = 'url("/images/heart-icon-color.png")';
            heart4.style.backgroundRepeat = 'no-repeat';
            heart4.style.backgroundSize = '30px';
            heart4.style.border = 'none';
            heart4.style.height = '30px';
            heart4.style.width = '30px';

            e.target.style.webkitAppearance = 'none';
            e.target.style.background = 'url("/images/heart-icon-color.png")';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundSize = '30px';
            e.target.style.border = 'none';
            e.target.style.height = '30px';
            e.target.style.width = '30px';
        }
    };

    heart1.addEventListener('click', selectHeart);
    heart2.addEventListener('click', selectHeart);
    heart3.addEventListener('click', selectHeart);
    heart4.addEventListener('click', selectHeart);
    heart5.addEventListener('click', selectHeart);
});
