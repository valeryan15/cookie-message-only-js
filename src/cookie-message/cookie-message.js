export default class cookieMessage {
   
    get hasMessageRead() {
        return this.getCookie(this.key) !== undefined;
    }

    constructor(config) {
        let key = config && config.key || 'hasMessageRead';
        let message = config && config.message || 'Этот сайт использует cookies для хранения данных. Продолжая использовать сайт, Вы даете согласие на работу с этими файлами';
        let buttonText = config && config.buttonText || 'Понятно';
        let countMonth = config && typeof config.countMonth == "number" && typeof config.countMonth || 1;
        
        this.key = key;
        this.message = message;
        this.buttonText = buttonText;
        this.countMonth = countMonth;
        this.__buttonColor = '#fff';
        this.__buttonBackgrountColor = '#1c7793';
        this.__bodyColor = '#ffcd68';
        this.__target;

        this.initialization();
    }

    initialization() {
        if (!this.hasMessageRead) {
            this.addMessageToBody()
        }
    }
    
    addMessageToBody() {
        this.__target = this.getHTMLMessage();
        document.body.insertBefore(this.__target, document.body.firstChild);
    }

    getHTMLMessage() {
        let div = document.createElement('div');
        div.style.backgroundColor = this.__bodyColor;
        div.style.padding = '12px 0';
        div.style.textAlign = 'center';
        div.style.position = 'relative';
        div.style.zIndex = '1000';
        div.textContent = `${this.message} `;
        div.appendChild(this.getHtmlButton());
        div.appendChild(this.getHTMLClose());
        return div;
    }

    getHtmlButton() {
        let button = document.createElement('button');
        button.style.backgroundColor = this.__buttonBackgrountColor;
        button.style.color = this.__buttonColor;
        button.style.border = `1px solid ${this.__buttonBackgrountColor}`;
        button.style.padding = '5px 10px';
        button.style.cursor = `pointer`;
        button.textContent = this.buttonText;
        button.type = 'button';
        button.onclick = () => this.onClickButton();
        return button;
    }

    onClickButton() {
        let today = new Date();
        let nextMonth = new Date(new Date(today).setMonth(today.getMonth() + this.countMonth))
        this.setCookie(this.key, true, {expires: nextMonth});
        this.removeHTMLMessage();
    }

    getHTMLClose() {
        let button = document.createElement('button');
        button.style.backgroundColor = 'transparent';
        button.style.color = '#000';
        button.style.border = `0 none`;
        button.style.fontWeight = `normal`;
        button.style.fontSize = `30px`;
        button.style.lineHeight = `1`;
        button.style.textShadow = `0 1px 0 #fff`;
        button.style.cursor = `pointer`;
        button.style.opacity = `.2`;
        button.style.position = 'absolute';
        button.style.right = '8px';
        button.style.top = '8px';
        button.textContent = '×';
        button.type = 'button';
        button.onclick = () => this.onClickButton();
        return button;
    }
    removeHTMLMessage() {
        document.body.removeChild(this.__target);
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options) {
        options = options || {};
      
        let expires = options.expires;
      
        if (typeof expires == "number" && expires) {
          let d = new Date();
          d.setTime(d.getTime() + expires * 1000);
          expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
          options.expires = expires.toUTCString();
        }
      
        value = encodeURIComponent(value);
      
        let updatedCookie = name + "=" + value;
      
        for (let propName in options) {
          updatedCookie += "; " + propName;
          let propValue = options[propName];
          if (propValue !== true) {
            updatedCookie += "=" + propValue;
          }
        }
      
        document.cookie = updatedCookie;
    }
}
