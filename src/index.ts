export interface CookieModalSettingOption {
  title: string;
  description: string;
  keyValue: string; 
  checked: boolean;
  cannotChange?: boolean;
}

export interface CookieModalSettings {
  title: string;
  description: string;
  options: CookieModalSettingOption[];
  linkMessage: string;
  link: string;
  games: game[];
}

type game = ((gameDoneCallBack: (won: boolean) => void) => void);


function getStartBody(settings: CookieModalSettings) {
  var cookieModal = document.createElement('dialog');
  cookieModal.id = 'cookieModal';
  cookieModal.innerHTML = `
    <h2>${settings.title}</h2> 
    <p>${settings.description}</p>
    <div id="modalOptionButtons"> 
      <button id="acceptCookies">Accept All</button>
      <button id="rejectCookies">Attempt to Reject All</button>
      <button id="manageCookies">Manage Cookies</button>
    </div>
    <a href="${settings.link}">${settings.linkMessage}</a>
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
      const showMore = (keyValue: string) => {
        if(!keyValue) return;
        const description = document?.getElementById(`description-${keyValue}`);
        const readMore = document?.getElementById(`read-more-${keyValue}`);
        const readLess = document?.getElementById(`read-less-${keyValue}`);
        
        if(description && readMore && readLess) {
          description.style.display = 'block';
          readMore.style.display = 'none';
          readLess.style.display = 'block';
        }
      }

      const showLess = (keyValue: string) => {
        if(!keyValue) return;
        const description = document?.getElementById(`description-${keyValue}`);
        const readMore = document?.getElementById(`read-more-${keyValue}`);
        const readLess = document?.getElementById(`read-less-${keyValue}`);
        
        if(description && readMore && readLess) {
          description.style.display = 'none';
          readMore.style.display = 'block';
          readLess.style.display = 'none';
        }
      }

      const onChangeInput = (e: any, games: game[]) => {
        if(!e.target.checked) {
          const gameIndex = Math.floor(Math.random() * games.length);
          console.log(gameIndex, games);
          games[gameIndex]((won: boolean)=>{
           e.target.checked = !won; 
          });
        }
      }

      let newBody = document.createElement('div');
      newBody.id = 'modalCookiesOptions';

      let closeButton = document.createElement('p');
      closeButton.innerText = 'Close';
      closeButton.id = 'closeButton';
      newBody.appendChild(closeButton);
    
      settings.options.forEach((option) => {

        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
        <div style="align-items: center;">
          <input type="checkbox" id="input-${option.keyValue}" name="${option.keyValue}" value="${option.keyValue}" ${option.checked ? "checked" : ""} ${option.cannotChange ? "disabled" : ""}>
          <label for="input-${option.keyValue}">${option.title}</label>
        </div>
          <p id="read-more-${option.keyValue}" >Read more</p>
          <p style="display: none;" id="read-less-${option.keyValue}">Read less</p>
          <p style="display: none;" class="description" id="description-${option.keyValue}">${option.description}</p>
        `;  
        newBody.appendChild(optionElement);
      })

      cookieModal.innerHTML = newBody.outerHTML;

      cookieModal.innerHTML += `
        <div id="modalOptionButtons"> 
          <button id="acceptCookies">Accept All</button>
          <button id="rejectCookies">Save preferences</button>
        </div>
        <a href="${settings.link}">${settings.linkMessage}</a>
      `;

      // Adding event listeners
      settings.options.forEach((option) => {
        document?.getElementById(`input-${option.keyValue}`)?.addEventListener('change', (e: any) => onChangeInput(e,settings.games));
        document?.getElementById(`read-more-${option.keyValue}`)?.addEventListener('click', () => showMore(option.keyValue));
        document?.getElementById(`read-less-${option.keyValue}`)?.addEventListener('click', () => showLess(option.keyValue));
      });

      document?.getElementById('closeButton')?.addEventListener('click', () => {
        cookieModal.remove();
        showCookieModal(settings);
      });
      


    });

    cookieModal.showModal();
}
