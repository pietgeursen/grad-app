const { html } = require('inu')
const getFormData = require('get-form-data')
const { run, navigate } = require('inux')
const { create } = require('../effects')

const dashboard = ({id}, model, dispatch) => {
  //three features. first is create an account.
  //second is edit any account.
  //redirect when account not admin
  const user = model.user
  const handleCreate = (ev) => {
    ev.preventDefault()
    const formData = getFormData(ev.target)
    dispatch(run(create(formData)))
  }
  return html`<div> 
    <form id="add-grad" onsubmit=${handleCreate}>
      <h2>Create a new grad account:</h2>
      <fieldset>
        <label>email</label>
        <input name='email' type='email' />
      </fieldset>
      <fieldset>
        <label>password</label>
        <input name='password' type='text' />
      </fieldset>
      <input type='submit' value='Create new Grad' />
    </form>   
  </div>`
}

module.exports = dashboard
