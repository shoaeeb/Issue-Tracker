'use strict';
const form = document.querySelector('form');
const inputDesc = document.querySelector('input[name="description"]');
const inputSev = document.querySelector('select[name="severity"]');
const inputRes = document.querySelector('input[name="responsibility"]');
const issueContainer = document.querySelector('.issues-container');
class App {
  #issues = [];

  constructor() {
    form.addEventListener('submit', this._handlerFunction.bind(this));
    this._getLocalStorage() || [];
    this._renderDataUI(this.#issues);
  }

  _handlerFunction(e) {
    e.preventDefault();
    this.description = inputDesc.value.trim();
    this.severity = inputSev.value.trim();
    this.responsibility = inputRes.value.trim();
    this.status = 'Open';
    this.issueId = this._generateIssueId();
    this.#issues.push({
      issueId: this.issueId,
      description: this.description,
      severity: this.severity,
      responsibilty: this.responsibility,
      status: this.status,
    });
    this._retreiveStoreData();
    issueContainer.style.opacity = 0;

    this._renderDataUI(this.#issues);
  }

  _generateIssueId() {
    //a769687c-0b8c-53044-84c1-bdd617ce0654
    //generate alpha numeric
    //generate random numbers
    const str = `${this._randomCharacters(1)}${this._randomNumbers(
      999999,
      111111
    )}${this._randomCharacters(1)}-${this._randomNumbers(
      9,
      1
    )}${this._randomCharacters(1)}${this._randomNumbers(
      9,
      1
    )}${this._randomCharacters(1)}-${this._randomNumbers(
      99999,
      11111
    )}-${this._randomNumbers(99, 11)}${this._randomCharacters(
      1
    )}${this._randomNumbers(9, 1)}-${this._randomCharacters(
      3
    )}${this._randomNumbers(999, 111)}${this._randomNumbers(
      999,
      111
    )}${this._randomCharacters(2)}${this._randomNumbers(999, 111)}`;
    return str;
  }

  _renderDataUI(issues) {
    issueContainer.innerHTML = '';
    this._transition();
    issues.forEach(issue => {
      const html = `<div data-id=${issue.issueId} class="issues">
        <p>Issue ID: ${issue.issueId}</p>
        <div class="status">${issue.status}</div>
    
        <h2 class="description">${issue.description}</h2>
        <span class="severity__responsiblity">🕰️ ${issue.severity} 👤 ${issue.responsibilty}</span>
        <div class="actions">
          <div data-id=${issue.issueId} class="close">Close</div>
          <div data-id=${issue.issueId} class="delete">Delete</div>
        </div>
        </div>`;

      issueContainer.insertAdjacentHTML('beforeend', html);
      //get the close and delelete button
      const [_, closeBtn, deleteBtn] = document.querySelectorAll(
        `[data-id=${issue.issueId}]`
      );
      closeBtn.addEventListener('click', this._closeIssue.bind(this));

      deleteBtn.addEventListener('click', this._deleteIssue.bind(this));
    });
  }
  _getIndex(issues, id) {
    return issues.findIndex(issue => issue.issueId === id);
  }
  _deleteIssue(e) {
    if (!e.target.classList.contains('delete')) return;
    this.#issues.splice(this._getIndex(this.#issues, e.target.dataset.id), 1);
    issueContainer.style.opacity = 0;
    this._retreiveStoreData();
    this._renderDataUI(this.#issues);
  }
  _closeIssue(e) {
    if (!e.target.classList.contains('close')) return;
    this.#issues[this._getIndex(this.#issues, e.target.dataset.id)].status =
      'Close';
    issueContainer.style.opacity = 0;
    this._retreiveStoreData();
    this._renderDataUI(this.#issues);
  }

  _showIssue() {
    console.log(this.#issues);
  }
  _retreiveStoreData() {
    this._storeLocalStorage();
    this._getLocalStorage();
  }
  _getLocalStorage() {
    this.#issues = JSON.parse(localStorage.getItem('issues'));
  }

  _storeLocalStorage() {
    localStorage.setItem('issues', JSON.stringify(this.#issues));
  }

  _randomCharacters(length) {
    //return this.#alphabets[Math.floor(Math.random() * this.#alphabets.length)];
    const str = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    for (let i = 0; i < length; i++) {
      const ch = str.charAt(Math.random() * str.length);
      res += ch;
    }
    return res;
  }

  _randomNumbers(max, min) {
    return Math.round(Math.random() * (max - min) + 1);
  }

  _transition() {
    setTimeout(() => {
      issueContainer.style.opacity = 1;
    }, 1000);
  }
}
const app = new App();
