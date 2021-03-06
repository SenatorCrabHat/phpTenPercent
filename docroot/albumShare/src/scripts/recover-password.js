$(document).ready(() => {

console.log('im here');

let $initialLogin = $('.initial-login');
let $lostPWForm = $('.lost-pw-form');

let formHeight = $lostPWForm.height();
let loginHeight = $initialLogin.height();

$initialLogin.height(loginHeight - formHeight);

function setPostData () {
    let email = $('input[name="recovery-email"]').val();

    return {
        'action': 'recoverPassword',
        'email': email,
    };
}


function ajaxRecoverPassword () {
    $.ajax({
        type: 'POST',
        url: '../endpoints/passwordRecovery.php',
        dataType: 'json',
        data: setPostData(),
        success: function(data) {
            console.log(data, 'data');
        },
    })
        .fail(() => {
            console.log('Something went wrong');
        });
}

function removeFormandReplace () {
    let inputVal = $lostPWForm.find('input').val();

    $lostPWForm.css('height', formHeight);
    $lostPWForm.empty();
    $('<h3></h3>', {
        text: 'An email has been sent to ' + inputVal + '. Thank you.'
    }).appendTo($lostPWForm);
}


$('.lost-pw').on('click', () => {
    $initialLogin.css({
        'height': loginHeight,
        'transition': '1s',
    });
    window.setTimeout( () => {
        $('.lost-pw-form').addClass('toggle').css('visibility', 'visible');
    }, 500);
});

$('.recover-submit').on('click', () => {
    console.log('click');
   ajaxRecoverPassword();
   removeFormandReplace();
});

});