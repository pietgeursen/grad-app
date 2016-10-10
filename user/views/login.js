const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { login } = require('../effects')
const details = require('./details')
const error = require('./error')

module.exports = loginForm

function loginForm (params, model, dispatch) {
  return html `
    <div>
      ${model.user.get('loggedIn') ? details(params, model, dispatch) : html`
        <form onsubmit=${handleSubmit} >
          <input name='agent' type='hidden' />
          <fieldset>
            <label>email</label>
            <input name='email' type='email' />
          </fieldset>
          <fieldset>
            <label>password</label>
            <input name='password' type='password' />
          </fieldset>
          ${error(params, model, dispatch)}
          <input type='submit' value='Login' />
        </form>
      `}
    </div>
  `
  function handleSubmit (ev) {
    ev.preventDefault()
    const formData = getFormData(ev.target)
    dispatch(run(login(formData)))
  }
}
