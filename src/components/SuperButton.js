import logo from 'assets/images/kartverket.png';
import style from 'components/SuperButton.module.scss';
import { fetchCommits } from 'functions/githubAPI';

const styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.appendChild(document.createTextNode(style));


class SuperButton extends HTMLElement {
  constructor() {
    super();

    const commitsList = document.createElement('div');
    fetchCommits('benjamindehli', 'frontend-components').then((commits) => {
      commits.forEach(commitItem => {
        const commitMessage = commitItem.commit.message;
        let commitMessageElement = document.createElement('span');
        commitMessageElement.textContent = commitMessage;
        commitsList.appendChild(commitMessageElement);
      });
      console.log(commitsList);
    });

    // Create a shadow root
    this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    // Create (nested) span elements
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class','button');
    const icon = wrapper.appendChild(document.createElement('span'));
    icon.setAttribute('class','icon');
    icon.setAttribute('tabindex', 0);

    // Insert icon from defined attribute or default icon
    const img = icon.appendChild(document.createElement('img'));
    img.src = this.hasAttribute('img') ? this.getAttribute('img') : logo;

    const info = wrapper.appendChild(document.createElement('span'));
    info.setAttribute('class','info');
    // Take attribute content and put it inside the info span
    info.textContent = this.getAttribute('data-text');


    // attach the created elements to the shadow DOM
    this.shadowRoot.appendChild(styleElement, commitsList);

    this.shadowRoot.append(wrapper);
  }
}

window.customElements.define('super-button', SuperButton);

export default SuperButton;
