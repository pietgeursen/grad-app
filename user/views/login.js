const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const effects = require('../effects')
const error = require('./error')

const login = (params, model, dispatch) => {
  const handleSubmit = (ev) => {
    ev.preventDefault()
    const formData = getFormData(ev.target)
    dispatch(run(effects.login(formData)))
  }

  return html `
    <div>
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
    </div>
  `
}

module.exports = login
