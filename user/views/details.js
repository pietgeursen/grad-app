const { html } = require('inu')

module.exports = details

function details (params, model, dispatch) {
  return html `
    ${model.user.get('loggedIn') ? html`
     <div> Hi ${model.user.getIn(['user', 'email'])}</div> 
    ` : null}
  `
}

