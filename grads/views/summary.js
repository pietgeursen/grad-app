const { html } = require('inu')
const { navigate } = require('inux')

module.exports = grads

function grads (model, dispatch) {
  return html`
    <div class='grad'>
			<div class="grad-image">
				<img src=${model.image_link} alt="image of ${model.name}">
			</div>
			<div>${model.name}</div>
			<div>${model.short_description}</div>
			<div>${model.phone}</div>
			<div>${model.github_link}</div>
			<div>${model.linkedin_link}</div>
			<div>${model.email}</div>
      <button onclick=${() => dispatch(navigate(`grads/${model.id}`))}>More...</button>
    </div>
  `
}
