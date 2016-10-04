const { html } = require('inu')
const getFormData = require('get-form-data')
const { run, navigate } = require('inux')
const { update } = require('../effects')

module.exports = edit

function edit ({id}, {grads}, dispatch) {
  const grad = grads.get('grads').find(function (grad) {
    return grad.get('id') === Number(id)
  })
  function handleSubmit (ev) {
    ev.preventDefault()
    const formData = getFormData(ev.target)
    formData.id = Number(id)
    dispatch(run(update(formData)))
  }
  return html`<main>
      ${grad 
        ? html `
        <form onsubmit=${handleSubmit}>
          <fieldset>
            <label>image link</label>
            <input name='image_link' type='text' value=${grad.get('image_link')} />
          </fieldset>
          <fieldset>
            <label>name</label>
            <input name='name' type='text' value=${grad.get('name')} />
          </fieldset>
          <fieldset>
            <label>long description</label>
            <textarea rows="10" name='long_description'>${grad.get('long_description')}</textarea>
          </fieldset>
          <fieldset>
            <label>short description</label>
            <textarea maxlength="156" name='short_description'>${grad.get('short_description')}</textarea>
          </fieldset>
          <fieldset>
            <label>phone number</label>
            <input name='phone' type='tel' value=${grad.get('phone')} />
          </fieldset>
          <fieldset>
            <label>cv link</label>
            <input name='cv_link' type='text' value=${grad.get('cv_link')} />
          </fieldset>
          <fieldset>
            <label>github link</label>
            <input name='github_link' type='text' value=${grad.get('github_link')} />
          </fieldset>
          <fieldset>
            <label>skills</label>
            <input name='skills' type='text' value=${grad.get('skills').toArray().join(' ')} />
          </fieldset>
          <input type='submit' value='Update' />
          <button onclick=${() => dispatch(navigate('/'))}>Home</button>
        </form>
        `
       : html`I can't find your profile!`}
  </main>
  `
}
