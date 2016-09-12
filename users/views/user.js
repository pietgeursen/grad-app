const { html } = require('inu')

module.exports = user

function user (model, dispatch) {
  return html`
    <div class='grad'>
			<div class="grad-image">
				<img src=${model.image_link} alt="image of ${model.name}">
			</div>
			<div>${model.name}</div>
			<div>${model.long_description}</div>
			<div>${model.phone}</div>
			<div>${model.cv_link}</div>
			<div>${model.github_link}</div>
			<div>${model.email}</div>
    </div>
  `
}
