export interface CookieModalSettingOption {
  title: string;
  description: string;
  keyValue: string; 
}

export interface CookieModalSettings {
  title: string;
  description: string;
  options: CookieModalSettingOption[];
  linkMessage: string;
  link: string;
}

function getStartBody(settings: CookieModalSettings) {
  var cookieModal = document.createElement('dialog');
  cookieModal.id = 'cookieModal';
  cookieModal.setAttribute('style', 'border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 320px; padding: 20px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);');
  cookieModal.innerHTML = `
    <h2>${settings.title}</h2> 
    <p>${settings.description}</p>
    <div id="modalOptionButtons" style="padding-bottom: 16px;"> 
      <button id="acceptCookies" style="padding: 8px 16px; margin: 0 16px 8px 0; border: none; border-radius: 4px; background-color: #007BFF; color: white; cursor: pointer;">Accept All</button>
      <button id="manageCookies" style="padding: 8px 16px; border: none; border-radius: 4px; background-color: #007BFF; color: white; cursor: pointer;">Manage Cookies</button>
    </div>
    <a href="${settings.link}" style="color: #007BFF; text-decoration: none;">${settings.linkMessage}</a>
  `;
  return cookieModal;
}

export function showCookieModal(settings: CookieModalSettings) {

    var cookieModal = getStartBody(settings);
    document.body.insertAdjacentElement('beforeend', cookieModal);

    document?.getElementById('acceptCookies')?.addEventListener('click', () => {
      cookieModal.close();
    });

    document?.getElementById('manageCookies')?.addEventListener('click', () => {
      let newBody = ``;
      newBody += settings.options.map((option) => {
        return `<div style="padding: 8px 0;"> 
          <input type="checkbox" id="${option.keyValue}" name="${option.keyValue}" value="${option.keyValue}" checked>
          <label for="${option.keyValue}">${option.title}</label>
          <p>${option.description}</p>
          </div>`;
      }).join('');
      cookieModal.innerHTML = newBody; 
    });

    cookieModal.showModal();
}
