const { html } = require('inu')
const getFormData = require('get-form-data')
const { run, navigate } = require('inux')
const { create } = require('../effects')

const dashboard = ({id}, model, dispatch) => {
  // ui confirms created grad
  //redirect when account not admin
  const user = model.user
  const grads = model.grads.get('grads')
  const handleCreate = (ev) => {
    ev.preventDefault()
    const formData = getFormData(ev.target)
    dispatch(run(create(formData)))
  }
  return html`<div> 
    <h1>Admin Dashboard</h1>
    <form id="add-grad" class="admin-section" onsubmit=${handleCreate}>
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
    <div class="admin-section grads-list">
      <h2>Grad accounts</h2>
      ${grads.map((grad) => {
        return html`
        <div class="row">
          <div class="small-10 columns">${grad.get('name')}</div> 
          <button class="view-grad button small-2 columns" onclick=${() => dispatch(navigate(`grads/${grad.get('id')}/edit`))}>Edit</button>
        </div>
        `
      }).toArray()}
    </div>
  </div>`
}

module.exports = dashboard
