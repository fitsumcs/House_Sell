document.addEventListener("DOMContentLoaded", function(event) {

    const m_date = document.querySelector('#birthdate');
    const month = new Date().getMonth() > 9 ? new Date().getMonth() : "0" + new Date().getMonth();
    const day = new Date().getDate() > 9 ? new Date().getDate() : "0" + new Date().getDate();
    const year = (new Date().getFullYear() - 15) + "-" + month + "-" + day;
    //const year2 = (new Date().getFullYear() + 60) + "-" + month + "-" + day;
    if (m_date) {
        m_date.setAttribute('max', year);
    }


});