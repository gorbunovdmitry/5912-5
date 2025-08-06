const app = document.getElementById('app');

function sendAnalyticsEvent(gaEvent, ymEvent) {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', gaEvent);
  }
  // Yandex Metrika
  if (typeof window.ym === 'function') {
    window.ym(96171108, 'reachGoal', ymEvent);
  }
}

function renderLanding() {
  // Отправляем событие просмотра экрана только один раз за сессию
  if (!sessionStorage.getItem('landingViewed')) {
    sendAnalyticsEvent('5912_page_view_kk_var5', '5912_page_view_kk_var5');
    sessionStorage.setItem('landingViewed', '1');
  }
  // Если уже была заглушка, не показываем лендинг
  if (localStorage.getItem('placeholderShown') === '1') {
    renderPlaceholder();
    return;
  }
  app.innerHTML = `
    <div class="landing">
      <img src="img/calendar.png" alt="Календарь" class="landing__img" />
      <div class="landing__content">
        <div class="landing__title">Платите по кредитке, когда удобно</div>
        <div class="landing__desc">
          Теперь вы можете сами выбрать дату обязательного платежа по карте - например, сразу после зарплаты или в удобный день месяца
        </div>
        <ul class="landing__list">
          <li><img src="img/calendar2.png" class="landing__list-icon" alt="Календарь" />Меняйте дату обязательного платежа, если он еще не выставлен</li>
          <li><img src="img/clock.svg" class="landing__list-icon" alt="Часы" />Можно менять не чаще одного раза в месяц</li>
          <li><img src="img/coins.png" class="landing__list-icon" alt="Монеты" />Продолжайте пользоваться картой - ничего не меняется</li>
          <li><img src="img/credit.svg" class="landing__list-icon" alt="Кредит" />Сервис не влияет на кредитную историю</li>
        </ul>
        <button class="landing__button" id="sendBtn">Подключить за 990 ₽</button>
      </div>
    </div>
  `;
  document.getElementById('sendBtn').onclick = () => {
    localStorage.setItem('placeholderShown', '1');
    renderPlaceholder();
    // Очищаем историю, чтобы нельзя было вернуться назад
    history.replaceState(null, '', location.href);
  };
}

function renderPlaceholder() {
  // Отправляем событие просмотра финальной страницы только один раз за сессию
  if (!sessionStorage.getItem('endPageViewed')) {
    sendAnalyticsEvent('5912_end_page_view_kk_var5', '5912_end_page_view_kk_var5');
    sessionStorage.setItem('endPageViewed', '1');
  }
  app.innerHTML = `
    <div class="placeholder">
      <img src="img/moai.png" alt="Moai" class="placeholder__img" />
      <div class="placeholder__title">Только тссс</div>
      <div class="placeholder__desc">
        Вы поучаствовали в очень важном исследовании, которое поможет улучшить продукт. Вы – наш герой!
      </div>
    </div>
  `;
  // Очищаем историю, чтобы нельзя было вернуться назад
  history.replaceState(null, '', location.href);
}

renderLanding(); 