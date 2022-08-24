import { Toast } from '../assets/js/bootstrap.min.js';

/**
 * @param  {string} title
 * @param  {string} message
 * @param  {string} type
 * @returns {object}
 */

export function myToast (heading, content, type) {
    var myToastEl = document.getElementById('sharedToastEl');
    var title = document.getElementById('toastTitle');

    console.log('title--->', title);
    var messgeColor = document.querySelector('.message-toast');
    var message = document.getElementById('toastMessage');

    title.innerHTML = heading
    message.innerHTML = content;
    messgeColor.classList.add(`${type}`)
    
    var toast = new Toast(myToastEl)
    return toast
}